import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
type Geopoint = admin.firestore.GeoPoint;
import { Collection } from 'fireorm';
import { AccidentOrDisease } from './accidentOrDisease.model';

@Collection()
export class Emergency {
    id: string;
    dateOfEntrance: Timestamp;
    dateOfExit: Timestamp;
    locality: string;
    location: Geopoint;
    ambulanceLicensePlate: string;
    accidentOrDisease?: AccidentOrDisease;
    idHospital?: string;
    idPatient?: string;
    idNurse?: string;
    idContact?: string;
    idBed?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
};