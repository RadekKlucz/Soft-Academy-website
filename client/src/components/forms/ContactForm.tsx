import { useState, useEffect } from "react";
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
import { Loader2, InfoIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form validation schema
  const formSchema = z
    .object({
      name: z.string().min(2, { message: t("forms.validation.nameRequired") }),
      email: z
        .string()
        .email({ message: t("forms.validation.emailValid") })
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .min(7, { message: t("forms.validation.phoneLength") })
        .max(15, { message: t("forms.validation.phoneLength") })
        .regex(/^(\+|00)[1-9][0-9]{6,14}$/, {
          message: t("forms.validation.phoneLength"),
        })
        .optional()
        .or(z.literal("")),
      preferredContact: z.enum(["email", "phone"], {
        required_error: t("forms.validation.preferredContactRequired"),
      }),
      message: z
        .string()
        .min(10, { message: t("forms.validation.messageLength") }),
    })
    .refine(
      (data) => {
        if (
          data.preferredContact === "email" &&
          (!data.email || data.email.trim() === "")
        ) {
          return false;
        }
        if (
          data.preferredContact === "phone" &&
          (!data.phone || data.phone.trim() === "")
        ) {
          return false;
        }
        return true;
      },
      {
        message: t("forms.validation.contactMethodRequired"),
        path: ["preferredContact"],
      },
    );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredContact: "email",
      message: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        const formValues = form.getValues();
        const hasNonDefaultValue =
          formValues.name?.trim() !== "" ||
          (formValues.email ?? "").trim() !== "" ||
          (formValues.phone ?? "").trim() !== "" ||
          formValues.message?.trim() !== "";

        setHasChanges(hasNonDefaultValue);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const requestData = {
        name: data.name,
        contact_method: data.preferredContact,
        email: data.email || "",
        phone: data.phone || "",
        message: data.message,
        language: t("booking.language"),
      };

      const response = await fetch(
        `https://form-mail-soft-academy.vercel.app/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (response.ok) {
        setLocation("/contact-confirmation");
        setHasChanges(false);
        form.reset();
      } else {
        throw new Error(t("errors.formSubmission"));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("forms.contact.error.title"),
        description: t("forms.contact.error.message"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {hasChanges && (
          <Alert className="bg-amber-50 border-amber-300">
            <InfoIcon className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {t("forms.warning.dataLoss")}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.contact.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder={t("forms.contact.namePlaceholder")}
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
              <FormLabel>{t("forms.contact.preferredContact")}</FormLabel>
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
                      {t("forms.contact.contactEmail")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="phone" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {t("forms.contact.contactPhone")}
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
              <FormLabel>{t("forms.contact.email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={isSubmitting}
                  placeholder={t("forms.contact.emailPlaceholder")}
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
              <FormLabel>{t("forms.contact.phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  disabled={isSubmitting}
                  placeholder={t("forms.contact.phonePlaceholder")}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.contact.message")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isSubmitting}
                  placeholder={t("forms.contact.messagePlaceholder")}
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
            t("forms.contact.submit")
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
