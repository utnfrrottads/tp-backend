export interface Efector{ 
    id: number,
    nombre: string,
    domicilio: string,
    localidad: string,
    zona: string,
    distrito: string,
    info: string,
    telefono: number, 
    zipcode: string,
    geo: GeoLocation,
    colorMarker: string,
    colorTextoMarker: string,
}
 
export interface GeoLocation{
    lat:number;
    lng:number;
} 