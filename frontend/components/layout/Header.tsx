export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          PropertyElist
        </h1>

        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#">Home</a>
          <a href="#">Buy</a>
          <a href="#">Rent</a>
          <a href="#">Projects</a>
          <a href="#">Builders</a>
          <a href="#">Contact</a>
        </nav>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Login
        </button>

      </div>
    </header>
  );
}