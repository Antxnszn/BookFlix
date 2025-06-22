import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
// import Register from "./routes/Register";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import Recommendations from "./routes/Recommendations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />

          <Route path="recommendations" element={<Recommendations />} />

          {/* <Route path="*" element={<h1>404</h1>} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}