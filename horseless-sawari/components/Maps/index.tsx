import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

const icon = L.icon({
  iconUrl: './placeholder.png',
  iconSize: [38, 38],
});

let position = [27.7172, 85.324];

function ResetCenterView(selectPostion: any) {
  const map = useMap();

  useEffect(() => {
    if (selectPostion) {
      map.setView(
        L.latLng(
          selectPostion?.selectPosition?.lat,
          selectPostion?.selectPosition?.lon
        ),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPostion]);

  return null;
}

const Maps = ({ selectPostion }) => {
  const locationSelected = [selectPostion?.lat, selectPostion?.lon];
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
        {selectPostion && (
          <>
            <Marker position={locationSelected} icon={icon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <ResetCenterView selectPosition={selectPostion} />
          </>
        )}
      </MapContainer>
    </>
  );
};

export default Maps;
