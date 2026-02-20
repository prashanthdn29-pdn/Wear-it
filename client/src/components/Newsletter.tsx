import { useState } from "react";
import { useSubscribe } from "@/hooks/use-subscribers";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate({ email }, {
      onSuccess: () => setEmail("")
    });
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Join the Inner Circle
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Subscribe to receive updates on new collections, exclusive offers, and style inspiration.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribe.isPending}
                required
                className="w-full pl-6 pr-14 py-4 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {subscribe.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
