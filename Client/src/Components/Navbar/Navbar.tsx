
const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-8 bg-black	text-white">
      <div className="logo flex justify-center items-center"><i className="fa-brands fa-slack text-3xl me-2"></i> Logo</div>
      <div className="person flex ">
        <div className="me-8"><i className="fa-solid fa-bell text-3xl"></i></div>
        <div className="flex justify-center items-center"><i className="fa-solid fa-user me-3 text-3xl"></i>adam ibraheem</div>
      </div>
    </nav>
  )
}

export default Navbar
