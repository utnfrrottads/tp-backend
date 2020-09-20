export interface Cama {
    id: number;
    descripcion: string;
    estado: string,
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
