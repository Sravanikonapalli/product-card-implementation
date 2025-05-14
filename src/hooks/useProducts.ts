import { useQuery } from "@tanstack/react-query"; 
import { Product } from "../models/Product"; 

const fetchProducts = async (): Promise<Product[]> => {
  // Function to fetch products from the API.
  const res = await fetch("https://fakestoreapi.com/products"); 
  if (!res.ok) throw new Error("Failed to fetch products"); 
  return res.json(); 
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"], // Query key for caching and tracking the query.
    queryFn: fetchProducts, 
  });
};
