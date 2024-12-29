import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png')`
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-7xl font-bold text-white mb-8">
          LICORES AL POR<br />MAYOR
        </h1>
        <div className="flex space-x-4">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            COTIZA AQUÍ
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-background px-8 py-6 text-lg">
            MÁS INFORMACIÓN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;