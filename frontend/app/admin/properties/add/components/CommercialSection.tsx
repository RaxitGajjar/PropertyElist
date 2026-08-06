"use client";

import { useState } from "react";
import AreaInput from "./AreaTemp";

interface Props {
  propertyType: string;
}

export default function CommercialSection({
  propertyType,
}: Props) {
  const [totalFloors, setTotalFloors] = useState(1);

  return (
    <>

      {/* Shop */}

      {propertyType === "Shop" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AreaInput label="Carpet Area" />

          <AreaInput label="Super Built-up Area" />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Bathrooms
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>7+</option>
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

      {/* Showroom */}

      {propertyType === "Showroom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AreaInput label="Carpet Area" />

          <AreaInput label="Super Built-up Area" />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Bathrooms
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>7+</option>
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Total Floors
            </label>

            <select
              className="w-full border rounded-xl p-4"
              value={totalFloors}
              onChange={(e) =>
                setTotalFloors(Number(e.target.value))
              }
            >
              {Array.from({ length: 42 }, (_, i) => (
                <option key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Property Floor
            </label>

            <select className="w-full border rounded-xl p-4">

              <option>Ground Floor</option>

              {Array.from(
                { length: totalFloors },
                (_, i) => (
                  <option key={i + 1}>
                    {i + 1}
                  </option>
                )
              )}

            </select>
          </div>

        </div>
      )}

            {/* Commercial Office */}

      {propertyType === "Commercial Office" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AreaInput label="Carpet Area" />

          <AreaInput label="Super Built-up Area" />

          <div>
            <label className="block text-sm font-semibold mb-2">
              Bathrooms
            </label>

            <select className="w-full border rounded-xl p-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>7+</option>
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Total Floors
            </label>

            <select
              value={totalFloors}
              onChange={(e) => setTotalFloors(Number(e.target.value))}
              className="w-full border rounded-xl p-4"
            >
              {Array.from({ length: 42 }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Property Floor
            </label>

            <select className="w-full border rounded-xl p-4">

              <option>Ground Floor</option>

              {Array.from({ length: totalFloors }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}

            </select>
          </div>

        </div>
      )}

    </>
  );
}