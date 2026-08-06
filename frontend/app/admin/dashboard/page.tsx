export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-white shadow p-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          PropertyElist Admin
        </h1>

        <a
          href="/admin/properties/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Property
        </a>

      </div>

      <div className="p-10">

        <h2 className="text-2xl font-semibold mb-6">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-bold">Total Properties</h3>
            <p className="text-5xl mt-4 font-bold text-blue-600">1</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-bold">Featured</h3>
            <p className="text-5xl mt-4 font-bold text-green-600">1</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-bold">Cities</h3>
            <p className="text-5xl mt-4 font-bold text-red-600">1</p>
          </div>

        </div>

      </div>

    </div>
  );
}