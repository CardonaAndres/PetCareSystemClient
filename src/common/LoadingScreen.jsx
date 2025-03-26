import { PawPrint } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Efecto de resplandor púrpura */}
        <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
        
        {/* Logo y animación */}
        <div className="relative flex flex-col items-center">
          <PawPrint 
            className="text-purple-500 animate-bounce mb-6" 
            size={64} 
          />
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            Pet<span className="text-purple-500">Care</span>
          </h1>
          
          {/* Círculos de carga animados */}
          <div className="flex space-x-3 mb-8">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="h-3 w-3 bg-purple-600 rounded-full"
                style={{
                  animation: `bounce 1.4s infinite ease-in-out both`,
                  animationDelay: `${index * 0.16}s`
                }}
              ></div>
            ))}
          </div>
          
          <p className="text-gray-400 text-lg">Cargando...</p>
        </div>
      </div>
      
      {/* CSS para la animación de los puntos */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 
          40% { 
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
