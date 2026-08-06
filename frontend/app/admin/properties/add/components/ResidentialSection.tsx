"use client";

import { useState } from "react";
import AreaInput from "./AreaTemp";

interface Props {
  propertyType: string;
  formData: any;
  setFormData: any;
}

export default function ResidentialSection({
  propertyType,
  formData,
  setFormData,
}: Props) {
  const [totalFloors, setTotalFloors] = useState(1);

  return (
    <>
      {/* Apartment & Penthouse */}

      {["Apartment", "Penthouse"].includes(propertyType) && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{/* BHK */}

<div>
  <label className="block text-sm font-semibold mb-2">
    BHK
  </label>

  <select
    value={formData.bhk}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        bhk: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option value="">Select BHK</option>
    <option>1 BHK</option>
    <option>2 BHK</option>
    <option>3 BHK</option>
    <option>4 BHK</option>
    <option>5 BHK</option>
    <option>6 BHK</option>
    <option>7 BHK</option>
  </select>
</div>

{/* Bedrooms */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Bedrooms
  </label>

  <select
    value={formData.bedrooms}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        bedrooms: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ))}
  </select>
</div></div>

{/* Bathrooms */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Bathrooms
  </label>

  <select
    value={formData.bathrooms}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        bathrooms: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="7+">7+</option>
  </select>
</div>

{/* Balcony */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Balcony
  </label>

  <select
    value={formData.balcony}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        balcony: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</div>

{/* Store Room */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Store Room
  </label>

  <select
    value={formData.storeRoom}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        storeRoom: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option value="No">No</option>
    <option value="Yes">Yes</option>
  </select>
</div>

{/* Carpet Area */}

<AreaInput
  label="Carpet Area"
  value={formData.carpetArea}
  unit={formData.carpetAreaUnit}
  onValueChange={(value: any) =>
    setFormData((prev: any) => ({
      ...prev,
      carpetArea: value,
    }))
  }
  onUnitChange={(unit: any) =>
    setFormData((prev: any) => ({
      ...prev,
      carpetAreaUnit: unit,
    }))
  }
/>

{/* Built-up Area */}

<AreaInput
  label="Built-up Area"
  value={formData.builtupArea}
  unit={formData.builtupAreaUnit}
  onValueChange={(value: any) =>
    setFormData((prev: any) => ({
      ...prev,
      builtupArea: value,
    }))
  }
  onUnitChange={(unit: any) =>
    setFormData((prev: any) => ({
      ...prev,
      builtupAreaUnit: unit,
    }))
  }
/>

{/* Super Built-up Area */}

<AreaInput
  label="Super Built-up Area"
  value={formData.superBuiltupArea}
  unit={formData.superBuiltupAreaUnit}
  onValueChange={(value: any) =>
    setFormData((prev: any) => ({
      ...prev,
      superBuiltupArea: value,
    }))
  }
  onUnitChange={(unit: any) =>
    setFormData((prev: any) => ({
      ...prev,
      superBuiltupAreaUnit: unit,
    }))
  }
/>

{/* Facing */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Facing
  </label>

  <select
    value={formData.facing}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        facing: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option>East</option>
    <option>West</option>
    <option>North</option>
    <option>South</option>
    <option>North-East</option>
    <option>North-West</option>
    <option>South-East</option>
    <option>South-West</option>
  </select>
</div>

{/* Total Floors */}

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
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ))}
  </select>
</div>

{/* Property Floor */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Property Floor
  </label>

  <select
    value={formData.propertyFloor}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        propertyFloor: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option>Ground Floor</option>

    {Array.from({ length: totalFloors }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ))}
  </select>
</div>

{/* Parking */}

<div>
  <label className="block text-sm font-semibold mb-2">
    Parking
  </label>

  <select
    value={formData.parking}
    onChange={(e) =>
      setFormData((prev: any) => ({
        ...prev,
        parking: e.target.value,
      }))
    }
    className="w-full border rounded-xl p-4"
  >
    <option>0</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>4+</option>
  </select>
</div>

{/* Villa / Bungalow / Row House */}

{["Villa", "Bungalow", "Row House"].includes(propertyType) && (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* BHK */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        BHK
      </label>

      <select
        value={formData.bhk}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            bhk:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option value="">Select BHK</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>3 BHK</option>
        <option>4 BHK</option>
        <option>5 BHK</option>
        <option>6 BHK</option>
        <option>7 BHK</option>
      </select>
    </div>

    {/* Bedrooms */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Bedrooms
      </label>

      <select
        value={formData.bedrooms}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            bedrooms:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        {[1,2,3,4,5,6,7].map((i)=>(
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>

    {/* Bathrooms */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Bathrooms
      </label>

      <select
        value={formData.bathrooms}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            bathrooms:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
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

        {/* Balcony */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Balcony
      </label>

      <select
        value={formData.balcony}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            balcony:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>

    {/* Plot Area */}

    <AreaInput
      label="Plot Area"
      value={formData.plotArea}
      unit={formData.plotAreaUnit}
      onValueChange={(value:any)=>
        setFormData((prev:any)=>({
          ...prev,
          plotArea:value,
        }))
      }
      onUnitChange={(unit:any)=>
        setFormData((prev:any)=>({
          ...prev,
          plotAreaUnit:unit,
        }))
      }
    />

    {/* Construction Area */}

    <AreaInput
      label="Construction Area"
      value={formData.constructionArea}
      unit={formData.constructionAreaUnit}
      onValueChange={(value:any)=>
        setFormData((prev:any)=>({
          ...prev,
          constructionArea:value,
        }))
      }
      onUnitChange={(unit:any)=>
        setFormData((prev:any)=>({
          ...prev,
          constructionAreaUnit:unit,
        }))
      }
    />

    {/* Facing */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Facing
      </label>

      <select
        value={formData.facing}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            facing:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>East</option>
        <option>West</option>
        <option>North</option>
        <option>South</option>
        <option>North-East</option>
        <option>North-West</option>
        <option>South-East</option>
        <option>South-West</option>
      </select>
    </div>

    {/* Pooja Room */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Pooja Room
      </label>

      <select
        value={formData.poojaRoom}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            poojaRoom:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>No</option>
        <option>Yes</option>
      </select>
    </div>

        {/* Store Room */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Store Room
      </label>

      <select
        value={formData.storeRoom}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            storeRoom:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>No</option>
        <option>Yes</option>
      </select>
    </div>

    {/* Lift */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Lift
      </label>

      <select
        value={formData.lift}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            lift:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>No</option>
        <option>Yes</option>
      </select>
    </div>

    {/* Parking */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Parking
      </label>

      <select
        value={formData.parking}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            parking:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
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

{/* Plot */}

{propertyType === "Plot" && (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Plot Area */}

    <AreaInput
      label="Plot Area"
      value={formData.plotArea}
      unit={formData.plotAreaUnit}
      onValueChange={(value:any)=>
        setFormData((prev:any)=>({
          ...prev,
          plotArea:value,
        }))
      }
      onUnitChange={(unit:any)=>
        setFormData((prev:any)=>({
          ...prev,
          plotAreaUnit:unit,
        }))
      }
    />

    {/* Plot Type */}

    <div>
      <label className="block text-sm font-semibold mb-2">
        Plot Type
      </label>

      <select
        value={formData.plotType}
        onChange={(e)=>
          setFormData((prev:any)=>({
            ...prev,
            plotType:e.target.value,
          }))
        }
        className="w-full border rounded-xl p-4"
      >
        <option>Agriculture</option>
        <option>Non Agriculture (NA)</option>
      </select>
    </div>

  </div>

)}

    </>
  );
}