export interface AccidentOrDiseases{
    id:string;
    description:string; 
    idHospital?: string	
}
export interface AccidentOrDiseasesResult{
    AccidentOrDiseases: AccidentOrDiseases[],  
    msg: string,
    success: boolean,
}