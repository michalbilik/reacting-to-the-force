import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getIdFromUrl } from "../helpers/getIdFromUrl";
import { usePersonData } from "../hooks/usePersonData";
import Loading from "./Loading";

const PersonDetails = () => {
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const person = state.person;
  const { homeworldData, films, vehicles, starships } = usePersonData(person);
  const personId = getIdFromUrl(person.url, "people");
  const imageUrl = `https://starwarsapibucket.s3.eu-central-1.amazonaws.com/${personId}.jpg`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutExceeded(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleBackToSearch = () => {
    navigate("/");
  };

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="bg-black opacity-90 shadow-lg rounded-lg overflow-hidden w-full mx-auto mb-4 min-h-[450px]">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 p-4">
          <img
            src={imageUrl}
            alt={person.name}
            className="h-[350px] md:h-full w-full md:w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
            {person.name}
          </h2>
          <p className="text-gray-400 mb-2">
            <span className="text-yellow-400">Birth year:</span>{" "}
            {person.birth_year}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="text-yellow-400">Height:</span> {person.height} cm
          </p>
          <p className="text-gray-400 mb-2">
            <span className="text-yellow-400">Mass:</span> {person.mass} kg
          </p>
          <div className="text-gray-400 mb-2">
            <span className="text-yellow-400">Homeworld:</span>{" "}
            {homeworldData?.name || (timeoutExceeded ? "Unknown" : <Loading />)}
          </div>
          <div className="text-gray-400 mb-2">
            <p className="mb-1 text-yellow-400">Movies:</p>
            {films.length ? (
              <ul className="list-disc list-inside">
                {films.map((film: string, index: number) => (
                  <li key={index} className="text-gray-400">
                    {film}
                  </li>
                ))}
              </ul>
            ) : timeoutExceeded ? (
              "Unknown"
            ) : (
              <Loading />
            )}
          </div>
          <div className="text-gray-400 mb-2">
            <span className="text-yellow-400">Vehicles:</span>{" "}
            {vehicles.length ? (
              vehicles.join(", ")
            ) : timeoutExceeded ? (
              "Unknown"
            ) : (
              <Loading />
            )}
          </div>
          <div className="text-gray-400 mb-2">
            <span className="text-yellow-400">Starships:</span>{" "}
            {starships.length ? (
              starships.join(", ")
            ) : timeoutExceeded ? (
              "Unknown"
            ) : (
              <Loading />
            )}
          </div>
          <button
            onClick={handleBackToSearch}
            className="bg-black opacity-90 text-cyan-500 p-2 rounded border border-transparent hover:border-yellow-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
