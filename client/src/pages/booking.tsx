import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BookingForm from "@/components/forms/BookingForm";

const Booking = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
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
    <div className="min-h-screen bg-accent/30 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-secondary mb-4">
            {t('booking.title')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/70">
            {t('booking.subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow-sm"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <BookingForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;