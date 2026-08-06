"use client";

import { useState } from "react";

export default function StatusSection() {
  const [status, setStatus] = useState("New Launch");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        🚩 Project Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Project Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-4"
          >
            <option>New Launch</option>
            <option>Under Construction</option>
            <option>Ready to Move</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>

        {/* Featured Property */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Featured Property
          </label>

          <select className="w-full border rounded-xl p-4">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Property Visibility */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Property Visibility
          </label>

          <select className="w-full border rounded-xl p-4">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Launch Date */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Launch Date
          </label>

          <input
            type="date"
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Possession Date */}
        {status !== "Ready to Move" &&
          status !== "Completed" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Possession Date
              </label>

              <input
                type="date"
                className="w-full border rounded-xl p-4"
              />
            </div>
          )}

        {/* Completion Date */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Completion Date
          </label>

          <input
            type="date"
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Project Approval */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Approval
          </label>

          <select className="w-full border rounded-xl p-4">
            <option>Approved</option>
            <option>Applied</option>
            <option>Not Required</option>
          </select>
        </div>

        {/* Total Towers */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Total Towers
          </label>

          <input
            type="number"
            placeholder="Ex. 4"
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Total Units */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Total Units
          </label>

          <input
            type="number"
            placeholder="Ex. 240"
            className="w-full border rounded-xl p-4"
          />
        </div>

      </div>
    </div>
  );
}