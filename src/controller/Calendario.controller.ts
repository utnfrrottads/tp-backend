import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Calendario } from '../entity/Calendario'

export const getCalendario = async (req: Request, res: Response): Promise<Response> => {
    const paradas = await getRepository(Calendario).find();
    return res.json(paradas);
}

export const getParada = async (req: Request, res: Response): Promise<Response> => {
    const parada = await getRepository(Calendario).findOne(req.params.idCalendario);
    return res.json(parada);
}

export const createParada = async (req: Request, res: Response): Promise<Response> => {    
    const parada = await getRepository(Calendario).create(req.body);
    const result = await getRepository(Calendario).save(parada);
    return res.json(result);
}

export const updateParada = async (req: Request, res: Response): Promise<Response> => {    
    const calendario = await getRepository(Calendario).findOne(req.params.idCalendario);
        if(calendario !== undefined && calendario) {
            getRepository(Calendario).merge(calendario, req.body);
            const result = await getRepository(Calendario).save(calendario);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Calendario not found' });
}

export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Calendario).delete(req.params.idCalendario);
    return res.json(result);
}