import { useTranslation } from "react-i18next";
import {
  Facebook,
  Instagram,
  Linkedin,
  StarHalf,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "wouter";

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.offsetTop - 80; // Adjust for navbar height
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <span className="text-white font-display text-2xl italic font-semibold mb-6 block">
              Akademia Soft
            </span>
            <p className="text-gray-300 mb-6">{t("footer.description")}</p>
            <div className="flex justify-start">
              <a
                href={t("accessibility.instagramLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label={t("accessibility.instagram")}
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-3 text-primary" size={20} />
                <span>{t("footer.phone")}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary" size={20} />
                <span>{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              Copyrights© {new Date().getFullYear()} Akademia Soft. {t("footer.rights")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {t("footer.terms")}
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("cookie_consent_given");
                  window.location.reload();
                }}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                {t("footer.cookiePreferences")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
