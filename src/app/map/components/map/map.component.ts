import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { EfectorService } from '../../../efector/services/efector.service'
import { Efector } from 'src/app/efector/model/efector';  
import { MapService } from '../../services/map.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
 

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
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  efectorData: Efector[];
  zoom = 12
  myPosition: google.maps.LatLngLiteral; 
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
  }  
  iconMarker: string = '../../../../../assets/img/cab1.png'
//   disableDoubleClickZoom: true,
// maxZoom: 15,
// minZoom: 8,
// zoomControl: false,
// scrollwheel: false,

  markers = [];
  infoContent = '';
  mensajeDistancia: string = '';
  constructor(
    private efectorService: EfectorService
  ) { }
  
  ngOnInit() {
    this.getCurrentPosition();
    this.getEfectores();
  }
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => { 
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
  getEfectores(){  
    this.efectorService.getEfectoresLocalization().subscribe(
      (res: Efector[]) => {
        this.efectorData = res; 
    });
  }  
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }
  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }
  click(event: google.maps.MouseEvent) {
    console.log(event)
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }
  addMarkerCurrentPosition() {  
    console.log('addMarkerCurrentPosition') ;
    //Obtengo la posición actual
    navigator.geolocation.getCurrentPosition((position) => {
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    console.log('mypos', this.myPosition)
    //Agrego marcador a mapa
    this.markers.push({
      position: {
        lat: this.myPosition.lat,
        lng: this.myPosition.lng,
      },
      label: {
        color: 'red',
        text: 'Mi posición actual'
      },
      title: 'Detectamos que usted se encuentra aquí',
      info: 'Info detallada ',
      // icon: '../../../../../assets/img/cab1.png', //intentando que funcione el marker primero
      options: {
        animation: google.maps.Animation.BOUNCE, //DROP
      },
    })   
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

  getNearestEfector(){
    
  }
} 