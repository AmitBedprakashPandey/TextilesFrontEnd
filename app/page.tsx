import ProductCard from "@/components/ProductViewCard";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  rate: number;
  sizes: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cotton Printed Frock",
    rate: 599,
    sizes: ["S", "M", "L", "XL"],
    image: "/products/frock-1.webp",
  },
  {
    id: "2",
    name: "Floral Midi Dress",
    rate: 799,
    sizes: ["M", "L", "XL", "XXL"],
    image: "/products/dress-1.webp",
  },
];

export default function page() {
    return<>
    hhh

{products.map((item,index)=>(
    
    
<div className="max-w-2xs">

    <ProductCard  product={item} key={index}/>
</div>
))}

    
    </>
}