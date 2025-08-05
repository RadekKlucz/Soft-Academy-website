
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/lib/data";

const TestimonialsCarousel = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Get testimonials from locale files
  const localeTestimonials = t('testimonials.reviews', { returnObjects: true }) as any[];
  
  // Fetch testimonials from API with locale fallback
  const { data: apiTestimonials, isLoading } = useQuery({
    queryKey: ['/api/testimonials']
  });

  // Use API data if available and not empty, otherwise use locale data
  const testimonials = (apiTestimonials && Array.isArray(apiTestimonials) && apiTestimonials.length > 0) 
    ? apiTestimonials 
    : (Array.isArray(localeTestimonials) ? localeTestimonials : []);

  // Determine how many slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    // Set mounted state to handle proper hydration
    setIsMounted(true);

    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max slides based on testimonials length
  const maxSlide = testimonials ? Math.max(0, testimonials.length - slidesToShow) : 0;

  // Handle next/prev navigation
  const goToNextSlide = () => {
    setCurrentSlide(current => current >= maxSlide ? 0 : current + 1);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(current => current <= 0 ? maxSlide : current - 1);
  };

  // Go to specific slide (dot indicator)
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Render star ratings
  const renderStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted'}`} 
      />
    ));
  };

  if (!isMounted) {
    return null; // Avoid hydration issues
  }

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array(slidesToShow).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="bg-muted p-8 rounded-lg shadow-sm h-full">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-24 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Testimonial Slides */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-all"
              initial={false}
              animate={{ x: `-${currentSlide * (100 / slidesToShow)}%` }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
              ref={sliderRef}
            >
              {testimonials?.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`flex-shrink-0 w-full ${
                    slidesToShow === 3 ? 'lg:w-1/3' : ''
                  } ${
                    slidesToShow >= 2 ? 'md:w-1/2' : ''
                  } px-4`}
                >
                  <div className="bg-muted p-8 rounded-lg shadow-sm h-full">
                    <p className="italic text-foreground/80 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-medium text-secondary">{testimonial.name}</h4>
                        <p className="text-sm text-foreground/70">
                          {t(`testimonials.types.${testimonial.colorType}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider Controls */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white hover:bg-primary hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-foreground transition-colors duration-200"
            aria-label={t('accessibility.previousTestimonial')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white hover:bg-primary hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-foreground transition-colors duration-200"
            aria-label={t('accessibility.nextTestimonial')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>


        </>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
