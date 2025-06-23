import { Link } from "react-router-dom";
import '../styles/style.css';

function NavBar() {
  return (
    <section>
      <div className="contenedor">
        <div>
          <h1 className="font-bold">Bookflix</h1>
        </div>
        <div>
          <nav className="nav">
            <Link to="/home">Home</Link>
            <Link to="/recommendations">Recommendations</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
