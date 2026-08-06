"use client";

import AreaInput from "./AreaTemp";

interface Props {
  propertyType: string;
}

export default function IndustrialSection({
  propertyType,
}: Props) {

  return (
    <>

      {/* Warehouse */}

      {propertyType === "Warehouse" && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AreaInput label="Plot Area" />

          <AreaInput label="Construction Area" />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Shed Height (Feet)
            </label>

            <input
              type="number"
              placeholder="Ex. 25"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Washroom
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>5+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Store Room
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Parking
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>4+</option>
            </select>
          </div>

        </div>

      )}       {/* Industrial Shed */}

      {propertyType === "Industrial Shed" && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AreaInput label="Plot Area" />

          <AreaInput label="Construction Area" />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Shed Height (Feet)
            </label>

            <input
              type="number"
              placeholder="Ex. 30"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Washroom
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>5+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Store Room
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Parking
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>4+</option>
            </select>
          </div>

        </div>

      )}

    </>
  );
}