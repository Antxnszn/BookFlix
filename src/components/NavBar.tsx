import '../styles/style.css';


function NavBar () {
    return (
    
    <section>
    <div className="contenedor">
      <div>
        <h1 className='font-bold'>Bookflix</h1>
      </div>
      <div>
        <nav className="nav">
          <a href="index.html">Home</a>
          <a href="features.html">Features</a>
          <a href="login.html">About</a>
          <a href="signup.html">Contact</a>
        </nav>
      </div>
    </div>
  </section>
);

}
export default NavBar;