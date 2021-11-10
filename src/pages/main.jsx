import React, { useState } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Marker';
import Geocoder from '../components/UI/Geocoder';
import Header from '../components/UI/Header';
import ModalModify from '../components/UI/ModalModify';

// TODO: remove
const dummy = [{ lng: -86.89871737888747, lat: 40.41866254968954 }];

// TODO: template도입 고려
function Main() {
  const [map, setMap] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [record, setRecord] = useState(undefined);

  const login = (enteredId) => {
    const idList = process.env.ID_LIST.split(' ');
    const nicknameList = process.env.NICKNAME_LIST.split(' ');

    const idIndex = idList.findIndex((id) => id === enteredId);
    if (idIndex < 0) return false;
    setUser(nicknameList[idIndex]);

    return true;
  };

  const clickPlaceMarker = ({ address, lng, lat }) => {
    setRecord({ address, lng, lat });
  };

  const closeModalModify = () => {
    setRecord(undefined);
  };

  const submitRecord = () => {
    setRecord(undefined);
  };

  return (
    <>
      {record && <ModalModify record={record} closeModal={closeModalModify} submitRecord={submitRecord} />}
      <Header user={user} login={login} />
      <Map getMap={setMap}>
        <Geocoder map={map} clickPlaceMarker={clickPlaceMarker} />
        <Marker map={map} markers={dummy} />
      </Map>
    </>
  );
}

export default Main;