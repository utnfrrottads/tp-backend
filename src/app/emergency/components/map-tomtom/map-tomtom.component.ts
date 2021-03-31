import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit} from '@angular/core';
import { HospitalService } from '../../../hospital/services/hospital.service';
import { Hospital } from '../../../hospital/models/hospital';
import { MapService } from '../../services/map.service';
import { default as defServices, services, tt as ttServices } from '@tomtom-international/web-sdk-services';
import { default as tt, map, LngLat} from '@tomtom-international/web-sdk-maps';

@Component({
    selector: 'app-map-tomtom',
    templateUrl: './map-tomtom.component.html',
    styleUrls: ['./map-tomtom.component.sass']
})
export class MapTomtomComponent implements OnInit {

  taxiConfig: any [];
  apiKey = '';
  map: any;
  marker: any;
  passengerMarker: any;
  efectorData: Hospital[];
  passengerInitCoordinates = [4.876935, 52.360306];
  rutaImagenPersona = '../../../../assets/img/manHere.png';

  constructor(
    private mapService: MapService,
    private hospitalService: HospitalService,
  ) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = tt.map({
      key: this.mapService.getApiKey(),
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: this.passengerInitCoordinates,
      // zoom:13
    });

    this.map.addControl(new tt.NavigationControl());
    this.getEfectores();
    this.initPassengerMarker();
  }
  getEfectores(): void { // TO DO: ¿pasarlo a otro componente y que no sea mapa?
    this.hospitalService.getHospitals().subscribe({
      next: res => {
        this.efectorData = res.hospitals;
        this.fillMapWithEfectores(res.hospitals);
    }});
  }

  fillMapWithEfectores(efectores: Hospital[]): void {
    for (let i=0;i< efectores.length;i++) {
      this.marker = new tt.Marker({draggable:false, color:'#123456', scale: 0.5 })
          .setLngLat([efectores[i].location.longitude,efectores[i].location.latitude])
          .addTo(this.map);
    }
  }


  // Persona en mapa
  initPassengerMarker(): void {
    this.passengerMarker = this.createPassengerMarker(this.passengerInitCoordinates,
      new tt.Popup({ offset: 35 }).setHTML('Haga click en el mapa para cambiar la ubicación de la emergencia'));

    this.passengerMarker.togglePopup();
  }
  createPassengerMarker(markerCoordinates, popup): void {
    const passengerMarkerElement = document.createElement('div');
    passengerMarkerElement.innerHTML = "<img src='" + this.rutaImagenPersona + "' style='width: 30px; height: 30px';>";
    return new tt.Marker({ element: passengerMarkerElement })
      .setLngLat(markerCoordinates)
      .setPopup(popup)
      .addTo(this.map);
  }
  // Mover persona haciedno click en mapa
  /*Change the passenger marker position.

  Now you can add a feature that allows users to click on the map to move a passenger. To do so, add an event listener on map click.

      In the handler function, call the reverseGeocode method with a position parameter from the event’s property geoResponse.
      In the then method define a callback that executes a drawPassengerMarkerOnMap function.

  Add a conditional statement in the drawPassengerMarkerOnMap function:
  if the Reverse Geocoding Response contains an address, then a marker with the previous
   position is removed and a new one is created at the indicated location.*/
  drawPassengerMarkerOnMap(geoResponse): void {
    if (geoResponse && geoResponse.addresses
        && geoResponse.addresses[0].address.freeformAddress) {
          this.passengerMarker.remove();
          this.passengerMarker = this.createPassengerMarker(geoResponse.addresses[0].position,
              new tt.Popup({ offset: 35 }).setHTML(geoResponse.addresses[0].address.freeformAddress));
          this.passengerMarker.togglePopup();
    }
  }

  onMapClickAngular(): void {
    this.map.on('click', function(evento) {
      const position = evento.lngLat;

      defServices.services.reverseGeocode({
          key: this.mapService.getApiKey(),
          position: position,
      }).go()
        .then(function(results) {
            this.drawPassengerMarkerOnMap(results);
          });
    });
  }





  // TAXI
  setDefaultTaxiConfig(): void{
    this.taxiConfig = [
      this.createTaxi('CAR #1', '#006967', [4.902642, 52.373627], '../../../../assets/img/cab1.png'),
      this.createTaxi('CAR #2', '#EC619F', [4.927198, 52.365927], '../../../../assets/img/cab2.png'),
      this.createTaxi('CAR #3', '#002C5E', [4.893488, 52.347878], '../../../../assets/img/cab3.png'),
      this.createTaxi('CAR #4', '#F9B023', [4.858433, 52.349447], '../../../../assets/img/cab4.png')
    ];
  }
  createTaxi(name, color, coordinates, iconFilePath, iconWidth = 30, iconHeight = 30): any{
    return {
      name: name,
      color: color,
      icon: "<img src=" + iconFilePath + " style='width: " + iconWidth + "px; height: " + iconHeight + "px;'>",
      coordinates: coordinates
    };
  }
  initTaxi(): void {
    this.setDefaultTaxiConfig(); 
    this.taxiConfig.forEach(function(taxi) {
      const carMarkerElement = document.createElement('div');
      carMarkerElement.innerHTML = taxi.icon;
      new tt.Marker({element: carMarkerElement})
          .setLngLat(taxi.coordinates)
          .addTo(this.map).togglePopup();
    });
  }
   // Persona en mapa
  initTaxiMarker(): void {
    this.passengerMarker = this.createPassengerMarker(this.passengerInitCoordinates,
      new tt.Popup({ offset: 35 }).setHTML('Haga click en el mapa para cambiar la ubicación de la emergencia'));

    this.passengerMarker.togglePopup();
  }
  createTaxiMarker(markerCoordinates, popup): void {
    const passengerMarkerElement = document.createElement('div');
    passengerMarkerElement.innerHTML = "<img src='" + this.rutaImagenPersona + "' style='width: 30px; height: 30px';>";
    return new tt.Marker({ element: passengerMarkerElement })
      .setLngLat(markerCoordinates)
      .setPopup(popup)
      .addTo(this.map);
  }
}
