"use client";

const amenities = {
  "Leisure": [
    "Swimming Pool",
    "Club House",
    "Gym",
    "Indoor Games",
    "Outdoor Games",
    "Children Play Area",
    "Jogging Track",
    "Senior Citizen Sitout",
    "Party Lawn",
  ],

  "Parking & Security": [
    "CCTV",
    "24x7 Security",
    "Visitor Parking",
    "Fire Safety",
    "Intercom",
    "Boom Barrier",
  ],

  "Building": [
    "Lift",
    "Power Backup",
    "Solar System",
    "EV Charging",
    "Rain Water Harvesting",
  ],

  "Lifestyle": [
    "Garden",
    "Temple",
    "Library",
    "Banquet Hall",
    "Conference Room",
    "Business Lounge",
    "Yoga Deck",
    "Sky Lounge",
    "Gazebo",
    "Amphitheatre",
    "Cafeteria",
    "WiFi",
  ],
};

export default function AmenitiesSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        ⭐ Amenities
      </h2>

      {Object.entries(amenities).map(([category, list]) => (

        <div key={category} className="mb-10">

          <h3 className="text-lg font-bold mb-5 text-blue-700">
            {category}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {list.map((item) => (

              <label
                key={item}
                className="flex items-center gap-3 border rounded-xl p-3 hover:bg-blue-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />

                {item}

              </label>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
}