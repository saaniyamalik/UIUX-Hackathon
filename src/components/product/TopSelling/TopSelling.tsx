"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "../ProductCard";

// Define the Item type for better type safety
interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  tag: string[]; 
}

// Card Component
const Card: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <div className="flex gap-[16px] md:gap-[20px] flex-wrap justify-center">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

// TopSelling Component
const TopSelling: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Item[] = await response.json();

        // Filter items with the "New Arrival" tag
        const TopSellingItems = data.filter((item) =>
          item.tag.includes("Top Selling")
        );

        setAllItems(TopSellingItems);

        // Initially show limited items (e.g., 4)
        setVisibleItems(TopSellingItems.slice(0, 4));
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAll = () => {
    setShowAll(!showAll);
    setVisibleItems(showAll ? allItems.slice(0, 4) : allItems);
  };

  if (loading) {
    return <p className="w-full text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (allItems.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-[50px] md:pt-[72px] px-[16px]">
      <h1 className="text-[32px] md:text-[48px] font-bold uppercase">top selling</h1>
      <div className="min-w-[310px] w-full mt-[32px] md:mt-[55px] flex justify-start md:justify-center items-center overflow-hidden">
        <Card items={visibleItems} />
      </div>
      <Button
        onClick={handleViewAll}
        className="mt-[24px] md:mt-[36px] w-full md:w-[218px] h-[52px] bg-transparent border-[1px] border-[rgba(0,0,0,0.1)] rounded-full text-[16px] text-black font-medium"
      >
        {showAll ? "View Less" : "View All"}
      </Button>
      <div className="shrink-0 mt-[40px] max-w-full h-px border border-solid border-black border-opacity-10 w-[1240px] max-md:mt-[64px]" />
    </div>
  );
};

export default TopSelling;
