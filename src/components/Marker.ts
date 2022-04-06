import { LngLatLike } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

export const getMarker = (coordinates: LngLatLike) => {
  const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  return new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
    .setHTML(
      `<input type="color" id="head" name="head"
           value="#${generateRandomColor()}">`
    )
    .setLngLat(coordinates)
    ;
};
