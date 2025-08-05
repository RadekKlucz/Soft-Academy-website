import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const BookingForm = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // State for preferred contact method
  const [preferredContact, setPreferredContact] = useState<"email" | "phone">(
    "email",
  );

  // Dynamic form validation schema based on preferred contact method
  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("forms.validation.nameRequired") })
          .max(30, { message: t("forms.validation.nameRequired") })
          .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/, {
            message: t("forms.validation.nameRequired"),
          }),
        email:
          preferredContact === "email"
            ? z
                .string()
                .min(1, { message: t("forms.validation.emailValid") })
                .email({ message: t("forms.validation.emailValid") })
                .max(50, { message: t("forms.validation.emailValid") })
            : z
                .string()
                .email({ message: t("forms.validation.emailValid") })
                .optional()
                .or(z.literal("")),
        phone:
          preferredContact === "phone"
            ? z
                .string()
                .min(7, { message: t("forms.validation.phoneLength") })
                .max(15, { message: t("forms.validation.phoneLength") })
                .regex(/^(\+|00)[1-9][0-9]{6,14}$/, {
                  message: t("forms.validation.phoneLength"),
                })
            : z
                .string()
                .min(7, { message: t("forms.validation.phoneLength") })
                .max(15, { message: t("forms.validation.phoneLength") })
                .regex(/^(\+|00)[1-9][0-9]{6,14}$/, {
                  message: t("forms.validation.phoneLength"),
                })
                .optional()
                .or(z.literal("")),
        preferredContact: z.enum(["email", "phone"]),
        serviceType: z
          .string()
          .min(1, { message: t("forms.validation.serviceRequired") }),
        message: z
          .string()
          .max(500, { message: t("forms.validation.messageLength") })
          .optional(),
      }),
    [preferredContact, t],
  );

  type FormValues = z.infer<typeof formSchema>;

  // Check if we have a pre-selected service type from the home page
  const storedServiceType =
    typeof window !== "undefined"
      ? sessionStorage.getItem("serviceType") || ""
      : "";

  // Remove the service type from session storage after reading it
  useEffect(() => {
    if (storedServiceType) {
      setTimeout(() => {
        sessionStorage.removeItem("serviceType");
      }, 500);
    }
  }, [storedServiceType]);

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on change to clear errors immediately
    reValidateMode: "onChange", // Re-validate on change
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredContact: "email",
      serviceType: storedServiceType,
      message: "",
    },
  });

  // Update form resolver when schema changes
  useEffect(() => {
    form.clearErrors();
    // Re-trigger validation with new schema
    setTimeout(() => {
      form.trigger();
    }, 0);
  }, [formSchema, form]);

  // Track form changes to show warning
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      // Track changes for navigation warning
      if (type === "change") {
        const formValues = form.getValues();
        const hasAnyChanges =
          formValues.name?.trim() ||
          formValues.email?.trim() ||
          formValues.phone?.trim() ||
          formValues.message?.trim() ||
          formValues.serviceType?.trim();
        setHasChanges(!!hasAnyChanges);
      }

      // Update preferred contact method
      if (name === "preferredContact" && value.preferredContact) {
        const newContactMethod = value.preferredContact as "email" | "phone";
        if (newContactMethod !== preferredContact) {
          setPreferredContact(newContactMethod);

          // Clear validation errors for contact fields when switching
          form.clearErrors(["email", "phone"]);

          // Clear the non-required field when switching
          if (newContactMethod === "email") {
            form.setValue("phone", "");
          } else {
            form.setValue("email", "");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, preferredContact]);

  // Add navigation warning when form has changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges && !isSubmitting) {
        e.preventDefault();
        e.returnValue = t("forms.booking.unsavedChanges");
        return t("forms.booking.unsavedChanges");
      }
    };

    if (hasChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges, isSubmitting, t]);

  // Handle form submission with FormSubmit
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare form data for FormSubmit
      const requestData = {
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        contact_method: data.preferredContact,
        service: data.serviceType,
        message: data.message || "",
        language: t("booking.language"),
      };

      const response = await fetch(
        `https://form-mail-soft-academy.vercel.app/api/reservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (response.ok) {
        // Redirect to confirmation page
        setLocation("/booking-confirmation");
        setHasChanges(false);
        form.reset();
      } else {
        throw new Error(t("errors.formSubmission"));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("forms.booking.error.title"),
        description: t("forms.booking.error.message"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder={t("forms.booking.namePlaceholder")}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.preferredContact")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={isSubmitting}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {t("forms.booking.contactEmail")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="phone" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {t("forms.booking.contactPhone")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={isSubmitting}
                  placeholder={t("forms.booking.emailPlaceholder")}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
              {form.watch("preferredContact") === "email" && (
                <FormDescription>
                  {t("forms.contact.requiredField")}
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  disabled={isSubmitting}
                  placeholder={t("forms.booking.phonePlaceholder")}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
              {form.watch("preferredContact") === "phone" && (
                <FormDescription>
                  {t("forms.contact.requiredField")}
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.service")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="focus:ring-primary">
                    <SelectValue
                      placeholder={t("forms.booking.servicePlaceholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={t("services.crocus.title")}>
                    {t("services.crocus.title")}
                  </SelectItem>
                  <SelectItem value={t("services.lily.title")}>
                    {t("services.lily.title")}
                  </SelectItem>
                  <SelectItem value={t("services.rose.title")}>
                    {t("services.rose.title")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.booking.message")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isSubmitting}
                  placeholder={t("forms.booking.messagePlaceholder")}
                  className="h-32 focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("forms.submitting")}
            </>
          ) : (
            t("forms.booking.submit")
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
