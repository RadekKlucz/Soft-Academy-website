import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceFeature {
  text: string;
}

interface ServiceProps {
  title: string;
  description: string;
  price: string;
  features: ServiceFeature[];
  popular?: boolean;
  onBookNow: () => void;
}

const ServiceCard = ({
  title,
  description,
  price,
  features,
  popular = false,
  onBookNow
}: ServiceProps) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`
        bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 
        flex flex-col relative
        ${popular ? 'shadow-md hover:shadow-lg border-2 border-primary transform scale-105' : ''}
      `}
    >
      {popular && (
        <div className="absolute -top-4 right-4 bg-primary text-white px-4 py-1 rounded-md text-sm font-medium">
          {t('services.popular')}
        </div>
      )}
      
      <h3 className="text-xl font-display font-semibold text-secondary mb-2">{title}</h3>
      <div className="w-16 h-1 bg-primary mb-4"></div>
      <p className="text-foreground/80 mb-4 flex-grow">{description}</p>
      
      <ul className="mb-6 text-foreground/80">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start mb-2">
            <Check className="text-primary h-5 w-5 mt-1 mr-2 flex-shrink-0" />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <div className="text-2xl font-display font-semibold text-primary mb-4">{price}</div>
        <Button 
          onClick={onBookNow}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {t('services.bookNow')}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
