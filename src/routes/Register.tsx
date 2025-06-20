import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
    genres: [] as string[],
  });

  const genresList = [
    "Fantasía",
    "Ciencia Ficción",
    "Romance",
    "Terror",
    "Historia",
    "Misterio",
    "Aventura",
  ];

  const handleGenreChange = (genre: string) => {
    setForm((prev) => {
      const newGenres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí se mandaría la info al backend (Flask)
    console.log("Registrando usuario:", form);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-6">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded"
          required
        />
        <input
          type="date"
          value={form.birthdate}
          onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded"
          required
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded"
          required
        />

        <div>
          <label className="block mb-2">Géneros favoritos:</label>
          <div className="grid grid-cols-2 gap-2">
            {genresList.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="accent-purple-600"
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-500">
          Registrarme
        </button>
      </form>
    </div>
  );
}
