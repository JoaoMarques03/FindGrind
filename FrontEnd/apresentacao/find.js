let map;

function initMap() {
  const mapCenter = { lat: 38.722440237883724, lng: -9.14647389958958 };
  const zoomLevel = 12;

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoomLevel,
    center: mapCenter,
  });

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(userLocation);
        const userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your location",
        });
      },
      (error) => {
        console.log("Error: The Geolocation service failed.", error);
      }
    );
  } else {
    console.log("Error: Your browser doesn't support geolocation.");
  }
  
  const locations = [
    { lat: 38.744401169766995, lng: -9.12210042750371, title: "Parque da Bela Vista", info: "teste" },
    { lat: 38.746791163972496, lng: -9.112037594600956, title: "Marvila", info: "teste" },
    { lat: 38.72120570174017, lng: -9.139257400380155, title: "Graça Calisthenics Park", info: "teste" },
    { lat: 38.73012518221117, lng: -9.158396082622005, title: "Parque Eduardo VII", info: "teste" },
    { lat: 38.73558194107584, lng: -9.160733114780443, title: "Parque do Corredor Verde", info: "teste" },
    { lat: 38.762767458976384, lng: -9.183379415464149, title: "Parque do Largo da Luz", info: "teste" },
  ];

  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.title,
    });

    const infowindow = new google.maps.InfoWindow({
      content: location.info,
    });

    marker.addListener("click", function () {
      map.setZoom(17);
      map.setCenter(marker.getPosition());
      infowindow.open(map, marker);
    });
  });

  const zoom1Button = document.getElementById("zoom1");
  const zoom2Button = document.getElementById("zoom2");
  const zoom3Button = document.getElementById("zoom3");
  const zoom4Button = document.getElementById("zoom4");
  const zoom5Button = document.getElementById("zoom5");
  const zoom6Button = document.getElementById("zoom6");

  zoom1Button.addEventListener("click", function () {
    zoomToLocation(0);
  });

  zoom2Button.addEventListener("click", function () {
    zoomToLocation(1);
  });

  zoom3Button.addEventListener("click", function () {
    zoomToLocation(2);
  });

  zoom4Button.addEventListener("click", function () {
    zoomToLocation(3);
  });

  zoom5Button.addEventListener("click", function () {
    zoomToLocation(4);
  });

  zoom6Button.addEventListener("click", function () {
    zoomToLocation(5);
  });

  function zoomToLocation(index) {
    if (index < locations.length) {
      const location = locations[index];
      map.setZoom(17);
      map.setCenter({ lat: location.lat, lng: location.lng });
    }
  }

  console.log(map);
  createPolygon(); // Call the createPolygon function to display the polygon
}

function createPolygon() {
  console.log('createPolygon called');
  const polygonCoords = [
    { lat: 38.744401169766995, lng: -9.12210042750371 },
    { lat: 38.746791163972496, lng: -9.112037594600956 },
    { lat: 38.72120570174017, lng: -9.139257400380155 },
    { lat: 38.73012518221117, lng: -9.158396082622005 },
    { lat: 38.73558194107584, lng: -9.160733114780443 },
    { lat: 38.762767458976384, lng: -9.183379415464149 },
    { lat: 38.744401169766995, lng: -9.12210042750371 } // Repeat the first point to close the loop
  ];
  
  const polygon = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: '#00FF00', 
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });

  polygon.setMap(map);
}

window.addEventListener('load', initMap);