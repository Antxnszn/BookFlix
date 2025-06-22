import '../styles/style.css';


function NavBar () {
    return (
    
    <section className="bg-white/30 backdrop-blur-3xl border border-white/30 rounded-lg shadow-lg">
  <div className="contenedor flex justify-between items-center p-4">
    <h1 className="text-[#2B421B] font-bold text-xl">Bookflix</h1>
    <nav className="nav space-x-6">
      <a href="index.html" className="text-white hover:underline">Home</a>
      <a href="features.html" className="text-white hover:underline">Features</a>
      <a href="login.html" className="text-white hover:underline">About</a>
      <a href="signup.html" className="text-white hover:underline">Contact</a>
    </nav>
  </div>
</section>

);

}
export default NavBar;