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
    emergencyContact?: Person; 

    nurseWorkId?:string;
    user?:string;
    password?:string;
    healthInsurances: HealthInsurance[];    // TODO opcional ?
    healthInsuranceId: string;              // TODO opcional ? idHealthInsurance
}
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

export interface Gender {
    id: number;
    description: string
}
export interface BloodType{
    id: number;
    description: string
}