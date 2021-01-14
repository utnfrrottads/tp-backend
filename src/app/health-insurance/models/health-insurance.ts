export interface HealthInsurance {
    id: string,
    legalName: string,
    fantasyName: string,
    phone: number 
}
export interface HealthInsuranceResult {
    healthInsurances: HealthInsurance[],
    msg: string,
    success: boolean,
}