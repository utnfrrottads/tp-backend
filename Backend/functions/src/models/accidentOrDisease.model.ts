import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection } from 'fireorm';
 
@Collection()
export class AccidentOrDisease {
    id: string;
    description: string;
    createdAt?:	Timestamp;
    updatedAt?:	Timestamp;		
};