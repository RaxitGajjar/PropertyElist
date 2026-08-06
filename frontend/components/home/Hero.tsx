export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Property
        </h1>

        <p className="text-xl mb-10">
          Buy • Sell • Rent • New Projects
        </p>

        <div className="bg-white rounded-xl p-5 max-w-5xl mx-auto shadow-lg">

          <div className="grid md:grid-cols-5 gap-4">

            <select className="border rounded-lg p-3">
              <option>Buy</option>
              <option>Rent</option>
              <option>Commercial</option>
            </select>

            <input
              className="border rounded-lg p-3"
              placeholder="City"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Location"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Budget"
            />

            <button className="bg-blue-600 text-white rounded-lg">
              Search
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}