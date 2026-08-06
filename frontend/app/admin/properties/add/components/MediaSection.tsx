"use client";

export default function MediaSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        🖼 Images & Media
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Gallery Images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Floor Plan */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Floor Plan
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Master Plan */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Master Plan
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Brochure */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Brochure PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Video
          </label>

          <input
            type="file"
            accept="video/*"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* YouTube */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            YouTube Video URL
          </label>

          <input
            type="url"
            placeholder="https://youtube.com/..."
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* 360 Tour */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            360° Virtual Tour URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            className="w-full border rounded-xl p-4"
          />
        </div>

      </div>

    </div>
  );
}