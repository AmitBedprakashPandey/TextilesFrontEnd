"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { type ReadyMade }  from "@/lib/Redux/Reducers/RadymadeSlice"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"




interface ProductCardProps {
  product: ReadyMade;
}

export default function ProductCard({
  product
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <article className="group w-full overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        
        <Carousel>
  <CarouselContent>
    <CarouselItem>
      {product.images?.map((item,index)=>(
        <Image
          src={item.url}
          alt={product.itemName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ))}
    </CarouselItem>
      </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      </div>

      {/* Product Details */}
      <div className="space-y-3 p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-900 sm:text-base">
          {product.itemName}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.rate}
          </span>

                  </div>

        {/* Size Selector */}
        <div>
          <p className="mb-2 text-xs font-medium text-gray-600">
            Select Size
          </p>

          <div className="flex flex-wrap gap-1.5">
            {product.size?.map((size,index) => (
              <button
                key={size.rate + index}
                type="button"
                onClick={() => setSelectedSize(size.size)}
                aria-pressed={selectedSize === size.size}
                className={`min-h-9 min-w-9 rounded-md border px-2 text-xs font-medium transition-colors sm:text-sm ${
                  selectedSize === size.size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-black"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}