"use client"
import { PrincipleProduct } from "@/components/principleProduct";
import shoeAcg from "@/assets/shoes/shoes-acg.png";
import shoeOne from "@/assets/shoes/shoes-one.png";
import shoeAir from "@/assets/shoes/shoes-air.png";
import { StaticImageData } from "next/image";

type ObjectsProductsProps = {
  id: number,
  title: string,
  price: number,
  urlImageShoe: StaticImageData,
  textColor: string,
  bgColor: string
}

const objectsProducts = [
  {
    id: 1,
    title: "ACG",
    price: 70000,
    urlImageShoe: shoeAcg,
    textColor: "text-[#5A5B5D]",
    bgColor: "bg-gray-600"
  },
  {
    id: 2,
    title: "ONE",
    price: 94999,
    urlImageShoe: shoeOne,
    textColor: "text-blue-800 h-64",
    bgColor: "bg-blue-700"
  },
  {
    id: 3,
    title: "AIR",
    price: 120000,
    urlImageShoe: shoeAir,
    textColor: "text-[#9CA5A5] h-80",
    bgColor: "bg-green-700"
  },
]

export default function Home() {
  return (
    <section className="h-screen w-full flex">
      {
        objectsProducts.map((product:ObjectsProductsProps) => {
          return (
            <PrincipleProduct
              selectShoe={product.urlImageShoe}
              title={product.title}
              bgColor={product.bgColor}
              textColor={product.textColor}
              key={product.id}
              id={product.id}
              price={product.price}
            />
          )
      })
      }
    </section>
  );
}
