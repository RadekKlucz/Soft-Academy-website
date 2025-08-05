import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortfolioItem } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioDetailModal = ({ item, isOpen, onClose }: PortfolioDetailModalProps) => {
  const { t, i18n } = useTranslation();
  const [imageIndex, setImageIndex] = useState(0);

  // Bezpieczne sprawdzenie czy są obrazy
  const hasMultipleImages = item?.beforeAfterImages && item.beforeAfterImages.length > 1;

  // Handlers for navigation
  const handlePrevImage = useCallback(() => {
    if (item && hasMultipleImages) {
      setImageIndex((prev) => (prev === 0 ? item.beforeAfterImages!.length - 1 : prev - 1));
    }
  }, [item, hasMultipleImages]);

  const handleNextImage = useCallback(() => {
    if (item && hasMultipleImages) {
      setImageIndex((prev) => (prev === item.beforeAfterImages!.length - 1 ? 0 : prev + 1));
    }
  }, [item, hasMultipleImages]);

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen && item) {
      setImageIndex(0);
    }
  }, [isOpen, item]);

  // Early return if no item
  if (!item) return null;

  // Get current image and status
  const currentImage = hasMultipleImages ? item.beforeAfterImages![imageIndex] : item.imageUrl;
  const isBefore = imageIndex === 0;
  const isAfter = imageIndex === 1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {i18n.language === 'pl' ? 
              item.title.replace(/Spring|Summer|Autumn|Winter/g, match => t(`portfolio.types.${match.toLowerCase()}`)) : 
              item.title
            }
          </DialogTitle>
          <DialogDescription>
            {i18n.language === 'pl' 
              ? (item.description_pl || (item.description_en ? item.description : item.description)) 
              : (item.description_en || item.description)
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div 
            className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900"
          >
            <img 
              src={currentImage} 
              alt={`${item.title} ${isBefore ? t('portfolio.before') : t('portfolio.after')}`} 
              className="w-full h-80 object-cover"
            />
            
            {hasMultipleImages && (
              <>
                <div className="absolute top-2 left-2 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {isBefore ? t('portfolio.before') : t('portfolio.after')}
                </div>
                
                {/* Centered navigation controls */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-full px-4">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="rounded-full bg-white/80 hover:bg-white text-primary w-10 h-10 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="rounded-full bg-white/80 hover:bg-white text-primary w-10 h-10 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {item.beforeAfterImages?.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-2 w-2 rounded-full ${idx === imageIndex ? 'bg-primary' : 'bg-white/50'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Details Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{t('portfolio.colorType')}</h3>
              <p>{i18n.language === 'pl' ? 
                (item.colorTypeDescription || '') : 
                (item.colorTypeDescription_en || item.colorTypeDescription || '')
              }</p>
            </div>
            
            {isBefore && item.clothingBefore && (
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('portfolio.clothingBefore')}</h3>
                <p>{i18n.language === 'pl' ? 
                  item.clothingBefore : 
                  (item.clothingBefore_en || item.clothingBefore || '')
                }</p>
              </div>
            )}
            
            {isAfter && item.clothingAfter && (
              <div>
                <h3 className="text-lg font-semibold mb-1">{t('portfolio.clothingAfter')}</h3>
                <p>{i18n.language === 'pl' ? 
                  item.clothingAfter : 
                  (item.clothingAfter_en || item.clothingAfter || '')
                }</p>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-1">{t('portfolio.details')}</h3>
              <p>{i18n.language === 'pl' ? 
                (item.detailedDescription || '') : 
                (item.detailedDescription_en || item.detailedDescription || '')
              }</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDetailModal;