import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Parada } from '../entity/Parada'

export const getParadas = async (req: Request, res: Response): Promise<Response> => {
    const paradas = await getRepository(Parada).find();
    return res.json(paradas);
}

export const getParada = async (req: Request, res: Response): Promise<Response> => {
    const parada = await getRepository(Parada).findOne(req.params.nroParada);
    return res.json(parada);
}

export const createParada = async (req: Request, res: Response): Promise<Response> => {    
    const parada = await getRepository(Parada).create(req.body);
    const result = await getRepository(Parada).save(parada);
    return res.json(result);
}

export const updateParada = async (req: Request, res: Response): Promise<Response> => {    
    const parada = await getRepository(Parada).findOne(req.params.nroParada);
        if(parada !== undefined && parada) {
            getRepository(Parada).merge(parada, req.body);
            const result = await getRepository(Parada).save(parada);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Parada not found' });
}

export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Parada).delete(req.params.nroParada);
    return res.json(result);
}