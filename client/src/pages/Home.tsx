import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Leaf, Loader2 } from "lucide-react";

// ✅ ADD THIS IMPORT
import BannerImg from "@/Assets/Banner-img.jpg";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#F5F5F0]">
          <img
            src={BannerImg}
            alt="Unisex Collection Background"
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-foreground">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 text-sm md:text-base font-medium tracking-[0.2em] uppercase"
          >
            Collection of 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-emarald-500"
          >
            Effortless Elegence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-xl mx-auto text-lg md:text-xl font-light mb-10 leading-relaxed"
          >
            Discover our curated collection of timeless essentials designed for the modern wardrobe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-colors shadow-lg"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                Crafted from the finest materials to ensure lasting durability and comfort.
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">Sustainable Materials</h3>
              <p className="text-muted-foreground text-sm">
                Ethically sourced fabrics that look good and feel good for the planet.
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">Express Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Fast and reliable delivery to your doorstep, worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="collection" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}