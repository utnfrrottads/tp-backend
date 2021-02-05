export interface AccidentOrDiseases{
    id:string;
    description:string;
}
export interface AccidentOrDiseasesResult{
    accidentOrDiseases: AccidentOrDiseases[],  
    msg: string,
    success: boolean,
}
  