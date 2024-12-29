import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png')`
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-3xl">
          <span className="text-primary font-medium mb-4 block">Tu licorería premium 24/7</span>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            EXPERIENCIA Y<br />EXCLUSIVIDAD
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Descubre nuestra selecta colección de licores premium y experimenta un servicio excepcional las 24 horas del día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              VER CATÁLOGO
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-background px-8 py-6 text-lg">
              CONTACTAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;