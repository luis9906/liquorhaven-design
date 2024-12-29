import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png')`
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            LICORES AL POR MAYOR
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Los mejores precios y la más amplia variedad de licores para tu negocio
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              COTIZA AQUÍ
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-background px-8 py-6 text-lg">
              MÁS INFORMACIÓN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;