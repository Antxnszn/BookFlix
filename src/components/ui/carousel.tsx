import React, { useState, useRef, useEffect } from "react";
import { Star, X } from "lucide-react";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string[];
  description: string;
  rating: number;
}

interface BookCarouselProps {
  title: string;
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ title, books }) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:5000/api/favorites/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.favoriteIds) {
          setFavoriteIds(data.favoriteIds);
        }
      })
      .catch((err) => console.error("Error al cargar favoritos:", err));
  }, []);

  const toggleFavorite = (bookId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Por favor inicia sesión para agregar favoritos.");
      return;
    }

    fetch("http://localhost:5000/api/favorites/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Number(userId), bookId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFavoriteIds((prev) =>
            prev.includes(bookId)
              ? prev.filter((id) => id !== bookId)
              : [...prev, bookId]
          );
        } else {
          console.error("Error actualizando favoritos:", data.error);
        }
      })
      .catch((err) => console.error("Error al actualizar favoritos:", err));
  };

  return (
    <div className="relative">
      <h2 className="text-2xl ml-10 font-bold text-[#FBFDFA] mb-6">{title}</h2>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books.map((book) => {
            const isFavorite = favoriteIds.includes(book.id);

            return (
              <div
                key={book.id}
                className="relative flex-shrink-0 w-32"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <div
                  className={`relative bg-none rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
                    hoveredBook === book.id
                      ? "scale-105 shadow-2xl shadow-black/50 z-20"
                      : "hover:scale-102"
                  }`}
                >
                  <div className="relative aspect-[5/8] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000810] to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-[#E0F1FA]">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-[#E0F1FA] text-sm">{book.author}</p>
                  </div>

                  {hoveredBook === book.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end">
                      <div className="space-y-3">
                        <div className="flex gap-2 pt-2">
                          <button
                            className="flex-1 bg-[#D1E3F7] text-black font-semibold py-1 px-1 rounded hover:bg-[#93BBE5] transition-colors"
                            onClick={() => setSelectedBook(book)}
                          >
                            Ver sinopsis
                          </button>

                          {/* Botón para agregar/quitar favorito */}
                          <button
                            onClick={() => toggleFavorite(book.id)}
                            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                            className={`p-2 rounded-full transition-colors ${
                              isFavorite ? "bg-[#93BBE5] text-black" : "bg-[#354A55] text-white"
                            }`}
                          >
                            <Star
                              className="w-5 h-5"
                              fill={isFavorite ? "yellow" : "none"}
                              stroke={isFavorite ? "black" : "white"}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL DE SINOPSIS */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#000810] w-full max-w-lg p-6 rounded-lg shadow-lg relative mx-4">
            <button
              className="absolute top-4 right-4 text-[#D1E3F7] hover:text-[#6F9CCA]"
              onClick={() => setSelectedBook(null)}
              aria-label="Cerrar sinopsis"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl text-[#E0F1FA] font-bold mb-2">{selectedBook.title}</h3>
            <p className="text-[#9FB8C5] text-sm mb-1">por {selectedBook.author}</p>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-[#9FB8C5] font-medium">{selectedBook.rating.toFixed(2)}</span>
              <span className="text-[#687F8B]">· {selectedBook.genre.join(", ")}</span>
            </div>
            <p className="text-[#E0F1FA] whitespace-pre-line">{selectedBook.description}</p>
          </div>
        </div>
      )}

      <style>{`
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
      `}</style>
    </div>
  );
};

export default BookCarousel;
