import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { Hospital } from '../../../hospital/models/hospital';
import { MapService } from '../../services/map.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  @Input() hospitalData: Hospital[];
  @Output() hospitalSelected = new EventEmitter();
  hospitalClosest: Hospital;
  myPosition: google.maps.LatLngLiteral;
  @Output() position = new EventEmitter();
  myMarkers = [];
  infoContent = '';
  mensajeDistancia = '';
  zoom = 12;
  iconMarkerAmbulance = '../../../../../assets/img/MarkerAmbulance.png';
  iconHospitalClosest = '../../../../../assets/img/MarkerEfectorRed.png';
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    // disableDoubleClickZoom: true,
    // maxZoom: 15,
    // minZoom: 8,
    // zoomControl: false,
    // scrollwheel: false,
  };

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void{
    this.getCurrentPosition();
  }

/**
 * Agrega marcador en el mapa con mi posición actual
 */
  addMarkerCurrentPosition(): void{
    // Obtengo la posición actual
    this.getCurrentPosition();
    // Limpio el marcador
    this.myMarkers = [];
    // Agrego marcador a mapa
    this.myMarkers.push( this.mapService.addMarkerToMap(this.myPosition , this.iconMarkerAmbulance));
  }

/**
 * Obtiene la posición actual del usuario
 */
  getCurrentPosition(): void{
    navigator.geolocation.getCurrentPosition((position) => {
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.position.emit(this.myPosition);
    });
  }

  logCenter(): void{
    alert(JSON.stringify(this.map.getCenter()));
  }

  openInfo(marker: MapMarker, content): void{
    this.infoContent = content;
    this.info.open(marker);
  }




/**
 * Obtiene la posición actual del usuario
 * y la compara con todos los hospitales para obtener cual es el más cercano.
 * Una vez que se obtiene el más cercano se lo resalta en el mapa y se emite el hospital cercano
 */
  getNearestHospital(): void{
    this.getCurrentPosition();
    const closest = this.mapService.getHospitalClosest(this.hospitalData, this.myPosition);
    this.hospitalClosest = closest.hospitalClosest;
    this.mensajeDistancia = closest.closestDist.toString();

    for (const hospital of this.hospitalData){
      if ( hospital.id === this.hospitalClosest.id ) {
        hospital.options = {
          animation: google.maps.Animation.BOUNCE, // DROP
          icon: this.iconHospitalClosest,
        };

        this.hospitalSelected.emit(hospital);
      }
    }
  }







  // ******************************************************************
  // ***********************     MAPS FUNCTIONS    ********************
  // ******************************************************************


















  // ******************************************************************
  // *********************** GOOGLE MAPS FUNCTIONS ********************
  // ******************************************************************
/** FUNCION DE GOOGLE MAPS
 * OBTIENE LA DISTANCIA ENTRE DOS PUNTOS
 */
  public getDistancia(origen: string, destino: string): void{
    return new google.maps.DistanceMatrixService()
      .getDistanceMatrix(
        { origins: [origen]
          , destinations: [destino]
          , travelMode:  google.maps.TravelMode.DRIVING}
          , (results: any) => {
        this.mensajeDistancia =  results.rows[0].elements[0].distance.value;
    });
  }
/** FUNCION DE GOOGLE MAPS
 * Calcula la distancia utilizando los servicios de Google (tiene un máximo de solicitudes gratis, luego es pago)
 */
  calculateDistancia(): void{
    const myCurrentPosition = { lat: -32.951416888801205,
      lng: -60.721738511040954
    };
    const destinoPosition = {
      lat: -33.0493740313205,
      lng: -60.6216922731336
    };
    const origen =  myCurrentPosition.lat +  ', ' + myCurrentPosition.lng;
    const destino = destinoPosition.lat + ', ' + destinoPosition.lng;
    this.getDistancia(origen, destino);

  }
}