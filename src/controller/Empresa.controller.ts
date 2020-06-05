import {Request, Response, response} from 'express'
import { getRepository } from 'typeorm'
import { Empresa } from '../entity/Empresa'

export const getEmpresas = async (req: Request, res: Response): Promise<Response> => {
    const empresas = await getRepository(Empresa).find();
    return res.json(empresas);
}

export const getEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const empresa = await getRepository(Empresa).findOne(req.params.cuit);
    return res.json(empresa);
}

export const createEmpresa = async (req: Request, res: Response): Promise<Response> => {    
    const nuevaEmpresa = await getRepository(Empresa).create(req.body);
    const result = await getRepository(Empresa).save(nuevaEmpresa);
    return res.json(result);
}

export const updateEmpresa = async (req: Request, res: Response): Promise<Response> => {    
    const empresa = await getRepository(Empresa).findOne(req.params.cuit);
        if(empresa !== undefined && empresa) {
            getRepository(Empresa).merge(empresa, req.body);
            const result = await getRepository(Empresa).save(empresa);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Empresa not found' });
}

export const deleteEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Empresa).delete(req.params.cuit);
    return res.json(result);
}