// client/src/pages/Register.tsx
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          birthdate: form.birthdate,
          email: form.email,
          password: form.password,
          genres: form.genres,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Registro exitoso!");
        if (response.ok) {
  setSuccessMessage(data.message || "Registro exitoso!");

  // Guardar token, userId y géneros en localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user_id.toString());

  const spanishToEnglish: { [key: string]: string } = {
    "Fantasía": "Fantasy",
    "Ciencia Ficción": "Fiction",
    "Romance": "Romance",
    "Terror": "Horror",
    "Historia": "History",
    "Misterio": "Mystery",
    "Aventura": "Adventure",
  };
  const genresEnglish = form.genres.map((g) => spanishToEnglish[g] || g);
  localStorage.setItem("userGenres", JSON.stringify(genresEnglish));

  navigate("/home");
}


        console.log("Usuario registrado con éxito:", data);
        navigate("/home"); 
      } else {
        setErrorMessage(data.error || "Error en el registro. Inténtalo de nuevo.");
        console.error("Error en el registro:", data.error);
      }
    } catch (error) {
      setErrorMessage("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      console.error("Error de red o servidor:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url(/2.jpg)] justify-center items-center text-[#D1E3F7]">

      <div className="max-w-md font-normal bg-[#0008106f] backdrop-blur-md mt-10 mb-10 py-10 px-10 rounded-3xl">
        <h1 className="text-3xl font-normal text-[#E0F1FA] mb-8">Registrate</h1>
        <div className="grid grid-cols-2 items-center justify-center mb-6">
          
          {/* seccion 1 */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-none">
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 bg-[#687f8b65] rounded-md focus:outline-none focus:ring-2 focus:ring-[#527599] transition duration-200"
          required
        />
        <input
          type="date"
          value={form.birthdate}
          onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
          className="w-full px-4 py-3 bg-[#687f8b65] rounded-md focus:outline-none focus:ring-2 focus:ring-[#527599] transition duration-200 text-gray-300"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 bg-[#687f8b65] rounded-md focus:outline-none focus:ring-2 focus:ring-[#527599] transition duration-200"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 bg-[#687f8b65] rounded-md focus:outline-none focus:ring-2 focus:ring-[#527599] transition duration-200"
          required
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full px-4 py-3 bg-[#687f8b65] rounded-md focus:outline-none focus:ring-2 focus:ring-[#527599] transition duration-200"
          required
        />

          {/* Seccion 2 */}

        <div>
          <label className="block mb-3 text-lg ">Géneros favoritos:</label>
          <div className="grid grid-cols-2 gap-3">
            {genresList.map((genre) => (
              <label key={genre} className="flex items-center space-x-2 bg-none p-3 rounded-md cursor-pointer hover:bg-[#346782] transition duration-200">
                <input
                  type="checkbox"
                  checked={form.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="accent-[#00354E] w-5 h-5"
                />
                <span className="text-base">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md text-lg font-semibold hover:bg-[#4E6470] transition-colors bg-[#E0F1FA] shadow-lg"
        >
          Registrarme
        </button>
      </form>
      <p className="mt-6 text-base text-gray-400">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-[#346782] hover:text-[#50829F] underline font-medium transition duration-200"
        >
          Inicia sesión aquí
        </button>
      </p>
      </div>
        </div>
        

        
      
      
    </div>
  );
}

