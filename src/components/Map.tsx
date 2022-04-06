import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { getMarker } from "./Marker";
import { FitBounds } from "react-mapbox-gl/lib/map";

const GERMANY_BOUNDS: FitBounds = [
  [3, 40],
  [16, 56],
];
const CITIES = ["Berlin", "Brussels", "Paris"];

const TOKEN = "Your access token!"

export const MapComponent = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const map = new Map({
      container: mapDiv.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      bounds: GERMANY_BOUNDS,
      zoom: 4.9,
      accessToken: TOKEN,
    });
    setMap(map);
  }, [mapDiv]);

  useEffect(() => {
    if (map) {
      CITIES.forEach((city) => {
        fetch(`https://restcountries.com/v3/capital/${city}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            const cityCoordinates = res[0].latlng;
            const cityMarker = getMarker([
              cityCoordinates[1],
              cityCoordinates[0],
            ]);
            cityMarker.addTo(map);
          });
      });
    }
  }, [map]);

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
