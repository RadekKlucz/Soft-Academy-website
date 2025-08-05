import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import Contact from "@/pages/contact";
import BookingConfirmation from "@/pages/BookingConfirmation";
import ContactConfirmation from "@/pages/ContactConfirmation";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function App() {
  const { i18n } = useTranslation();
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;

    // Update the title based on language
    document.title = i18n.language === 'pl' 
      ? 'ColorAnalyst | Profesjonalna analiza kolorystyczna'
      : 'ColorAnalyst | Professional Color Analysis';

    // Update meta description based on language
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        i18n.language === 'pl'
          ? 'Profesjonalna analiza kolorystyczna dla kobiet. Odkryj kolory, które podkreślą Twoją naturalną urodę i dopasuj swoją garderobę idealnie do Twojego typu urody.'
          : 'Professional color analysis for women. Discover colors that enhance your natural beauty and match your wardrobe perfectly to your beauty type.'
      );
    }
  }, [i18n.language]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/booking" component={Booking} />
        <Route path="/contact" component={Contact} />
        <Route path="/contact-confirmation" component={ContactConfirmation} />
        <Route path="/booking-confirmation" component={BookingConfirmation} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <CookieBanner />
    </>
  );
}