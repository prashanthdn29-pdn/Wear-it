import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      await storage.createSubscriber(input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle unique constraint error
      if (err instanceof Error && 'code' in err && err.code === '23505') {
         return res.status(400).json({ message: 'Email already subscribed' });
      }
      throw err;
    }
  });

  // Seed data
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await storage.createProduct({
      name: "Classic Navy Blazer",
      description: "A sharp, structured blazer in deep navy. Perfect for professional settings.",
      price: "299.00",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
      category: "Outerwear",
      featured: true
    });
    await storage.createProduct({
      name: "Electric Blue Oxford",
      description: "Stand out with this vibrant electric blue oxford shirt. Premium cotton.",
      price: "89.00",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
      category: "Shirts",
      featured: true
    });
    await storage.createProduct({
      name: "Cool Grey Chinos",
      description: "Versatile tailored chinos in a modern cool grey shade.",
      price: "129.00",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
      category: "Pants",
      featured: true
    });
    await storage.createProduct({
      name: "Minimalist White Tee",
      description: "The essential white t-shirt. High quality heavyweight cotton.",
      price: "45.00",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
      category: "T-Shirts",
      featured: true
    });
  }

  return httpServer;
}
