import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    { src: "https://www.kivet.com/wp-content/uploads/2023/04/Beneficios-de-crecer-con-mascotas-min.jpg", alt: "Perro en consulta veterinaria", caption: "Atención veterinaria personalizada" },
    { src: "https://www2.claro.com.co/portal/recursos/co//cpp/promociones/imagenes/1592603606948-2-Cuidado-de-mascotas.jpg", alt: "Gato recibiendo vacuna", caption: "Vacunación segura y eficiente" },
    { src: "https://purina.com.co/sites/default/files/2022-11/purina-como-cuidar-al-gato-esfinge-y-otras-razas-de-gatos-sin-pelo-nota_04.jpg", alt: "Familia con mascota", caption: "Cuidado integral para toda la familia" },
    { src: "https://th.bing.com/th/id/OIP.AajecVd_VKunf7a3p16ayAHaEo?rs=1&pid=ImgDetMain", alt: "Registro de mascota", caption: "Información completa y actualizada" },
    { src: "https://segurossura.com/content/uploads/sites/10/2021/01/seguros-sura-las-mascotas-son-peligrosas-para-la-salud.jpg", alt: "Registro de mascota", caption: "PetCare System" }
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full h-96 bg-gray-900 rounded-lg">
      {/* Overlay decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 z-10"></div>
      
      {/* Carrusel de imágenes */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-xl font-semibold text-white">{image.caption}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controles */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full z-20 text-white border border-purple-500"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full z-20 text-white border border-purple-500"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicador de diapositivas */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-purple-500 w-6' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
