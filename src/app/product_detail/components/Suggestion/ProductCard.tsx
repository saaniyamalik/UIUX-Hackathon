import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    name,
    price,
    originalPrice,
    discount,
    rating,
    imageUrl,
  } = product;

  return (
    <Card className="group relative w-[198px] md:w-[295px] overflow-hidden rounded-none border-none shadow-none">
      <CardContent className="p-0">
        <div className="relative aspect-square flex justify-center items-center">

          <Image
            src={imageUrl}
            alt={name}
            width={295}
            height={180}
            className="w-[198px] md:w-[295px] h-[200.01px] md:h-[298px] object-scale-down"
          />
        </div>
        
        <div className="p-0 pt-4">
          <h3 className="font-bold text-[14px] md:text-[18px] mb-[4px] md:mb-[8px]">{name}</h3>
          {/* rating */}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            <span className="text-sm text-muted-foreground">{rating}/5</span>
          </div>
          {/* price */}
          <div className="flex items-center gap-2">
            <span className="text-[20px] md:text-[24px] font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[20px] md:text-[24px] font-bold text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {discount && (
              <Badge variant="destructive" className="bg-[rgba(255,_51,_51,_0.1)] font-medium text-[12px] leading-[16px] text-[#FF3333]">
                -{discount}%
              </Badge>
            )}
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
