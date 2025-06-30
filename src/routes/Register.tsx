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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            Fantasía: "Fantasy",
            "Ciencia Ficción": "Fiction",
            Romance: "Romance",
            Terror: "Horror",
            Historia: "History",
            Misterio: "Mystery",
            Aventura: "Adventure",
          };
          const genresEnglish = form.genres.map(
            (g) => spanishToEnglish[g] || g
          );
          localStorage.setItem("userGenres", JSON.stringify(genresEnglish));

          navigate("/home");
        }

        console.log("Usuario registrado con éxito:", data);
        navigate("/home");
      } else {
        setErrorMessage(
          data.error || "Error en el registro. Inténtalo de nuevo."
        );
        console.error("Error en el registro:", data.error);
      }
    } catch (error) {
      setErrorMessage(
        "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde."
      );
      console.error("Error de red o servidor:", error);
    }
  };

return (
  <div className="min-h-screen flex flex-col bg-[url(/2.jpg)] justify-center items-center text-[#E0F1FA]">
    <div className="md:max-w-2xl max-w-md font-normal bg-[#0008106a] backdrop-blur-lg mt-10 mb-10 py-10 px-[5rem] shadow-2xl shadow-black rounded-4xl">
      <h1 className="text-4xl font-normal text-[#edf9ff] mb-10">Regístrate</h1>

      <form onSubmit={handleSubmit} className="space-y-6 grid md:grid-cols-2 gap-10 bg-none">
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

        {/* Sección 1 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#D1E3F7] text-[#E0F1FA] transition duration-200"
            required
          />
          <input
            type="date"
            value={form.birthdate}
            onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
            className="w-full px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#D1E3F7] transition duration-200 text-[#E0F1FA]"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#D1E3F7] transition duration-200"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#D1E3F7] transition duration-200"
            required
          />
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#D1E3F7] transition duration-200"
            required
          />
        </div>

        {/* Sección 2: Géneros */}
        <div>
          <label className="block mb-3 text-lg">Géneros favoritos:</label>
          <div className="grid grid-cols-2 gap-3">
            {genresList.map((genre) => (
              <label
                key={genre}
                className="flex items-center space-x-2 p-3 rounded-4xl cursor-pointer transition duration-200"
              >
                <input
                  type="checkbox"
                  checked={form.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="accent-[#00354E] "
                />
                <span className="text-base">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full py-3  rounded-4xl text-lg font-light bg-[#0008109b] hover:bg-[#12171D] transition-colors bg-none ring ring-[#04070B] shadow-lg"
        >
          Registrarme
        </button>
      </form>

      {/* Link para iniciar sesión */}
      <p className="mt-6 text-base text-[#E0F1FA]">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-[#D1E3F7] hover:text-[#93BBE5] underline transition duration-200"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  </div>
);
}
