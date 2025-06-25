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
    <Card className="group transition-all duration-300 bg-white/20 backdrop-blur-md rounded-xl overflow-hidden border border-black/20 hover:border-black/30 shadow-sm hover:shadow-lg hover:bg-white/30">
      <CardContent className="p-4">
        {/* Image container - bg-transparent is fine here, it just makes the background transparent */}
        <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-transparent">
          <img
            src={shirt.image}
            alt={`${shirt.name} shirt`}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder-shirt.svg";
            }}
          />
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="font-medium text-lg text-gray-800 group-hover:text-black leading-tight">
            {shirt.name}
          </h3>
          <p className="text-2xl font-bold text-gray-700">{shirt.price}</p>
          
          <AddToCartButton shirt={shirt} />
        </div>
      </CardContent>
    </Card>
  );
};