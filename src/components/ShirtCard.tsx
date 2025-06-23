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
          <div className="text-center p-4">
            <div className="text-4xl mb-3">👕</div>
            <div className="text-lg font-bold old text-gray-900 leading-tight">
              {shirt.name}
            </div>
          </div>
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