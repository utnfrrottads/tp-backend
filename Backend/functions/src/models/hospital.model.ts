import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
type Geopoint = admin.firestore.GeoPoint;
import { Collection, SubCollection, ISubCollection } from 'fireorm';
import { AccidentOrDisease } from './accidentOrDisease.model';
import { Bed } from './bed.model';
import { HealthInsurance } from './healthInsurance.model';

@Collection()
export class Hospital {
    id: string;
    name: string;
    address: string;
    locality: string;
    phone: string;
    location: Geopoint;
    atentionLevel: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;

    @SubCollection(Bed)
    beds?: ISubCollection<Bed>;

    @SubCollection(HealthInsurance)
    healthInsurances?: ISubCollection<HealthInsurance>;

    @SubCollection(AccidentOrDisease)
    accidentOrDiseases?: ISubCollection<AccidentOrDisease>;
};
