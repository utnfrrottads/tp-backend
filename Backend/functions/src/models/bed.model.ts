import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection } from 'fireorm';
 
@Collection()
export class Bed {
    id: string;
    description: string;
    status: string;
    type: string;
    subType: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
};
