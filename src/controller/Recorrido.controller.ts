import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Recorrido } from '../entity/Recorrido'

export const getRecorridos = async (req: Request, res: Response): Promise<Response> => {
    const recorridos = await getRepository(Recorrido).find();
    return res.json(recorridos);
}

export const getParada = async (req: Request, res: Response): Promise<Response> => {
    const recorrido = await getRepository(Recorrido).findOne(req.params.nroParada);
    return res.json(recorrido);
}

export const createParada = async (req: Request, res: Response): Promise<Response> => {    
    const recorrido = await getRepository(Recorrido).create(req.body);
    const result = await getRepository(Recorrido).save(recorrido);
    return res.json(result);
}

export const updateParada = async (req: Request, res: Response): Promise<Response> => {    
    const recorrido = await getRepository(Recorrido).findOne(req.params.nroParada);
        if(recorrido !== undefined && recorrido) {
            getRepository(Recorrido).merge(recorrido, req.body);
            const result = await getRepository(Recorrido).save(recorrido);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Parada not found' });
}

export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Recorrido).delete(req.params.nroParada);
    return res.json(result);
}