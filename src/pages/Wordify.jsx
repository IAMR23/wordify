import { useState } from "react";

export default function Carousel() {
  // Datos de ejemplo (puedes reemplazarlos con tus propios elementos)
  const items = [
    {
      id: 1,
      title: "Elemento 1",
      description: "Este es el primer elemento del carrusel.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vitae aliquam lacinia.",
    },
    {
      id: 2,
      title: "Elemento 2",
      description: "Este es el segundo elemento del carrusel.",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec lacinia mauris eget massa semper.",
    },
    {
      id: 3,
      title: "Elemento 3",
      description: "Este es el tercer elemento del carrusel.",
      content:
        "Fusce scelerisque, nunc eget tincidunt elementum, quam ligula commodo elit, vel tempor justo nisi eget nunc.",
    },
    {
      id: 4,
      title: "Elemento 4",
      description: "Este es el cuarto elemento del carrusel.",
      content:
        "Nullam vehicula magna eget condimentum ultrices. Morbi at justo ac nunc tempor facilisis at vel turpis.",
    },
  ];

  // Estado para controlar el índice actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Funciones para navegar entre elementos
  const goToPrevious = () => {
    // Si estamos en el primer elemento, ir al último
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    // Si estamos en el último elemento, volver al primero
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Función para manejar cambios con teclado también (accesibilidad)
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <button
      className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative bg-gray-800 rounded-xl p-8 shadow-lg">
          {/* Elemento actual */}
          <div className="min-h-64 flex flex-col items-center justify-center py-8 px-4">
            <div className="text-center mb-8">
              <h3 className="text-indigo-400 text-3xl font-bold mb-2">
                {items[currentIndex].title}
              </h3>
              <p className="text-gray-300 text-lg mb-4">
                {items[currentIndex].description}
              </p>
              <div className="text-gray-400 text-base">
                {items[currentIndex].content}
              </div>
            </div>

            {/* Indicador de posición */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {items.map((_, index) => (
                <button
                  key={_}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-indigo-500" : "bg-gray-600"
                  }`}
                  aria-label={`Ir al elemento ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={goToPrevious}
              className="bg-gray-900 text-white p-2 rounded-full -ml-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={goToNext}
              className="bg-gray-900 text-white p-2 rounded-full -mr-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
              aria-label="Siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicador de posición numérico */}
          <div className="absolute bottom-4 right-4 bg-gray-900 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    </button>
  );
}
