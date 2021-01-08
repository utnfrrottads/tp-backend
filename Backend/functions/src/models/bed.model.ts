import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection } from 'fireorm';
 
@Collection()
export class Bed {
    id: string;
    status: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
};
