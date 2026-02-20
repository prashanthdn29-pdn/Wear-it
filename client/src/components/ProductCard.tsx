import { ProductResponse } from "@shared/routes";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your bag.`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col overflow-hidden rounded-sm bg-white"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full px-6 py-4 transition-transform duration-300 ease-out group-hover:translate-y-0 flex justify-center bg-white/90 backdrop-blur-sm">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-lg font-medium text-foreground font-display">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-semibold text-primary">
            ₹{Math.round(Number(product.price) * 83)}
          </p>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
