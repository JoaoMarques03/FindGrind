function initMap() {
    var mapOptions = {
        zoom: 12
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
                    icon: {
                        url: "img/user.png",
                        scaledSize: new google.maps.Size(48, 48),
                    }
                });
  
                fetch('http://localhost:3000/api/locations')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(locations => {
                        locations.forEach((location) => {
                            const { latitude, longitude } = location;
  
                            if (isNaN(latitude) || isNaN(longitude)) {
                                throw new Error('Latitude or longitude is not a valid number');
                            }
  
                            const marker = new google.maps.Marker({
                                position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                                map: map,
                                title: location.location_name,
                                icon: {
                                    url: "img/destination.png",
                                    scaledSize: new google.maps.Size(48, 48),
                                },
                            });
  
                            const infowindow = new google.maps.InfoWindow({
                                content: location.info,
                            });
  
                            marker.addListener("click", function () {
                                map.setZoom(17);
                                map.setCenter(marker.getPosition());
                                infowindow.open(map, marker);
  
                                const origin = new google.maps.LatLng(userLocation.lat, userLocation.lng);
                                const destination = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                                calculateAndDisplayRoute(origin, destination);
                            });
                        });
                    })
                    .catch(error => {
                        console.log('Error:', error);
                    });
  
                fetch('http://localhost:3000/api/polygons')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(polygons => {
                        const polygonGroups = {};
  
                        polygons.forEach((polygon) => {
                            const polygonId = polygon.polygon_id;
  
                            if (!polygonGroups[polygonId]) {
                                polygonGroups[polygonId] = [];
                            }
  
                            const polygonCoordinates = {
                                lat: parseFloat(polygon.latitude),
                                lng: parseFloat(polygon.longitude)
                            };
  
                            polygonGroups[polygonId].push(polygonCoordinates);
                        });
                        
                        Object.values(polygonGroups).forEach((polygonCoordinates) => {
                            const polygonObj = new google.maps.Polygon({
                                paths: polygonCoordinates,
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35,
                            });
                            polygonObj.setMap(map);
                        });
                    })
                    .catch(error => {
                        console.log('Error:', error);
                    });
  
                function calculateAndDisplayRoute(origin, destination) {
                    directionsService.route(
                        {
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.WALKING
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
  