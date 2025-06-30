import { Link } from "react-router-dom";
import '../styles/style.css';

function NavBar() {
  return (
    
      <div className="bg-[#04070B] flex flex-row justify-between items-center p-4 px-[10em]">
        <div>
          <h1 className="font-bold text-2xl text-[#C2E8FEC9]">Bookflix</h1>
        </div>

          <nav className="flex  font-bold flex-row gap-4 text-[#E7EFF5]">

            <div className="hover:text-[#87BBDA]">
              <Link to="/home">Home</Link>
            </div>

            <div className="hover:text-[#87BBDA]">
              <Link to="/recommendations">Recommendations</Link>
            </div>
{/* 
            <div className="hover:text-[#87BBDA]">
              <Link to="/features">Features</Link>
            </div>

            <div className="hover:text-[#87BBDA]">
              <Link to="/about">About</Link>
            </div> */}

            <div className="hover:text-[#87BBDA]">
              <Link to="/">Cerrar sesión</Link>
            </div>

          </nav>
      </div>
  
  );
}

export default NavBar;
