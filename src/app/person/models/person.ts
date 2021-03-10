import { HealthInsurance } from '../../health-insurance/models/health-insurance';

export interface Person {
    id: string;
    dni: number;
    firstName: string;
    lastName: string;
    bornDate: string; // Date
    gender: string;
    phone: string;
    bloodType?: string;
    emergencyContact?: string;

    nurseWorkId?: string;
    user?: string;
    password?: string;
    healthInsurances: HealthInsurance[];    // TODO opcional ?
    idHealthInsurance: string;
}
// export class Person {
//     id = '';
//     dni = 0;
//     firstName = '';
//     lastName = '';
//     bornDate = ''; // Date
//     gender = '';
//     phone = '';
//     bloodType = '';
//     emergencyContact: Person;

//     nurseWorkId = '';
//     user = '';
//     password = '';
//     healthInsurances: HealthInsurance[];
//     idHealthInsurance = '';
// }
export interface PersonResult {
    persons: Person[];
    msg: string;
    success: boolean;
}
export interface PersonHealthInsuranceResult {
    persons: Person;
    healthInsurances: HealthInsurance[];
    msg: string;
    success: boolean;
}
export interface PersonHealthInsurance {
    idPerson: string;
    idHealthInsurance: string;
}
export interface Gender {
    id: number;
    description: string;
}
export interface BloodType{
    id: number;
    description: string;
}
