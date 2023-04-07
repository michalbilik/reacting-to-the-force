// src/components/PersonDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPersonDetailsQuery } from "../api/starWarsApi";

const PersonDetails: React.FC = () => {
  const { name } = useParams();
  const { data: personDetails, isLoading } = useGetPersonDetailsQuery(name);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!personDetails) {
    return <div>No person selected</div>;
  }

  return (
    <div>
      <h2>{personDetails.name}</h2>
      <p>Birth year: {personDetails.birth_year}</p>
      <p>Homeworld: {personDetails.homeworldName ?? "Unknown"}</p>
      <p>
        {" "}
        Movies:{" "}
        {personDetails.filmTitles.length > 0
          ? personDetails.filmTitles.join(", ")
          : "Unknown"}
      </p>
      <p>
        Starships:{" "}
        {personDetails.starshipNames.length > 0
          ? personDetails.starshipNames.join(", ")
          : "Unknown"}
      </p>
      <p>
        Vehicles:{" "}
        {personDetails.vehicleNames.length > 0
          ? personDetails.vehicleNames.join(", ")
          : "Unknown"}
      </p>

      <button
        onClick={goBack}
        className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default PersonDetails;
