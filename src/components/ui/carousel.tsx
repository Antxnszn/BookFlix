import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, BookOpen } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  // rating: number;
  genre: string;
  description: string;
}

interface BookCarouselProps {
  title: string;
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ title, books }) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Ancho de cada libro + gap
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-12 group">
      {/* Título de la sección */}
      <h2 className="text-2xl font-bold text-[#FBFDFA] mb-6">
        {title}
      </h2>

      {/* Contenedor del carrusel */}
      <div className="relative ">
        {/* Botón izquierdo */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg- text-[#FBFDFA] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 md:ml-12"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Botón derecho */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#FFFFFF] hover:bg-black text-[#FBFDFA] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4 md:mr-12"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Contenedor de libros con scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="relative flex-shrink-0 w-72"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              {/* Tarjeta del libro */}
              <div className={`
                relative bg-none rounded-lg overflow-hidden cursor-pointer
                transition-all duration-300 ease-out
                ${hoveredBook === book.id 
                  ? 'scale-105 shadow-2xl shadow-black/50 z-20' 
                  : 'hover:scale-102'
                }
              `}>
                {/* Imagen de portada */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Información básica siempre visible */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-[#FBFDFA]">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {book.author}
                  </p>
                </div>

                {/* Información expandida en hover */}
                {hoveredBook === book.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-[#FBFDFA]">
                          {book.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-2">
                          por {book.author}
                        </p>
                      </div>

                      {/* Rating y metadatos */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-[#FBFDFA] font-medium">
                            {book.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                          <BookOpen className="w-4 h-4" />
                          <span>{book.genre}</span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed">
                        {book.description}
                      </p>

                      {/* Botones de acción */}
                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                          Leer ahora
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-[#FBFDFA] p-2 rounded transition-colors">
                          <BookOpen className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </div>
  );
};

// Datos de ejemplo
const sampleBooks: Book[] = [
  {
    id: 1,
    title: "El Nombre del Viento",
    author: "Patrick Rothfuss",
    cover: "",
    rating: 4.8,
    genre: "Fantasía",
    readTime: "15h 30min",
    description: "Una épica historia de magia, música y misterio que sigue las aventuras de Kvothe, un joven con un destino extraordinario."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "",
    rating: 4.9,
    genre: "Distopía",
    readTime: "8h 45min",
    description: "Una visionaria novela sobre un futuro totalitario donde la libertad de pensamiento es el último refugio de la humanidad."
  },
  {
    id: 3,
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    cover: "",
    rating: 4.7,
    genre: "Realismo Mágico",
    readTime: "12h 15min",
    description: "La saga multigeneracional de la familia Buendía en el mítico pueblo de Macondo, una obra maestra del realismo mágico."
  },
  {
    id: 4,
    title: "El Alquimista",
    author: "Paulo Coelho",
    cover: "",
    rating: 4.6,
    genre: "Filosofía",
    readTime: "4h 30min",
    description: "La inspiradora historia de Santiago, un joven pastor que emprende un viaje para descubrir su leyenda personal."
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    cover: "",
    rating: 4.5,
    genre: "Ciencia Ficción",
    readTime: "22h 10min",
    description: "Una épica espacial ambientada en el desértico planeta Arrakis, donde el control de la especia determina el destino del universo."
  },
  {
    id: 6,
    title: "Orgullo y Prejuicio",
    author: "Jane Austen",
    cover: "",
    rating: 4.4,
    genre: "Romance Clásico",
    readTime: "11h 20min",  
    description: "Una ingeniosa comedia de modales que explora temas de amor, reputación y clase social en la Inglaterra del siglo XIX."
  }
];

// Componente principal de demostración
export default function App() {
  return (
    <div className="">
      <div className="pt-8">
        <BookCarousel 
          title="Recomendados para ti" 
          books={sampleBooks} 
        />
        <BookCarousel 
          title="Más populares" 
          books={sampleBooks.slice().reverse()} 
        />
        <BookCarousel 
          title="Nuevos lanzamientos" 
          books={sampleBooks.slice(2)} 
        />
      </div>
    </div>
  );
}