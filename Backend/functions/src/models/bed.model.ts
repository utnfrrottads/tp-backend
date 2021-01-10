import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection } from 'fireorm';
 
@Collection()
export class Bed {
    id: string;
    idHospital: string;
    description: string;
    status: string;
    type: string;
    subtype: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
};
