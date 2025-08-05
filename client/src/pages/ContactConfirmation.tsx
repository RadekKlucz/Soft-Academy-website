import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactConfirmation = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(7);

  // Licznik odliczania co sekundę
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Przekierowanie gdy countdown osiągnie 0
  useEffect(() => {
    if (countdown === 0) {
      setLocation("/");
    }
  }, [countdown, setLocation]);

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("contactConfirmation.title")}
          </h1>
          <p className="text-gray-600">{t("contactConfirmation.message")}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            {t("contactConfirmation.redirect", { count: countdown })}
          </p>
        </div>

        <Button
          onClick={handleBackToHome}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {t("contactConfirmation.backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default ContactConfirmation;
