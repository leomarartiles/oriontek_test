/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: gmaps init Js File
*/

var map;
const markerLabelStyle= { color: "#000",fontSize: "13px", className: 'gmap-marker-label'};
let setMarkers={ type: Object },unitIdFilter=1003841;
let map_location={lat:18.823063174423872, lng:-70.61831223984997};

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: map_location,
      mapTypeId: 'mystyle'
    });

    var myStyle=[
        {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
        {"elementType": "labels.text","stylers": [{"visibility": "on"}]}
    ];

    map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));
    // The marker, positioned at Uluru
    // const marker = new google.maps.Marker({
    //   position: uluru,
    //   map: map,
    // });
}
  
window.initMap = initMap;

// $(document).ready(function(){
    let updateUnitInformation=function(location){
        $('.unit_speed').text(location.speed+' km');
        $('.unit_address').text(location.geoaddr);
    }
    let _getIconMaker=function(location){
        let markerIcon = 'move-este.svg';
        if (location.vehicle_status == 0) {        // Vehicle without battery
            markerIcon = 'disconnected.svg';
        } else if (location.vehicle_status == 1) { // Vehicle off
            markerIcon = 'off.svg';
        } else if (location.vehicle_status == 2) {  // Vehicle without gps
            markerIcon = 'not-signal.svg';
        } else if (location.vehicle_status == 3) { // Vehicle stop
            markerIcon = 'stopIcon.svg';
        } else if (location.vehicle_status == 4) { // Vehicle moving
            switch (location.rumbo) {
                case 0:
                    markerIcon = 'move-norte.svg';
                    break;
                case 1:
                    markerIcon = 'move-noreste.svg';
                    break;
                case 2:
                    markerIcon = 'move-este.svg';
                    break;
                case 3:
                    markerIcon = 'move-sureste.svg';
                    break;
                case 4:
                    markerIcon = 'move-sur.svg';
                    break;
                case 5:
                    markerIcon = 'move-suroeste.svg';
                    break;
                case 6:
                    markerIcon = 'move-oeste.svg';
                    break;
                case 7:
                    markerIcon = 'move-noroeste.svg';
                    break;
            }
            
            // console.log(location.rumbo)
        } else if (location.vehicle_status == 8) {
            markerIcon = 'ralenti.svg';
        } else if (location.vehicle_status == 9) {
            markerIcon = 'desactualizado.svg';
        }
        // console.log('icon',markerIcon);
        return markerIcon;
    }
    let AddMarker=function(location){
        
        let markerIcon = _getIconMaker(location);//'move-este.svg';
        map_location={lat: location.position.lat, lng: location.position.lng};
        updateUnitInformation(location);
        setMarkers[Number(location.unit_id)] = new google.maps.Marker({
            position: {
                lat: location.position.lat,
                lng: location.position.lng,
            },
            map: map,
            animation: google.maps.Animation.Drop,
            title: location.unit_code,
            unit_id: location.unit_id,
            icon: {
                scale: 0.5,
                anchor: new google.maps.Point(17, 17),
                url: `public/assets/images/icons/${markerIcon}`,
            },
            optimized: true,
            label: {
                text: location.unit_code,
                color: markerLabelStyle.color,
                fontSize: markerLabelStyle.fontSize,
                fontWeight: markerLabelStyle.fontWeight,
                className: markerLabelStyle.className
            },
        });
        map.setCenter(map_location);
    }
    let updLocationMarkers= function (newVal) {
        let mark = setMarkers[Number(newVal.unit_id)];
        
        updateUnitInformation(newVal);
        if (mark) {
            let updateMarkerIcon=_getIconMaker(newVal);
            setMarkers[Number(newVal.unit_id)].setPosition(new google.maps.LatLng(newVal.position.lat, newVal.position.lng));
            setMarkers[Number(newVal.unit_id)].setOptions(
                {
                    icon: {
                        scale: 0.5,
                        anchor: new google.maps.Point(17, 17),
                        url: `public/assets/images/icons/${updateMarkerIcon}`,
                    },
                }
            );
            map.setCenter(setMarkers[Number(newVal.unit_id)].getPosition());
            // map_location={lat: newVal.position.lat, lng: newVal.position.lng};
            // map.setCenter(map_location);
            // console.log('ssa -->',newVal.unit_id);
        } 

            // let markerIcon = 'stopIcon.svg';

            // if (newVal.vehicle_status == 2) {
            //     markerIcon = 'move-este.svg'
            // }
            // // console.log('markerIcon 1 -->',markerIcon);
            // markerIcon=_getIconMaker(newVal);

            // // console.log('markerIcon 2 -->',markerIcon);
            // setMarkers[Number(newVal.unit_id)] = new google.maps.Marker({
            //     position: new google.maps.LatLng(newVal.position.lat, newVal.position.lng),
            //     map: map,
            //     title: newVal.unit_code,
            //     unit_id: newVal.unit_id,
            //     icon: {
            //         scale: 0.5,
            //         anchor: new google.maps.Point(17, 17),
            //         url: `public/assets/images/icons/${markerIcon}`,
            //     },
            //     optimized: true,
            // });

            
        // }
        
        
    };
    

    let getSingleVehicle=function(data){
        data.forEach(thisUnit => {
            if( thisUnit.unit_id == app_tracking_unit){
                AddMarker(thisUnit);
            }    
        });
        
    }
    let onUpdateLocation=function(data){
        if( data.unit_id == app_tracking_unit){
            updLocationMarkers(data);
        }
    }

    let onReloadPage=function(data){
        if( data.token_id == app_token_id){
            location.reload(); 
        }
    }
    
    var socket = io.connect(app_url_api);
    
    socket.on('connect', onConnect );
    socket.on('vehicle_all_gm', getSingleVehicle );
    socket.on('vehicles_locations_gm', onUpdateLocation );
    socket.on('tracking_url_reload', onReloadPage );

    function onConnect(evt){
        console.log('CONNECTED');
    }
    // form_data={company:company_id,vehicle_group:vehicle_groups};
    socket.emit('join_company',{company:app_tracking_company,vehicle_group:'all'});
    // $(".unit_address")
    
// });