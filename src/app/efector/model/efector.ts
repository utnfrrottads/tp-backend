export interface Efector{ 
    id: number,
    nombre: string,
    domicilio: string,
    localidad: string,
    telefono: number, 
    zipcode: string,
    geo: GeoLocation,
}
 
export interface GeoLocation{
    lat:number;
    lng:number;
} 