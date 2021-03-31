import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
import { Collection, ISubCollection, SubCollection } from 'fireorm';
import { HealthInsurance } from './healthInsurance.model';

@Collection()
export class Person {
    id: string;
    dni: number;
    firstName: string;
    lastName: string;
    bornDate: Timestamp;
    gender: string;
    phone: string;

    bloodType?: string;
    emergencyContact?: Person;
    
    nurseWorkId?: string;
    user?: string;
    password?: string;

    createdAt?: Timestamp;
    updatedAt?: Timestamp;

    @SubCollection(HealthInsurance)
    healthInsurances?: ISubCollection<HealthInsurance>;

}