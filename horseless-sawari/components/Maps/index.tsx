// @ts-nocheck
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const icon = L.icon({
  iconUrl: './placeholder.png',
  iconSize: [38, 38],
});

let position = [27.7172, 85.324];
function ResetCenterView({ pickUpPosition, selectPosition }) {
  console.log(pickUpPosition, '1');
  console.log(selectPosition, '2');
  const map = useMap();

  useEffect(() => {
    if (pickUpPosition) {
      map.setView(
        L.latLng(selectPosition.lat, selectPosition.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
      L.Routing.control({
        waypoints: [
          L.latLng(pickUpPosition.lat, pickUpPosition.lon),
          L.latLng(selectPosition.lat, selectPosition.lon),
        ],
      }).addTo(map);
    }
  }, [pickUpPosition, selectPosition]);

  return null;
}

const Maps = ({ pickUpPosition, selectPosition }) => {
  const locationSelected = [selectPosition?.lat, selectPosition?.lon];
  return (
    <>
      <MapContainer
        center={position}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {selectPosition && (
          <>
            <Marker position={locationSelected} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <ResetCenterView
              pickUpPosition={pickUpPosition}
              selectPosition={selectPosition}
            />
          </>
        )}
      </MapContainer>
    </>
  );
};

export default Maps;
