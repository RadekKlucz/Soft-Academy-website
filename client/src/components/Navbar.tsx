import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      // Store the section to scroll to and navigate to home
      sessionStorage.setItem("scrollToId", id);
      window.location.href = "/";
      return;
    }

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
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/akademia-soft-logo.jpg"
              alt="Akademia Soft Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-display text-xl italic font-semibold text-primary">
              Akademia Soft
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about-analysis")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.aboutAnalysis")}
            </button>
            <button
              onClick={() => scrollToSection("about-me")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.aboutMe")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.testimonials")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.faq")}
            </button>
            <Link
              href="/contact"
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t("nav.contact")}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("about-analysis")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.aboutAnalysis")}
              </button>
              <button
                onClick={() => scrollToSection("about-me")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.aboutMe")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.testimonials")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200 w-full text-left"
              >
                {t("nav.faq")}
              </button>
              <Link
                href="/contact"
                className="block text-secondary hover:text-primary px-3 py-2 transition-colors duration-200"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
