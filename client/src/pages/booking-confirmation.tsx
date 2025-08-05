import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const BookingConfirmation = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(7);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set up countdown and redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLocation("/"); // Redirect to home page
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [setLocation]);
  
  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white p-10 rounded-lg shadow-sm text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          
          <h1 className="text-3xl font-display font-semibold text-secondary mb-4">
            {t('bookingConfirmation.title')}
          </h1>
          
          <p className="text-lg text-foreground/70 mb-6">
            {t('bookingConfirmation.message')}
          </p>
          
          <p className="text-primary font-medium">
            {t('bookingConfirmation.redirect', { count: countdown })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;