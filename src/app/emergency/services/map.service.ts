import { Injectable } from '@angular/core';
import { GeoLocationGoogleMap, Hospital, HospitalClosest } from '../../hospital/models/hospital';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // apiKey='';
  /** Radio de la tierra en kilómetros km  */
  radiusHeart = 6371;

  getApiKey(){
    // return this.apiKey;
  }

  addMarkerToMap(myPosition: google.maps.LatLngLiteral, iconMarkerAmbulance: string): any {
    return {
      position: {
        lat: myPosition.lat,
        lng: myPosition.lng,
      },
      label: {
        color: 'red',
        text: 'Mi posición actual'
      },
      title: 'Usted se encuentra aquí',
      info: 'Info detallada ',
      // draggable: true,

      options: {
        animation: google.maps.Animation.BOUNCE, // DROP
        icon: iconMarkerAmbulance,
      }
    };
  }

/**
 * Compara dos puntos y obtiene la distancia
 * @param myLat latitud de mi posicion
 * @param myLng longitud de mi posicion
 * @param markerLat latitud del marcador contra el cual es comparado
 * @param markerLng longitud del marcador contra el cual es comparado
 * @returns distancia entre los dos puntos comparados
 */
  calcDistance(myLat: number, myLng: number, markerLat: number, markerLng: number): number{
    const dLat  = this.rad(markerLat - myLat);
    const dLong = this.rad(markerLng - myLng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(myLat)) * Math.cos(this.rad(myLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.radiusHeart * c;
  }
/**
 * Obtiene el hospital más cercano
 * @param hospitalData arrays de los hospitales a comparar
 * @param myPosition posición con lat y lng a utilizar para buscar el hospital más cercano a esta
 *
 * @returns hospital más cercano, distancia y ID
 */
  getHospitalClosest(hospitalData: Hospital[], myPosition: GeoLocationGoogleMap): HospitalClosest{
    let distance: number;
    let closest = '-999' ;
    let closestDist = 99999999;
    let hospitalClosest: HospitalClosest;
    for (const hospital of hospitalData){

      distance = this.calcDistance(myPosition.lat, myPosition.lng, hospital.locationGoogleMap.lat, hospital.locationGoogleMap.lng);

      if ( closest === '-999' || distance < closestDist ) {
        closestDist = distance;
        closest = hospital.id;
        hospitalClosest = {
          closestDist : distance,
          hospitalClosest: hospital
        };
      }
    }
    return hospitalClosest;
  }

  rad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
