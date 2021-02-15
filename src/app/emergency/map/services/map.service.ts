import { Injectable } from '@angular/core';
import { GeoLocationGoogleMap, Hospital, HospitalClosest } from 'src/app/hospital/models/hospital';

@Injectable({
  providedIn: 'root'
})
export class MapService { 
  //apiKey='';
  constructor() { }

  getApiKey(){
    //return this.apiKey;
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
        animation: google.maps.Animation.BOUNCE, //DROP
        icon: iconMarkerAmbulance,  
      }
    }
  }
   
/** Radio de la tierra en kilómetros km  */
  radiusHeart = 6371; 

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
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.rad(myLat)) * Math.cos(this.rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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
    let closest: string = '-999' ; 
    let closestDist: number = 99999999;
    let hospitalClosest: HospitalClosest;
    for(let hospital of hospitalData){ 

      distance = this.calcDistance(myPosition.lat, myPosition.lng, hospital.locationGoogleMap.lat, hospital.locationGoogleMap.lng);

      if ( closest === '-999' || distance < closestDist ) {
        closestDist = distance;
        closest = hospital.id;
        hospitalClosest = { 
          closestDist : distance,
          hospitalClosest: hospital
        }
      }
    }
    return hospitalClosest
    
  }
 

  rad(degrees: number): number { 
    return degrees * (Math.PI/180);
  }
  
/**
* `GETS` all emergencys of the collection.
*/
  getBeds(): Observable<BedResult>{ 
    return this.httpClient.get<BedResult>(this.baseUrl+'/api-beds');
  }
emergency.get('/', validate, EmergencysController.getAllemergencys);



  // CREATES a bed by idHospital and adds it as a subcollection
  // /createBedByIdHospital/:id
  createBed(bed: Bed): Observable<BedResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<BedResult>(
      this.baseUrl + '/api-beds/createBedByIdHospital/' + bed.idHospital,
      bed,
      httpOptions);
  }

  // UPDATES a bed by idHospital and idBed.
  // /updatebyIds/:idHospital/:idBed
  updateBedById(bed: Bed): Observable<BedResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<BedResult>(
      this.baseUrl + '/api-beds/updatebyIds/' + bed.idHospital + '/' + bed.id,
      bed,
      httpOptions);
  } 
  // DELETES a bed by idHospital and idBed
  // /deleteBedByIds/:idHospital/:idBed
  deleteBedById(bed: Bed): Observable<BedResult>{    
    console.log('por eliminar: ',bed);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<BedResult>(
      this.baseUrl + '/api-beds/deleteBedByIds/' + bed.idHospital + '/' + bed.id,
      httpOptions);
  } 

/**
* `CREATES` a emergency.
*/
emergency.post('/createEmergency', [
    check('dateOfEntrance').not().isEmpty().withMessage('El campo dateOfEntrance es requerido'),
    check('dateOfExit').not().isEmpty().withMessage('El campo dateOfExit es requerido'),
    check('locality').not().isEmpty().withMessage('El campo locality es requerido'),
    check('ambulanceLicensePlate').not().isEmpty().withMessage('El campo ambulanceLicensePlate es requerido'),
    check('location').not().isEmpty().withMessage('El campo location es requerido'),
    sanitizeBody(['dateOfEntrance', 'dateOfExit', 'locality', 'location', 'ambulanceLicensePlate']).trim(),
], validate, EmergencysController.createEmergency);

/**
* `ADDS` an AccidentOrDisease treated by emergency.
*/
emergency.post('/addToAccidentOrDiseaseByIds/:idEmergency/:idAccidentOrDisease', [
    param('idEmergency').not().isEmpty().withMessage('El campo idEmergency es requerido'),
    param('idEmergency').isLength({ min: 20, max: 20 }).withMessage('El idEmergency debe tener 20 caracteres'),
    param('idEmergency').isAlphanumeric().withMessage('El idEmergency debe ser alfanumérico'),
    param('idAccidentOrDisease').not().isEmpty().withMessage('El campo idAccidentOrDisease es requerido'),
    param('idAccidentOrDisease').isLength({ min: 20, max: 20 }).withMessage('El idAccidentOrDisease debe tener 20 caracteres'),
    param('idAccidentOrDisease').isAlphanumeric().withMessage('El idAccidentOrDisease debe ser alfanumérico'),
], validate, EmergencysController.addToAccidentOrDiseaseByIds);

/**
* `UPDATES` a emergency by ID.
*/
emergency.put('/updateemergencyById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['dateOfEntrance', 'dateOfExit', 'locality', 'location', 'ambulanceLicensePlate']).trim(),
], validate, EmergencysController.updateEmergencyById);

/**
* `DELETES` a emergency by ID.
*/
emergency.delete('/deleteEmergencyById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, EmergencysController.deleteEmergencyById);


}
