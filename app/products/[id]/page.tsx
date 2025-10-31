"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsClient() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {products.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}
