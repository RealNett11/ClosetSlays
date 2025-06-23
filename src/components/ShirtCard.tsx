import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "./AddToCartButton";

interface Shirt {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ShirtCardProps {
  shirt: Shirt;
}

export const ShirtCard = ({ shirt }: ShirtCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="aspect-square bg-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
          {/* Image implementation with proper alt text and lazy loading */}
          <img
            src={shirt.image}
            alt={`${shirt.name} - Pride shirt`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder-shirt.svg"; // Your fallback image path
            }}
          />
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
            {shirt.name}
          </h3>
          <p className="text-2xl font-bold text-gray-700">{shirt.price}</p>
          
          <AddToCartButton />
        </div>
      </CardContent>
    </Card>
  );
};