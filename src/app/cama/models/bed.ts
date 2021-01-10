export interface Bed {
    id: string,
    description: string,
    status: string,
    type: string,
    subtype: string,
}
export interface BedResult {
    camas: Bed[],  // TODO : cambiar por beds
    msg: string,
    success: boolean,
}
export class CamaSummary {
    title: string;
    value: string;
    isIncrease: boolean;
    color: string;
    percentValue: string;
    icon: string;
    isCurrency: boolean;
}
export class CamaMonthly {
    month: string; 
    count: number;
}
export class BedType {
    id: number; 
    description: string;
}
export class BedStatus {
    id: number; 
    description: string;
}
export class BedSubType {
    id: number; 
    description: string;
}