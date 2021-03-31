import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection } from 'fireorm';
 
@Collection()
export class HealthInsurance {
    id: string;
    legalName: string;
    fantasyName: string;
    phone: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
}
