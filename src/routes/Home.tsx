import { useState } from 'react';
import Carousel from '../components/ui/carousel';
import './App.css';

function App() {
  const slides = [
    {
      title: "1984 - George Orwell",
      button: "Ver sinopsis",
      src: "https://picsum.photos/id/1011/800/800",
    },
    {
      title: "Cien años de soledad - G. G. Márquez",
      button: "Ver sinopsis",
      src: "https://picsum.photos/id/1015/800/800",
    },
    {
      title: "El nombre del viento - Patrick Rothfuss",
      button: "Ver sinopsis",
      src: "https://picsum.photos/id/1019/800/800",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden flex items-center justify-center bg-none">
      <Carousel slides={slides} />
    </div>
  );
}

export default App;
