import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioItem } from "@/lib/data";
import PortfolioDetailModal from "./PortfolioDetailModal";
import { defaultPortfolioItems } from "@/lib/data";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Category = "all" | "spring" | "summer" | "autumn" | "winter";

const PortfolioGallery = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch portfolio items from API
  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ['/api/portfolio'],
    // If API call fails, use the default items as fallback
    placeholderData: defaultPortfolioItems
  });

  // Filter portfolio items based on selected category
  const filteredItems = selectedCategory === "all"
    ? portfolioItems
    : portfolioItems?.filter(item => item.category === selectedCategory);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Portfolio Filters */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-accent hover:text-primary-dark"}
        >
          {t('portfolio.filters.all')}
        </Button>
        <Button
          variant={selectedCategory === "spring" ? "default" : "outline"}
          onClick={() => setSelectedCategory("spring")}
          className={selectedCategory === "spring" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-accent hover:text-primary-dark"}
        >
          {t('portfolio.filters.spring')}
        </Button>
        <Button
          variant={selectedCategory === "summer" ? "default" : "outline"}
          onClick={() => setSelectedCategory("summer")}
          className={selectedCategory === "summer" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-accent hover:text-primary-dark"}
        >
          {t('portfolio.filters.summer')}
        </Button>
        <Button
          variant={selectedCategory === "autumn" ? "default" : "outline"}
          onClick={() => setSelectedCategory("autumn")}
          className={selectedCategory === "autumn" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-accent hover:text-primary-dark"}
        >
          {t('portfolio.filters.autumn')}
        </Button>
        <Button
          variant={selectedCategory === "winter" ? "default" : "outline"}
          onClick={() => setSelectedCategory("winter")}
          className={selectedCategory === "winter" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-accent hover:text-primary-dark"}
        >
          {t('portfolio.filters.winter')}
        </Button>
      </div>
      
      {/* Portfolio Gallery */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative rounded-lg overflow-hidden">
              <Skeleton className="w-full h-72" />
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* For "all" category, show a carousel */}
          {selectedCategory === "all" ? (
            <motion.div
              key="all-carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Carousel className="max-w-7xl mx-auto relative" opts={{ loop: true }}>
                <CarouselContent className="-ml-4 md:-ml-6">
                  {filteredItems?.map((item) => (
                    <CarouselItem key={item.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                      <div className="group relative overflow-hidden rounded-lg shadow-md h-[360px]">
                        <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => handleItemClick(item)}>
                          <img 
                            src={item.imageUrl} 
                            alt={i18n.language === 'pl' ? 
                              `Analiza kolorystyczna - typ ${t(`portfolio.types.${item.category}`)}` : 
                              `Color analysis - ${t(`portfolio.types.${item.category}`)} type`
                            }
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-xl font-display font-semibold text-white">
                              {i18n.language === 'pl' ? 
                                item.title.replace(/Spring|Summer|Autumn|Winter/g, match => t(`portfolio.types.${match.toLowerCase()}`)) : 
                                item.title
                              }
                            </h3>
                            <p className="text-white">
                              {i18n.language === 'pl' 
                                ? (item.description_pl || (item.description_en ? item.description : item.description)) 
                                : (item.description_en || item.description)
                              }
                            </p>
                          </div>

                          {/* Category badge */}
                          <div className="absolute top-3 right-3 bg-white/80 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {t(`portfolio.types.${item.category}`)}
                          </div>

                          {/* Expand/View detail button */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="rounded-full bg-white/80 hover:bg-white shadow-sm w-10 h-10 text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(item);
                              }}
                            >
                              <Expand className="h-5 w-5" />
                            </Button>
                          </div>

                          {/* Before/After badge if item has multiple images */}
                          {item.beforeAfterImages && item.beforeAfterImages.length > 1 && (
                            <div className="absolute top-3 left-3 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t('portfolio.beforeAfter')}
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Slider Controls - positioned like in TestimonialsCarousel */}
                <CarouselPrevious 
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-white hover:bg-primary hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-foreground transition-colors duration-200" 
                />
                <CarouselNext 
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-white hover:bg-primary hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-foreground transition-colors duration-200" 
                />
              </Carousel>
            </motion.div>
          ) : (
            /* For specific categories, show a grid */
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems?.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-lg shadow-md"
                >
                  <div className="relative w-full h-72 overflow-hidden cursor-pointer" onClick={() => handleItemClick(item)}>
                    <img 
                      src={item.imageUrl} 
                      alt={i18n.language === 'pl' ? 
                        `Analiza kolorystyczna - typ ${t(`portfolio.types.${item.category}`)}` : 
                        `Color analysis - ${t(`portfolio.types.${item.category}`)} type`
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-display font-semibold text-white">
                        {i18n.language === 'pl' ? 
                          item.title.replace(/Spring|Summer|Autumn|Winter/g, match => t(`portfolio.types.${match.toLowerCase()}`)) : 
                          item.title
                        }
                      </h3>
                      <p className="text-white">
                        {i18n.language === 'pl' 
                          ? (item.description_pl || (item.description_en ? item.description : item.description)) 
                          : (item.description_en || item.description)
                        }
                      </p>
                    </div>

                    {/* Expand/View detail button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="rounded-full bg-white/80 hover:bg-white shadow-sm w-10 h-10 text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                      >
                        <Expand className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Before/After badge if item has multiple images */}
                    {item.beforeAfterImages && item.beforeAfterImages.length > 1 && (
                      <div className="absolute top-3 left-3 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('portfolio.beforeAfter')}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {filteredItems?.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {t('portfolio.noItems')}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Detail Modal */}
      <PortfolioDetailModal 
        item={selectedItem} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default PortfolioGallery;
