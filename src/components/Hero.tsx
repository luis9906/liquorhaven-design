import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
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
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 font-light tracking-widest text-sm mb-6 block uppercase bg-primary/30 backdrop-blur-sm inline-block px-6 py-2 rounded-full"
          >
            Tu licorería premium 24/7
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-7xl md:text-8xl font-bold text-white mb-8 leading-none tracking-tighter drop-shadow-2xl"
          >
            SERVICIO<br />24/7
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-white/90 mb-12 leading-relaxed font-light backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/10"
          >
            Descubre nuestra selecta colección de licores premium y experimenta un servicio excepcional las 24 horas del día.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-lg tracking-wide transform hover:scale-105 transition-all duration-300 rounded-xl shadow-lg shadow-primary/20"
            >
              VER CATÁLOGO
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/50 text-white hover:bg-white/10 px-12 py-8 text-lg tracking-wide transform hover:scale-105 transition-all duration-300 rounded-xl backdrop-blur-sm"
            >
              CONTACTAR
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;