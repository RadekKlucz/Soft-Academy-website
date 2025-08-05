import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Cookie, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CookieBanner = () => {
  const { t, i18n } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
  });

  const COOKIE_CONSENT_KEY = "cookie_consent_given";

  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consentGiven) {
      // logowanie informacyjne nie powinno używać t() tu
      console.log("[CookieBanner] No cookie consent found");
      setShowBanner(true);
    } else {
      console.log("[CookieBanner] Cookie consent exists");
      setShowBanner(false);

      try {
        const savedPrefs = JSON.parse(consentGiven);
        if (savedPrefs.necessary !== undefined) {
          setPreferences(savedPrefs);
        }
      } catch (error) {
        console.log("[CookieBanner] Error parsing cookie consent");
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    console.log(t("console.acceptedAllCookies"));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      functional: false,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    console.log(t("console.rejectedOptionalCookies"));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    console.log(t("console.savedPreferences"), preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (
    type: keyof typeof preferences,
    value: boolean,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setShowBanner(true);
    console.log(t("console.resetConsent"));
  };
  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("replit");

  if (!showBanner) {
    return (
      <>
        {isDev && (
          <button
            onClick={resetConsent}
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              zIndex: 9999,
              padding: "5px 10px",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {t("dev.resetCookies")}
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {isDev && (
        <button
          onClick={resetConsent}
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
            padding: "5px 10px",
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {t("dev.resetCookies")}
        </button>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/10 to-transparent">
        <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {t("cookieBanner.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("cookieBanner.description")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    {t("cookieBanner.acceptAll")}
                  </Button>

                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-gray-300"
                  >
                    {t("cookieBanner.rejectAll")}
                  </Button>

                  <Dialog
                    open={showPreferences}
                    onOpenChange={setShowPreferences}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        {t("cookieBanner.customize")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                      <DialogHeader className="flex-shrink-0">
                        <DialogTitle>
                          {t("cookieBanner.preferences.title")}
                        </DialogTitle>
                        <DialogDescription>
                          {t("cookieBanner.preferences.description")}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4 overflow-y-auto flex-1">
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">
                            {t("cookieBanner.details.title")}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Zgodnie z wymogami RODO przedstawiamy szczegółowe
                            informacje o wykorzystywanych plikach cookies.
                          </p>
                        </div>

                        {/* Cookie Categories */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {t("cookieBanner.categories.necessary")}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {t("cookieBanner.categories.necessaryDesc")}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Switch
                                checked={true}
                                disabled={true}
                                className="opacity-50"
                              />
                              <span className="text-sm text-muted-foreground ml-2">
                                {t("cookieBanner.required")}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {t("cookieBanner.categories.functional")}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {t("cookieBanner.categories.functionalDesc")}
                              </p>
                            </div>
                            <Switch
                              checked={preferences.functional}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("functional", checked)
                              }
                            />
                          </div>
                        </div>

                        {/* Detailed Cookie Information */}
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">
                            {t("cookieBanner.details.title")}
                          </h4>

                          {/* Necessary Cookies Details */}
                          <div className="mb-4">
                            <h5 className="font-medium text-sm mb-2 text-green-700">
                              {t("cookieBanner.categories.necessary")}
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-green-600 mb-2">
                                    {t(
                                      "cookieBanner.details.necessary.session.name",
                                    )}
                                  </h4>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Cel:"
                                          : "Purpose:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.session.purpose",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Czas przechowywania:"
                                          : "Duration:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.session.duration",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Typ:"
                                          : "Type:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.session.type",
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-green-600 mb-2">
                                    cookie_consent_given
                                  </h4>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Cel:"
                                          : "Purpose:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.consent.purpose",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Czas przechowywania:"
                                          : "Duration:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.consent.duration",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Typ:"
                                          : "Type:"}
                                      </strong>{" "}
                                      {t("cookieBanner.categories.necessary")}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-green-600 mb-2">
                                    session_id
                                  </h4>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Cel:"
                                          : "Purpose:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.security.purpose",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Czas przechowywania:"
                                          : "Duration:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.necessary.security.duration",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Typ:"
                                          : "Type:"}
                                      </strong>{" "}
                                      {t("cookieBanner.categories.necessary")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Functional Cookies Details */}
                          <div className="mb-4">
                            <h5 className="font-medium text-sm mb-2 text-blue-700">
                              {t("cookieBanner.categories.functional")}
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-blue-600 mb-2">
                                    i18nextLng
                                  </h4>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Cel:"
                                          : "Purpose:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.functional.language.purpose",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Czas przechowywania:"
                                          : "Duration:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.functional.language.duration",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Typ:"
                                          : "Type:"}
                                      </strong>{" "}
                                      {t("cookieBanner.categories.functional")}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-600 mb-2">
                                    user_preferences
                                  </h4>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Cel:"
                                          : "Purpose:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.functional.preferences.purpose",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Czas przechowywania:"
                                          : "Duration:"}
                                      </strong>{" "}
                                      {t(
                                        "cookieBanner.details.functional.preferences.duration",
                                      )}
                                    </p>
                                    <p>
                                      <strong>
                                        {i18n.language === "pl"
                                          ? "Typ:"
                                          : "Type:"}
                                      </strong>{" "}
                                      {t("cookieBanner.categories.functional")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cookie Management Info */}

                          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">
                              {i18n.language === "pl"
                                ? "Zarządzanie plikami cookies"
                                : "Cookie Management"}
                            </h4>
                            <p className="text-sm text-blue-700">
                              {i18n.language === "pl"
                                ? "Możesz w każdej chwili zmienić swoje preferencje dotyczące plików cookies poprzez ustawienia przeglądarki lub ponowne otwarcie tego okna preferencji za pomocą linku w stopce strony."
                                : "You can change your cookie preferences at any time through your browser settings or by reopening this preferences window using the link in the page footer."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end flex-shrink-0 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setShowPreferences(false)}
                        >
                          {t("cookieBanner.cancel")}
                        </Button>
                        <Button onClick={handleSavePreferences}>
                          {t("cookieBanner.savePreferences")}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRejectAll}
                className="flex-shrink-0 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CookieBanner;
