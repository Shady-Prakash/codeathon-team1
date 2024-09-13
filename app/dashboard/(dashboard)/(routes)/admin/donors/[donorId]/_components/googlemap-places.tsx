"use client"
import { useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

export const GooglemapPlaces = () => {
  const libraries = ["places"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  const [input, setInput] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: "gb" },
      fields: ["address_components", "geometry"],
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

    // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [isLoaded, loadError]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handlePlaceChanged = async(address) => {
    if (!isLoaded) return;
    const place = address.getPlace()

    if (!place || !place.geometry) {
      setInput({});
      return;
    }
    formData(place);
  };

  const formData = (data) => {
    console.log(data)
    const addressComponents = data?.address_components;

    const componentMap = {
      subPremise: "",
      premise: "",
      street_number: "",
      route: "",
      country: "",
      postal_code: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
    };

    for (const component of addressComponents) {
      const componentType = component.types[0];
      if (componentMap.hasOwnProperty(componentType)) {
        componentMap[componentType] = component.long_name;
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    }));
  };

  return(
    isLoaded && (
      <div className="p-4 grid grid-cols-2 gap-5">
        <div className="flex flex-col w-full">
          <label className="text-md mb-2">Street address</label>
          <Input
            type="text"
            name="streetAddress"
            ref={inputRef}
            onChange={handleChange}
            className="text-sm mt-2"
            placeholder="Enter Street Address"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-md mb-2">City</label>
          <input
            type="text"
            name="city"
            value={input.city || ""}
            onChange={handleChange}
            className="text-sm mt-2"
            placeholder="City"
            required
            disabled
            aria-disabled
          />
        </div>


        <div className="flex flex-col w-full">
          <label className="text-md mb-2">State</label>
          <input
            type="text"
            name="state"
            value={input.state || ""}
            onChange={handleChange}
            className="text-sm mt-2"
            placeholder="State"
            required
            disabled
            aria-disabled
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-md mb-3">Country</label>
          <input
            type="text"
            name="country"
            value={input.country || ""}
            onChange={handleChange}
           className="text-sm mt-2"
            placeholder="Country"
            disabled
            aria-disabled
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-md mb-2">Postal Code</label>
          <input
            type="text"
            name="zipCode"
            value={input.zipCode || ""}
            onChange={handleChange}
            className="text-sm mt-2"
            placeholder="Postal Code"
            disabled
            aria-disabled
          />
        </div>
      </div>
    )
    )
}