import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría tu lógica de autenticación con Flask
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-2xl mb-6">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="email"
          placeholder="Correo"
          className="w-full px-4 py-2 rounded bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 rounded bg-gray-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-500">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-sm">
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-purple-400 underline"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
}
