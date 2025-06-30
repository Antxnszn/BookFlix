import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import booksRaw from "../data/BookDetails.json";
import BookCarousel, { Book } from "../components/ui/carousel";

const spanishToEnglish: { [key: string]: string } = {
  "Fantasía": "Fantasy",
  "Ciencia Ficción": "Fiction",
  "Romance": "Romance",
  "Terror": "Horror",
  "Historia": "History",
  "Misterio": "Mystery",
  "Aventura": "Adventure",
};

const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

const normalizedSpanishToEnglish: { [key: string]: string } = {};
Object.entries(spanishToEnglish).forEach(([es, en]) => {
  normalizedSpanishToEnglish[normalize(es)] = en;
});

function parseGenres(genres: string | string[]): string[] {
  if (Array.isArray(genres)) return genres;
  try {
    return JSON.parse(genres.replace(/'/g, '"'));
  } catch {
    return [genres];
  }
}

const fuseOptions = {
  threshold: 0.4,
};

function filterBooksByFuzzyGenres(books: Book[], userGenresSpanish: string[]) {
  const userGenresEnglish = userGenresSpanish.map((g) => {
    const norm = normalize(g);
    return normalizedSpanishToEnglish[norm] || g;
  });

  console.log("Géneros usuario traducidos:", userGenresEnglish);

  return books.filter((book) => {
    const fuse = new Fuse(book.genre, fuseOptions);
    return userGenresEnglish.some((userGenre) => fuse.search(userGenre).length > 0);
  });
}

function Home() {
  const [userGenresSpanish, setUserGenresSpanish] = useState<string[]>([]);

  useEffect(() => {
    const storedGenres = localStorage.getItem("userGenres");
    if (storedGenres) {
      const parsed = JSON.parse(storedGenres);
      console.log("Géneros recibidos:", parsed);
      setUserGenresSpanish(parsed);
    } else {
      console.log("No se encontraron géneros en localStorage");
    }
  }, []);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:5000/api/favorites/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.favoriteIds) {
          setFavoriteIds(data.favoriteIds);
        }
      })
      .catch(err => console.error("Error cargando favoritos:", err));
  }, []);


  const books: Book[] = booksRaw.map((b) => ({
    id: b.book_id,
    title: b.book_title,
    author: b.author,
    cover: b.cover_image_uri,
    genre: parseGenres(b.genres),
    description: b.book_details,
    rating: b.average_rating,
  }));

  const filteredBooks = filterBooksByFuzzyGenres(books, userGenresSpanish);
   const favoriteBooks = books.filter(book => favoriteIds.includes(book.id));


  return (
    <div className="space-y-12">
      <BookCarousel title="Libros destacados" books={books.slice(0, 10)} />
      <BookCarousel title="Creemos que podrían gustarte" books={filteredBooks.slice(0,10)} />
      <BookCarousel title="Tus favoritos" books={favoriteBooks} />
    </div>
  );
}

export default Home;
