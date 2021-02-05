import { Bed } from "src/app/cama/models/bed";
import { HealthInsurance } from "src/app/health-insurance/models/health-insurance";
import { AccidentOrDiseases } from "src/app/accident-diseases/models/accidentOrDiseases";

export interface Hospital{ 
    id: string,
    name: string,
    address: string,
    locality: string,
    phone: number, 
    /** Firestore utiliza location con latitude y longitude. Es utilizado para el CRUD */
    location: GeoLocationFirestore, 
    /** Google maps utiliza location con lat y lng. Es utilizado para google maps solamente */
    locationGoogleMap: GeoLocationGoogleMap,
     
    // colorMarker: string,
    // colorTextoMarker: string,
    options: any,     

    atentionLevel: string,
    healthInsurances: HealthInsurance[],
    accidentOrDiseases: AccidentOrDiseases[],
    beds: Bed[]
}
export interface GeoLocationFirestore{
    latitude: number;
    longitude: number;
}  
export interface GeoLocationGoogleMap{
    lat: number;
    lng: number;
}  
export interface HospitalResult{
    hospitals: Hospital[],  
    msg: string,
    success: boolean,
}

export interface AtentionLevel{
    id: string,   
    description: string,
}

export interface HospitalClosest{
    hospitalClosest: Hospital,
    closestDist : number
} 

export interface HospitalHealthInsurances{ 
    hospital: Hospital,
    healthInsurances: HealthInsurance,
}
export interface HospitalHealthInsurance{ 
    idHospital: string,
    idHealthInsurance: string,
}
export interface HospitalAccidentOrDiseases{ 
    idHospital: string,
    idAccidentOrDisease: string,
}
