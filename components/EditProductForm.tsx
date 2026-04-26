"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement)
        .value,
      price: parseFloat(
        (form.elements.namedItem("price") as HTMLInputElement).value,
      ),
      stock: parseInt(
        (form.elements.namedItem("stock") as HTMLInputElement).value,
      ),
      category: (form.elements.namedItem("category") as HTMLInputElement).value,
      imageUrl: (form.elements.namedItem("imageUrl") as HTMLInputElement).value,
    };

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError("Failed to update product");
      setLoading(false);
    } else {
      router.push("/admin/products");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {[
        { id: "name", label: "Name", type: "text", defaultValue: product.name },
        {
          id: "description",
          label: "Description",
          type: "text",
          defaultValue: product.description,
        },
        {
          id: "price",
          label: "Price",
          type: "number",
          defaultValue: product.price,
        },
        {
          id: "stock",
          label: "Stock",
          type: "number",
          defaultValue: product.stock,
        },
        {
          id: "category",
          label: "Category",
          type: "text",
          defaultValue: product.category,
        },
        {
          id: "imageUrl",
          label: "Image URL",
          type: "text",
          defaultValue: product.imageUrl,
        },
      ].map((field) => (
        <div key={field.id} className="flex flex-col gap-1.5">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            defaultValue={String(field.defaultValue)}
            step={field.id === "price" ? "0.01" : undefined}
            required
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 mt-2">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
