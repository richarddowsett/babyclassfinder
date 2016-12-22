import React from 'react';
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';


export const MyPopupMarker = (clazz) => {
  console.log("Adding marker for class: " + clazz.activity)
 return <Marker position={[clazz.location.lat, clazz.location.lng]}>
   <Popup>
     <div>
       <h3>{clazz.activity}</h3>
     <Accordion>
       <Panel eventKey="description" header="Description">one</Panel>
       <Panel eventKey="schedule" header="Schedule">Two</Panel>
       </Accordion>
     </div>
   </Popup>
 </Marker>
};

export const MyMarkersList = ({ map, markers }) => {
  var count = 0
 const items = markers.map((props) => {
count = count + 1
     return <MyPopupMarker key={count} {...props} />

 });
 return <div style={{display: 'none'}}>{items}</div>;
};
