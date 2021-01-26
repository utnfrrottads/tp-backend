import { Bed } from "src/app/cama/models/bed";
import { HealthInsurance } from "src/app/health-insurance/models/health-insurance";
import { AccidentOrDiseases } from "src/app/accident-diseases/models/accidentOrDiseases";

export interface Hospital{ 
    id: string,
    name: string,
    address: string,
    locality: string,
    phone: number, 
    zipcode: string,
    location: GeoLocation,
    
    // zona: string,
    // info: string,
    // distrito: string,
    colorMarker: string,
    colorTextoMarker: string,
    options: any,     

    atentionLevel: string,
    healthInsurances: HealthInsurance[],
    accidentOrDiseases: AccidentOrDiseases[],
    beds: Bed[]
}
export interface GeoLocation{
    latitude:number;
    longitude:number;
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

