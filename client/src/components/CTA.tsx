import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  primary?: {
    text: string;
    action: () => void;
  };
  secondary?: {
    text: string;
    action: () => void;
  };
  className?: string;
}

const CTA = ({ primary, secondary, className = "" }: CTAProps) => {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {primary && (
        <Button 
          onClick={primary.action} 
          size="lg" 
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white"
        >
          {primary.text}
        </Button>
      )}
      {secondary && (
        <Button 
          onClick={secondary.action} 
          variant="outline" 
          size="lg"
          className="border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
        >
          {secondary.text}
        </Button>
      )}
    </div>
  );
};

export default CTA;