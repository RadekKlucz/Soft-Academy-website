import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "wouter";

// Components
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  
  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
            {t('contact.title')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/70">
            {t('contact.subtitle')}
          </p>
        </motion.div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-display font-semibold text-secondary mb-6">
              {t('contact.contactForm.title')}
            </h2>
            <ContactForm />
          </motion.div>
        </div>
        
        <div className="mt-12 flex justify-start">
          <Button
            variant="ghost"
            className="flex items-center text-primary"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="mr-2 h-5 w-5" />
              {t('booking.backToHome')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;