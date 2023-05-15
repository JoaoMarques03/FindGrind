function initMap() {
    var mapOptions = {
        zoom: 12 // Specify the initial zoom level
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
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

                        calculateAndDisplayRoute(userLocation, location);
                    });
                });

                // Define polygon coordinates
                const polygonCoordinates = [
                    { lat: 38.744401169766995, lng: -9.12210042750371 },
                    { lat: 38.746791163972496, lng: -9.112037594600956 },
                    { lat: 38.72120570174017, lng: -9.139257400380155 },
                    { lat: 38.73012518221117, lng: -9.158396082622005 },
                    { lat: 38.73558194107584, lng: -9.160733114780443 },
                    { lat: 38.762767458976384, lng: -9.183379415464149 },
                    { lat: 38.744401169766995, lng: -9.12210042750371 } // Repeat first coordinate to close the polygon
                ];

                // Create a polygon and set its path
                const polygon = new google.maps.Polygon({
                    paths: polygonCoordinates,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                });
                polygon.setMap(map);

                // Helper function to calculate and display the route
                function calculateAndDisplayRoute(origin, destination) {
                    directionsService.route(
                        {
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.DRIVING
                        },
                        (response, status) => {
                            if (status === "OK") {
                                directionsRenderer.setDirections(response);
                            } else {
                                console.log("Error: Directions request failed due to " + status);
                            }
                        }
                    );
                }
            },
            (error) => {
                console.log("Error: The Geolocation service failed.", error);
            }
        );
    } else {
        console.log("Error: Your browser doesn't support geolocation.");
    }
}
