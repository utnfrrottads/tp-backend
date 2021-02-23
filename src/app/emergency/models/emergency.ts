import { GeoLocationGoogleMap, Hospital } from '../../hospital/models/hospital';
import { AccidentOrDiseases } from '../../accident-diseases/models/accidentOrDiseases';
import { Person } from '../../person/models/person';
import { Bed } from '../../bed/models/bed';

export interface Emergency{
    id: string,
    dateOfEntrance: string,
    dateOfExit?: string,
    location: GeoLocationGoogleMap,
    locality: string,
    ambulanceLicensePlate: string,
    accidentOrDisease?: AccidentOrDiseases,

    idHospital?: string,
    idPatient?: string,
    idNurse?: string,
    idBed?: string
}

export interface EmergencyResult{
    emergency: Emergency,
    msg: string,
    success: boolean,
}