import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Empresa } from '../entity/Empresa'

export const getEmpresas = async (req: Request, res: Response): Promise<Response> => {
    const empresas = await getRepository(Empresa).find();
    return res.json(empresas);

}

export const getEmpresa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.params.cuit);        
        if (empresa !== undefined) {
            return res.status(200).json(empresa);
        } else {
            return res.status(204).send({ Message: 'Empresa not found' });

        }

    } catch (error) {
        return res.status(400).json(error);
    }
}

export const createEmpresa = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const empresa = await getRepository(Empresa).findOne(req.body.Cuit);
        if(empresa !== undefined)
        {
            return res.status(302).send({ Message: 'Empresa already exists' });
        }
        const nuevaEmpresa = await getRepository(Empresa).create(req.body);
        const empre = await getRepository(Empresa).save(nuevaEmpresa);
        if (empre !== undefined && empre) {
            return res.status(200).json(empre);
        } else {
            return res.status(204).send(empre);
        }

    } catch (error) {
        return res.status(400).send({ Message: 'Error al crear la empresa' });

    }

}

export const updateEmpresa = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const empresa = await getRepository(Empresa).findOne(req.body.Cuit);        
        if (empresa !== undefined && empresa) {
            getRepository(Empresa).merge(empresa, req.body);
            const result = await getRepository(Empresa).save(empresa);
            return res.json(result);
        } else {
            return res.status(204).send({ message: 'Empresa not found' });
        }

    } catch (error) {
        return res.status(400).send({ message: 'Error al actualizar la empresa' });

    }

}

export const deleteEmpresa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Empresa).delete(req.params.cuit);
        if(result !== undefined && result){
            return res.status(200).json(result);
        } else{
            return res.status(204).send({Message : 'Empresa not found'});
        }

    } catch (error) {
        return res.status(400).send({Message: 'Error al eliminar la empresa'});
    }

}