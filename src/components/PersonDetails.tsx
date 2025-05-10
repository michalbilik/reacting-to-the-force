import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePersonData } from "../hooks/usePersonData";
import Loading from "./Loading";

const PersonDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const person = state?.person;
  const {
    homeworldData,
    films,
    vehicles,
    starships,
    isLoadingHomeworld,
    isLoadingFilms,
    isLoadingVehicles,
    isLoadingStarships,
  } = usePersonData(person);

  const handleBackToSearch = () => {
    navigate("/");
  };

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="bg-black opacity-90 shadow-lg rounded-lg overflow-hidden w-full mx-auto mb-4 min-h-[450px]">
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:p-8 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
            {person.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-gray-400">
              <span className="text-yellow-400">Birth Year:</span> {person.birth_year}
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Height:</span> {person.height}cm
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Mass:</span> {person.mass}kg
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Hair Color:</span> {person.hair_color}
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Skin Color:</span> {person.skin_color}
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Eye Color:</span> {person.eye_color}
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Gender:</span> {person.gender}
            </div>
          </div>

          <div className="text-gray-400 mb-4">
            <span className="text-yellow-400">Homeworld:</span>{" "}
            {isLoadingHomeworld ? (
              <Loading />
            ) : (
              homeworldData?.name || "Unknown"
            )}
          </div>

          <div className="text-gray-400 mb-4">
            <p className="mb-2 text-yellow-400">Films:</p>
            {isLoadingFilms ? (
              <Loading />
            ) : films.length > 0 ? (
              <ul className="list-disc list-inside">
                {films.map((film: string, index: number) => (
                  <li key={index} className="text-gray-400">
                    {film}
                  </li>
                ))}
              </ul>
            ) : (
              "No films found"
            )}
          </div>

          {person.vehicles.length > 0 && (
            <div className="text-gray-400 mb-4">
              <p className="mb-2 text-yellow-400">Vehicles:</p>
              {isLoadingVehicles ? (
                <Loading />
              ) : vehicles.length > 0 ? (
                <ul className="list-disc list-inside">
                  {vehicles.map((vehicle: string, index: number) => (
                    <li key={index} className="text-gray-400">
                      {vehicle}
                    </li>
                  ))}
                </ul>
              ) : (
                "No vehicles found"
              )}
            </div>
          )}

          {person.starships.length > 0 && (
            <div className="text-gray-400 mb-4">
              <p className="mb-2 text-yellow-400">Starships:</p>
              {isLoadingStarships ? (
                <Loading />
              ) : starships.length > 0 ? (
                <ul className="list-disc list-inside">
                  {starships.map((starship: string, index: number) => (
                    <li key={index} className="text-gray-400">
                      {starship}
                    </li>
                  ))}
                </ul>
              ) : (
                "No starships found"
              )}
            </div>
          )}

          <button
            onClick={handleBackToSearch}
            className="bg-black opacity-90 text-cyan-500 p-2 rounded border border-transparent hover:border-yellow-500"
          >
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
