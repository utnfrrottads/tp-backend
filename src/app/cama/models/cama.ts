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
export class CamaMonthly {
    month: string; 
    count: number;
}
export class TipoCama {
    id: number; 
    descripcion: string;
}
export class EstadoCama {
    id: number; 
    descripcion: string;
}