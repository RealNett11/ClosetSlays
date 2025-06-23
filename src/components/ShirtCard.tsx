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
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden h-full flex flex-col">
      <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Transparent container with loading state */}
        <div className="aspect-square bg-transparent rounded-xl mb-4 overflow-hidden relative">
          <img
            src={shirt.image}
            alt={`${shirt.name} - Pride shirt`}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-[1.03] mix-blend-multiply"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-shirt.svg";
              target.parentElement?.classList.add('bg-gray-50');
            }}
          />
        </div>
        
        {/* Content section */}
        <div className="text-center space-y-3 mt-auto">
          <h3 className="font-medium text-base sm:text-lg text-gray-800 line-clamp-2 leading-tight">
            {shirt.name}
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-700 min-h-[2.5rem] flex items-center justify-center">
            {shirt.price}
          </p>
          <AddToCartButton className="mt-2 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};