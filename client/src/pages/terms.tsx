import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Terms() {
  const { t } = useTranslation();

  const sections = t("termsOfService.sections", { returnObjects: true });

  return (
    <div className="container max-w-4xl py-12 px-4 pt-32">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          {t("footer.terms")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("termsOfService.lastUpdated")}: {t("termsOfService.date")}
        </p>
      </div>

      <div className="prose prose-stone dark:prose-invert max-w-none">
        {Object.entries(sections).map(([sectionKey, sectionData]) => (
          <div key={sectionKey}>
            <h2>{sectionData.title}</h2>
            {typeof sectionData.items === "object" ? (
              Object.entries(sectionData.items).map(([itemKey, content]) => (
                <p key={itemKey}>{content}</p>
              ))
            ) : (
              <p>{sectionData.items}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-left">
        <Link href="/">
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary/80 rounded-md px-6 py-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("footer.backToHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
