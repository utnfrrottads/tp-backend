import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
type Geopoint = admin.firestore.GeoPoint;
import { Collection } from 'fireorm';
 
@Collection()
export class Hospital {
    id: string;
    name: string;
    address: string;
    locality: string;
    phone: string;
    location: Geopoint;
    atentionLevel: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
};
