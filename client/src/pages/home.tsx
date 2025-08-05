import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

// Components
// Using local images from public folder
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import TestimonialsCarousel from "@/components/testimonials/TestimonialsCarousel";
import ServiceCard from "@/components/services/ServiceCard";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";

// Icons
import { Sparkles, Palette, Shirt } from "lucide-react";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();

  // Check for stored section to scroll to (when coming from another page)
  useEffect(() => {
    // Check if we have a stored section to scroll to after navigation
    const scrollToId = sessionStorage.getItem("scrollToId");

    if (scrollToId) {
      // Clear it immediately to prevent future unwanted scrolls
      sessionStorage.removeItem("scrollToId");

      // Small delay to ensure DOM is fully loaded
      setTimeout(() => {
        scrollToSection(scrollToId);
      }, 100);
    } else {
      // If no stored section, check for URL hash
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        scrollToSection(id);
      }
    }
  }, [i18n.language]);

  // Set up scrolling to sections
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

  // Optimized fade-in animation variants for performance
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Reduced duration for smoother performance
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/akademia-soft-background.jpg)`,
          backgroundPosition: "center bottom",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900">
          <motion.div
            className="max-w-4xl mx-auto motion-div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6">
              {t("hero.title.start")}{" "}
              <span className="text-primary italic whitespace-nowrap">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.end")}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
              <Button
                onClick={() => setLocation("/booking")}
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t("hero.cta.primary")}
              </Button>
              <Button
                onClick={() => scrollToSection("about-analysis")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Analysis Section */}
      <section id="about-analysis" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
              {t("aboutAnalysis.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-foreground/70">
              {t("aboutAnalysis.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-accent rounded-full mb-6">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary mb-4">
                {t("aboutAnalysis.features.discovery.title")}
              </h3>
              <p className="text-foreground/70">
                {t("aboutAnalysis.features.discovery.description")}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-accent rounded-full mb-6">
                <Palette className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary mb-4">
                {t("aboutAnalysis.features.palette.title")}
              </h3>
              <p className="text-foreground/70">
                {t("aboutAnalysis.features.palette.description")}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-accent rounded-full mb-6">
                <Shirt className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary mb-4">
                {t("aboutAnalysis.features.choices.title")}
              </h3>
              <p className="text-foreground/70">
                {t("aboutAnalysis.features.choices.description")}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t("aboutAnalysis.cta")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div
              className="lg:w-5/12 mb-10 lg:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <img
                src="/images/akademia-soft-about-me.jpg"
                alt={t("aboutMe.imageAlt")}
                className="w-full h-auto rounded-lg shadow-lg"
                width="600"
                height="800"
              />
            </motion.div>
            <motion.div
              className="lg:w-1/2 lg:pl-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
                {t("aboutMe.title")}
              </h2>
              <div className="w-24 h-1 bg-primary mb-6"></div>
              <p className="text-foreground/70 mb-6">
                {t("aboutMe.paragraph1")}
              </p>
              <p className="text-foreground/70 mb-6">
                {t("aboutMe.paragraph2")}
              </p>
              <p className="text-foreground/70 mb-8">
                {t("aboutMe.paragraph3")}
              </p>
              <p className="text-foreground/70 mb-8">
                {t("aboutMe.paragraph4")}
              </p>
              <p className="text-foreground/70 mb-8">
                {t("aboutMe.paragraph5")}
              </p>
              <div className="flex justify-start">
                <a
                  href={t("accessibility.instagramLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/50 hover:text-primary transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Hidden but code preserved for future implementation */}
      <section id="portfolio" className="py-20 bg-white hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
              {t("portfolio.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-foreground/70">
              {t("portfolio.subtitle")}
            </p>
          </motion.div>

          <PortfolioGallery />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
              {t("services.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-foreground/70">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              title={t("services.crocus.title")}
              description={t("services.crocus.description")}
              price={t("services.crocus.price")}
              features={[
                // { text: t('services.basic.features.duration') },
                { text: t("services.crocus.features.colorType") },
                { text: t("services.crocus.features.palette") },
                { text: t("services.crocus.features.recommendations") },
              ]}
              onBookNow={() => {
                // Store the service type before navigating
                sessionStorage.setItem("serviceType", "crocus");
                setLocation("/booking");
              }}
            />

            <ServiceCard
              title={t("services.lily.title")}
              description={t("services.lily.description")}
              price={t("services.lily.price")}
              features={[
                // { text: t("services.complex.features.duration") },
                { text: t("services.lily.features.basic") },
                { text: t("services.lily.features.extendedPalette") },
                { text: t("services.lily.features.accessories") },
                { text: t("services.lily.features.combining") },
              ]}
              popular={true}
              onBookNow={() => {
                // Store the service type before navigating
                sessionStorage.setItem("serviceType", "lily");
                setLocation("/booking");
              }}
            />

            <ServiceCard
              title={t("services.rose.title")}
              description={t("services.rose.description")}
              price={t("services.rose.price")}
              features={[
                // { text: t("services.vip.features.duration") },
                { text: t("services.rose.features.complex") },
                // { text: t("services.vip.features.wardrobe") },
                { text: t("services.rose.features.shopping") },
                { text: t("services.rose.features.support") },
              ]}
              onBookNow={() => {
                // Store the service type before navigating
                sessionStorage.setItem("serviceType", "rose");
                setLocation("/booking");
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
              {t("testimonials.title")}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-foreground/70">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* Large CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-secondary mb-6">
              {t("hero.cta.primary")}
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              {t("faq.largeCtaText")}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white text-xl py-6 px-8"
              onClick={() => setLocation("/booking")}
            >
              {t("hero.cta.primary")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
