import React from 'react'
import * as L from 'leaflet'
import { useEffect,useState } from 'react';
import axios from "axios";
// import './leaflet.css'

const LiveLocation = () => {
	const [input, setInput] = useState({busname: "",});
	const [mapInfo , setMapInfo] = useState({
		loc:"",
		map:"",
		busIcon: "",


	})
	let marker, init="";
	let l=false;
	useEffect(() => {
		let loc = document.getElementById("loc"),l,marker;
        let map = L.map('map').setView([19.0760, 72.8777], 10);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);
        let busIcon = L.icon({
    	iconUrl: 'https://i.ibb.co/wLQ7m9D/buspin.png',
    	iconSize: [38, 95],
    	iconAnchor: [22, 94],
    	popupAnchor: [-3, -60],
	})
	setMapInfo({
		loc:loc,
		map:map,
		busIcon:busIcon,
	})
},[]);

setInterval(async()=>{
  const response = await axios.post("/api/locationRoute/getlocation", {});
  const res=response.data;
  console.log(res)
  if(res!=init){
    init=res
    if(res.running=="start"){
      loop(res.busname)
    }
    else{
      stop()
    }
  }
},5000)

function loop(name) {
  try{
    if(!l){
      marker = L.marker([0, 0], {icon: mapInfo.busIcon}).addTo(mapInfo.map)
      let popup = marker.bindPopup(`<b>${name}</b>`);
      l = setInterval(() => {
          navigator.geolocation.getCurrentPosition((pos) => {
            // mapInfo.loc.innerHTML = "Latitude: " + pos.coords.latitude + "<br>Longitude: " + pos.coords.longitude;
            mapInfo.map.setView([pos.coords.latitude, pos.coords.longitude], 15);
            marker.setLatLng([pos.coords.latitude, pos.coords.longitude]).update();
            popup.openPopup();
          });
      }, 5000)
  }
}
	catch(e){
    console.log(e);
  }
}
    
        function stop() {
          try{
            mapInfo.map.removeLayer(marker)
            mapInfo.map.setView([19.0760, 72.8777], 10);
            // mapInfo.loc.innerHTML = "STOPPED";
            
            clearInterval(l);
          }
           catch(e){
            console.log(e)
           }
        }
	
	return (
    <div>
	<div id="loc"></div>
	<div id="map" style={{width: "100%", height: 400}}></div>



    </div>
  )
}

export default LiveLocation

// import React from 'react'
// import * as L from 'leaflet'
// import { useEffect, useState } from 'react';
// import axios from "axios";

// const LiveLocation = () => {
//   const [mapInfo, setMapInfo] = useState({
//     loc: "",
//     map: "",
//     busIcon: "",
//   })
//   const [updateInfo,setUpdateInfo] = useState({
// 	marker:"",
// 	popup: "",
// 	init: true,
//   })
 
//   useEffect(() => {
//     let loc = document.getElementById("loc");
//     let map = L.map('map').setView([19.0760, 72.8777], 10);
//     L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18
//     }).addTo(map);
//     let busIcon = L.icon({
//       iconUrl: 'https://i.ibb.co/wLQ7m9D/buspin.png',
//       iconSize: [38, 95],
//       iconAnchor: [22, 94],
//       popupAnchor: [-3, -60],
//     })
//     setMapInfo({
//       loc: loc,
//       map: map,
//       busIcon: busIcon,
//     })
// 	let marker = L.marker([0, 0], { icon: busIcon }).addTo(map);
//     let popup = marker.bindPopup(``);
// 	setInterval(update,5000,map,busIcon,marker,popup);
//   }, []);

//   let update = async (map, busIcon,marker,popup) => {
//     const response = await axios.post("/api/locationRoute/getlocation", {});
//     let res = response.data;
//     // if (res.running === "start" ) {
       
// 	// //   setUpdateInfo({
// 	// // 	marker: marker,
// 	// // 	popup: popup,
// 	// // 	init:false

// 	// //   })
//     // }
//     if (res.running === "stop") {
//       map.removeLayer(marker)
// 	  setUpdateInfo({
// 		init:true

// 	  })
//     //   mapInfo.loc.innerHTML = "STOPPED";
//     }
//     else {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         // mapInfo.loc.innerHTML = "Latitude: " + pos.coords.latitude + "<br>Longitude: " + pos.coords.longitude;
//         map.setView([pos.coords.latitude, pos.coords.longitude], 15);
//         marker.setLatLng([pos.coords.latitude, pos.coords.longitude]).update();
// 		marker._popup.setContent(`<b>${res.busname}</b>`)
//         popup.openPopup();
//       });
//     }
//   }

//   return (
//     <div>
//       <div id="loc"></div>
//       <div id="map" style={{ width: "100%", height: 400 }}></div>
//     </div>
//   )
// }

// export default LiveLocation