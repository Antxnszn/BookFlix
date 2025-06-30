import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
  console.log("Login exitoso:", data);
  localStorage.setItem("token", data.token);
  console.log("Genres recibidos:", data.genres);
  localStorage.setItem("genres", JSON.stringify(data.genres));
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

  const genresEnglish = data.genres.map((g: string) => spanishToEnglish[g] || g);
  localStorage.setItem("userGenres", JSON.stringify(genresEnglish));

  navigate("/home");
    } else {
      alert(data.error || "Error al iniciar sesión");
    }
  } catch (error) {
  console.error("Error al iniciar sesión:", error);
  alert("Ocurrió un error en el servidor: " + (error instanceof Error ? error.message : "Desconocido"));
}

};


  return (
    <div className="min-h-screen flex flex-col bg-[url(/2.jpg)] justify-center items-center text-[#04070B] gap-10">
      <div className="bg-[#00253d2e] backdrop-blur-xl py-[75px] px-[50px] shadow-2xl shadow-[#344E68] rounded-3xl">
      <h1 className="text-4xl font-normal mb-10">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="font-medium space-y-10 w-80">
        <input
          type="email"
          placeholder="Correo"
          className="w-full px-4 py-2 font-medium rounded-4xl bg-none ring-[0.25px]"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 rounded-4xl ring-[0.25px]"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-2 rounded-4xl hover:bg-[#4E6470] transition-colors duration-300 animate-bounce bg-[#E0F1FA] text-[#04070B] font-semibold">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-sm">
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-[#283F58] hover:text-[#687F8B] font-semibold underline"
        >
          Regístrate
        </button>
      </p>
      </div>
      
    </div>
  );
}
