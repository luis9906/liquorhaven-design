import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/lovable-uploads/0a56e83e-1603-402b-aa35-8b36aeab3193.png')`
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-white/80 font-light tracking-widest text-sm mb-6 block uppercase">
            Tu licorería premium 24/7
          </span>
          <h2 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-none tracking-tighter">
            SERVICIO<br />24/7
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
            Descubre nuestra selecta colección de licores premium y experimenta un servicio excepcional las 24 horas del día.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-black px-12 py-8 text-lg tracking-wide transform hover:scale-105 transition-all duration-300"
            >
              VER CATÁLOGO
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-12 py-8 text-lg tracking-wide transform hover:scale-105 transition-all duration-300"
            >
              CONTACTAR
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;