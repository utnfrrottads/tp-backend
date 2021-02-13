import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { HospitalService } from '../../../../hospital/services/hospital.service'
import { AtentionLevel, Hospital, HospitalResult } from 'src/app/hospital/models/hospital';  
import { MapService } from '../../services/map.service'; 
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'; 
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from 'src/app/person/services/person.service';
import { PersonHealthInsuranceResult } from 'src/app/person/models/person';
import { CommonService } from 'src/app/common/services/common.service';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';
import { AccidentDiseasesService } from 'src/app/accident-diseases/services/accident-diseases.service';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit { 
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  emergencyForm: FormGroup;
  personForm: FormGroup;
  dataAtentionLevel: AtentionLevel[];
  hospitalData: Hospital[];
  dataAccidentOrDiseases: AccidentOrDiseases[];
  personHealthInsuranceResultData: PersonHealthInsuranceResult = {
    persons : { id: '',
      dni: 0,
      firstName: '',
      lastName: '',
      bornDate: '', // Date
      gender: '',
      phone: '',
      bloodType: '', 
  
      nurseWorkId:'',
      user:'',
      password:'',
      healthInsurances: [],    // TODO opcional ?
      healthInsuranceId:''
    },
    healthInsurances : [],
    msg:'',
    success: false
  };
  flagGetPersonHealth: boolean = false;
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

  // title="gmaps";
  // position = {
  //   lat: -34.681,
  //   lng: -58.371
  // }
  // label = {
  //   color: 'red',
  //   text: 'Emergencia'
  // }
  constructor(
    private hospitalService: HospitalService, 
    private personService: PersonService, 
    private mapService: MapService, 
    private accidentDiseasesService: AccidentDiseasesService,
    private router: Router,
    private commonService: CommonService
  ) { }
  
  ngOnInit(): void{
    this.initForm();
    this.getCurrentPosition();
    this.getHospitals();
    this.getAtentionLevel();
  }

  getHospitals(): void{  
    this.hospitalService.getHospitals().subscribe({
      next: res => { 
        this.hospitalData = this.hospitalService.getFormatOkFrontendHospital(res.hospitals); 
    },
    error: err => {
      this.commonService.openSnackBar('Ups... algo falló al querer obtener los Hospitales','Cerrar');
     } 
  });
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
      }
    });
  }
/**
 * Obtiene la posición actual del usuario 
 * y la compara con todos los hospitales para obtener cual es el más cercano
 */   
  getNearestHospital(): void{
    this.getCurrentPosition(); 
    const closest = this.mapService.getHospitalClosest(this.hospitalData, this.myPosition);
    this.hospitalClosest = closest.hospitalClosest;
    this.mensajeDistancia = closest.closestDist.toString(); 

    for(let hospital of this.hospitalData){  
      if ( hospital.id == this.hospitalClosest.id ) {
        hospital.options = {
          animation: google.maps.Animation.BOUNCE, //DROP
          icon: this.iconHospitalClosest,  
        }
      }
    }; 
  }

  logCenter(): void{
    alert(JSON.stringify(this.map.getCenter()));
  }

  
  openInfo(marker: MapMarker, content): void{
    this.infoContent = content
    this.info.open(marker)
  }



  
  initForm(){
    this.emergencyForm = new FormGroup({
      atentionLevel: new FormControl(''),  
    }); 
    this.personForm = new FormGroup({
      dni: new FormControl(''),
    })
  }
  
  getAtentionLevel(){
    this.hospitalService.getAtentionLevel().subscribe({
      next: res => {
      this.dataAtentionLevel = res;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer obtener los Niveles de Atención','Cerrar');
       } 
    });  
  }
 
  
  getPersonAndHealthInsurancesById(): void{  
    this.flagGetPersonHealth = true;
    this.personService.getPersonAndHealthInsurancesById(this.personForm.controls.dni.value).subscribe({
      next: res => { 
        console.log('se obtuvo la persona del dni', res);
        this.personHealthInsuranceResultData = res; 
        this.flagGetPersonHealth = false;
        console.log(this.personHealthInsuranceResultData);
    },
    error: err => {
      console.log('error',err);
      this.commonService.openSnackBar('Ups... algo falló al querer buscar la persona y sus obras sociales','Cerrar');
     } 
    });
  }

  // getAccidentOrDiseases(): void{  
  //   this.accidentDiseasesService.getAccidentOrDiseases().subscribe({
  //     next: res => {  
  //       this.dataAccidentOrDiseases = res.accidentOrDiseases;  
  //   },
  //   error: err => {
  //     this.commonService.openSnackBar('Ups... algo falló al querer traer los accidentes/enfermedades','Cerrar');
  //    } 
  //   });
  // }
  redirectToPersonForm(){
    this.router.navigate(['personas']);
  }
  




  hospitals : Hospital[];
  
  getClosestHospitals(){ 
    this.hospitalService.getClosestHospitals(this.emergencyForm.controls.atentionLevel.value).subscribe({
      next: res => {
        this.hospitals = res.hospitals;
      }
    })
  }


  // ******************************************************************
  // *********************** GOOGLE MAPS FUNCTIONS ********************
  // ******************************************************************
/** FUNCION DE GOOGLE MAPS 
 * OBTIENE LA DISTANCIA ENTRE DOS PUNTOS
*/
  public getDistancia(origen: string, destino: string): void{
    //
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino] , travelMode:  google.maps.TravelMode.DRIVING}, (results: any) => {
        this.mensajeDistancia =  results.rows[0].elements[0].distance.value
    });
  }
/** FUNCION DE GOOGLE MAPS 
 * Calcula la distancia utilizando los servicios de Google (tiene un máximo de solicitudes gratis, luego es pago)
 */  
  calculateDistancia(): void{
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




  // let radiusHeart = 6371; // radius of earth in km
  // let distances = [];
  // let closest: string = '-999' ; 
  // let closestDist: number = 99999999;
  // for(let hospital of this.hospitalData){ 
  //   //console.log(hospital.nombre, hospital.geo.lat, hospital.geo.lng);
  //   let myLat = this.myPosition.lat;
  //   let myLng = this.myPosition.lng;
  //   let markerLat = hospital.location.lat;
  //   let markerLng = hospital.location.lng; 

  //   let dLat  = this.rad(markerLat - myLat);
  //   let dLong = this.rad(markerLng - myLng);
  //   let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  //           Math.cos(this.rad(myLat)) * Math.cos(this.rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  //   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   let distance = radiusHeart * c;

  //   if ( closest === '-999' || distance < closestDist ) {
  //     closest = hospital.id;
  //     closestDist = distance; 
  //     this.hospitalClosest = hospital;
  //     //console.log('mas cercano',closest + '-' + closestDist);
  //   }
  // }
  // //console.log('objeto',this.hospitalClosest);
  // //console.log(closest, closestDist) ;
  // this.mensajeDistancia = closestDist.toString();


  // for(let hospital of this.hospitalData){  
  //   if ( hospital.id == this.hospitalClosest.id ) {
  //     hospital.options = {
  //       animation: google.maps.Animation.BOUNCE, //DROP
  //       icon: this.iconHospitalClosest,  
  //     }
  //   }
  // };

  // // this.efectorData.filter( 
  // //   efec => {
  // //     if(efec.id === this.efectorClosest.id){
  // //       efec.options = {
  // //         animation: google.maps.Animation.BOUNCE, //DROP
  // //         icon: this.iconManMarker,  
  // // }}});



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