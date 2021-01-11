export interface Efector{ 
    id: number,
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

    atentionLevel: string
}
export interface GeoLocation{
    lat:number;
    lng:number;
}  
export interface HospitalResult{
    hospitals: Efector[],  
    msg: string,
    success: boolean,
}