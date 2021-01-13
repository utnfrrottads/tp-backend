import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { HospitalService } from '../../../hospital/services/hospital.service'
import { Hospital } from 'src/app/hospital/model/hospital';  
import { MapService } from '../../services/map.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
 

import {MatBadgeModule} from '@angular/material/badge'; 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit { 
  // title="gmaps";
  // position = {
  //   lat: -34.681,
  //   lng: -58.371
  // }
  // label = {
  //   color: 'red',
  //   text: 'Emergencia'
  // }
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  myMapita: google.maps.Map;
  hospitalData: Hospital[];
  hospitalClosest: Hospital;
  myMarkers = [];
  infoContent = '';
  mensajeDistancia: string = '';
  zoom = 12;
  iconMarkerAmbulance: string = '../../../../../assets/img/MarkerAmbulance.png';
  iconHospitalClosest: string = '../../../../../assets/img/MarkerEfectorRed.png';
  myPosition: google.maps.LatLngLiteral; 
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    // disableDoubleClickZoom: true,
    // maxZoom: 15,
    // minZoom: 8,
    // zoomControl: false,
    // scrollwheel: false,
  }    

  constructor(
    private hospitalService: HospitalService, 
  ) { }
  
  ngOnInit() {
    this.getCurrentPosition();
    this.gethospitales();
  }
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => { 
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }
  gethospitales(){  
    this.hospitalService.getEfectoresLocalization().subscribe(
      (res: Hospital[]) => {
        this.hospitalData = res; 
    });
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }
  addMarkerCurrentPosition() {   
    //Obtengo la posición actual
    this.getCurrentPosition(); 
    //Agrego marcador a mapa
    this.myMarkers.push({
      position: {
        lat: this.myPosition.lat,
        lng: this.myPosition.lng,
      },
      label: {
        color: 'red',
        text: 'Mi posición actual'
      },
      title: 'Usted se encuentra aquí',
      info: 'Info detallada ',    
      //draggable: true,
       
      options: {
        animation: google.maps.Animation.BOUNCE, //DROP
        icon: this.iconMarkerAmbulance,  
      },
    });
 
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  public getDistancia(origen: string, destino: string) {
    //
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino] , travelMode:  google.maps.TravelMode.DRIVING}, (results: any) => {
        this.mensajeDistancia =  results.rows[0].elements[0].distance.value
    });
  }
  calculateDistancia(){
    let myCurrentPosition = { lat: -32.951416888801205,
      lng: -60.721738511040954
    }
    let destinoPosition = {lat:-33.0493740313205,lng:-60.6216922731336}
 
    let srcOriginLat: '11.127122499999999'
    let srcOriginLng: '78.6568942'
    
    let origen =  myCurrentPosition.lat +  "," + myCurrentPosition.lng 
    let destino = destinoPosition.lat +  "," + destinoPosition.lng   
    this.getDistancia(origen, destino);

  }  
  getNearestHospital(){
    this.getCurrentPosition();
    this.compareDistances(); 
  }
  compareDistances(){
    let radiusHeart = 6371; // radius of earth in km
    let distances = [];
    let closest: number = -999 ; 
    let closestDist: number = 99999999;
    for(let hospital of this.hospitalData){ 
      //console.log(hospital.nombre, hospital.geo.lat, hospital.geo.lng);
      let myLat = this.myPosition.lat;
      let myLng = this.myPosition.lng;
      let markerLat = hospital.location.lat;
      let markerLng = hospital.location.lng; 

      let dLat  = this.rad(markerLat - myLat);
      let dLong = this.rad(markerLng - myLng);
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.rad(myLat)) * Math.cos(this.rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let distance = radiusHeart * c;

      if ( closest == -999 || distance < closestDist ) {
        closest = hospital.id;
        closestDist = distance; 
        this.hospitalClosest = hospital;
        //console.log('mas cercano',closest + '-' + closestDist);
      }
    }
    //console.log('objeto',this.hospitalClosest);
    //console.log(closest, closestDist) ;
    this.mensajeDistancia = closestDist.toString();


    for(let hospital of this.hospitalData){  
      if ( hospital.id == this.hospitalClosest.id ) {
        hospital.options = {
          animation: google.maps.Animation.BOUNCE, //DROP
          icon: this.iconHospitalClosest,  
        }
      }
    };

    // this.efectorData.filter( 
    //   efec => {
    //     if(efec.id === this.efectorClosest.id){
    //       efec.options = {
    //         animation: google.maps.Animation.BOUNCE, //DROP
    //         icon: this.iconManMarker,  
    // }}});

  }
  rad(degrees){  
    return degrees * (Math.PI/180);
  }

 









  // initMap(): void {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   const map = new google.maps.Map(
  //     document.getElementById("map") as HTMLElement,
  //     {
  //       zoom: 7,
  //       center: { lat: 41.85, lng: -87.65 },
  //     }
  //   );
  //   directionsRenderer.setMap(map);
  
  //   const onChangeHandler = function () {
  //     this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  //   };
  //   (document.getElementById("start") as HTMLElement).addEventListener(
  //     "change",
  //     onChangeHandler
  //   );
  //   (document.getElementById("end") as HTMLElement).addEventListener(
  //     "change",
  //     onChangeHandler
  //   );
  // }
  
  // calculateAndDisplayRoute(
  //   directionsService: google.maps.DirectionsService,
  //   directionsRenderer: google.maps.DirectionsRenderer
  // ) {
  //   directionsService.route(
  //     {
  //       origin: {
  //         query: (document.getElementById("start") as HTMLInputElement).value,
  //       },
  //       destination: {
  //         query: (document.getElementById("end") as HTMLInputElement).value,
  //       },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (response, status) => {
  //       if (status === "OK") {
  //         directionsRenderer.setDirections(response);
  //       } else {
  //         window.alert("Directions request failed due to " + status);
  //       }
  //     }
  //   );
  // }
} 








  // zoomIn() {
  //   if (this.zoom < this.options.maxZoom) this.zoom++
  // }
  // zoomOut() {
  //   if (this.zoom > this.options.minZoom) this.zoom--
  // }
  // click(event: google.maps.MouseEvent) {
  //   console.log(event)
  // }