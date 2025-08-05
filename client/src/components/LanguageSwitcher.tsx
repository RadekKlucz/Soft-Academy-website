import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className={`text-sm px-1 py-0 h-auto ${
          currentLanguage === "pl" ? "text-primary font-medium" : "text-muted-foreground"
        }`}
        onClick={() => changeLanguage("pl")}
      >
        PL
      </Button>
      <Separator orientation="vertical" className="h-4" />
      <Button
        variant="ghost"
        size="sm"
        className={`text-sm px-1 py-0 h-auto ${
          currentLanguage === "en" ? "text-primary font-medium" : "text-muted-foreground"
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
