import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import tt from '@tomtom-international/web-sdk-maps';  

import { default as ttServices } from '@tomtom-international/web-sdk-services';
import { default as ttMaps } from '@tomtom-international/web-sdk-maps';
import { EfectorService } from 'src/app/efector/services/efector.service';
import { Efector } from 'src/app/efector/model/efector';

@Component({
  selector: 'app-map-emergencia',
  templateUrl: './map-emergencia.component.html',
  styleUrls: ['./map-emergencia.component.sass'],  
  encapsulation: ViewEncapsulation.None
})
export class MapEmergenciaComponent implements OnInit {
  map:any;
  marker: any;
  efectorData: Efector[]; 
  passengerInitCoordinates = [4.876935, 52.360306];
  apiKey: string = ''
  constructor(
    private efectorService: EfectorService
  ) { }

  ngOnInit(): void { 
    this.initMap(); 
  } 

  initMap(){ 
    this.map = ttMaps.map({
      key: this.apiKey,
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      zoom:1.2
    });
    this.map.addControl(new ttMaps.NavigationControl());
    this.getEfectores();
  }
  getEfectores(){ //TO DO: ¿pasarlo a otro componente y que no sea mapa?
    this.efectorService.getEfectoresLocalization().subscribe(
      (res: Efector[]) => {
        this.efectorData = res;
        this.fillMapWithEfectores(res);
    });
  }
  fillMapWithEfectores(efectores: Efector[]){
    for (var i=0;i< efectores.length;i++) {
      this.marker = new ttMaps.Marker({draggable:false, color:'#123456', scale: 0.5 })
          .setLngLat([efectores[i].geo.lng,efectores[i].geo.lat])
          .addTo(this.map);
    }
  }
  
  createPassengerMarker(markerCoordinates, popup) {
        const passengerMarkerElement = document.createElement('div');
        passengerMarkerElement.innerHTML = "<img src='img/manHere.png' style='width: 30px; height: 30px';>";
        return new ttMaps.Marker({ element: passengerMarkerElement }).setLngLat(markerCoordinates).setPopup(popup).addTo(this.map);
    }
}



// const passengerInitCoordinates = [4.876935, 52.360306];
// let passengerMarker;

// function createPassengerMarker(markerCoordinates, popup) {
//     const passengerMarkerElement = document.createElement('div');
//     passengerMarkerElement.innerHTML = "<img src='img/man-waving-arm_32.png' style='width: 30px; height: 30px';>";
//     return new tt.Marker({ element: passengerMarkerElement }).setLngLat(markerCoordinates).setPopup(popup).addTo(map);
// }
