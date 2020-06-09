import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Calendario } from '../entity/Calendario'

export const getCalendarios = async (req: Request, res: Response): Promise<Response> => {
    const calendarios = await getRepository(Calendario).find();
    return res.json(calendarios);
}

export const getCalendario = async (req: Request, res: Response): Promise<Response> => {
    const calendario = await getRepository(Calendario).findOne(req.params.chofer);
    return res.json(calendario);
}

export const createCalendario = async (req: Request, res: Response): Promise<Response> => {    
    const calendarioUso = await getRepository(Calendario).create(req.body);
    if(calendarioUso === null){
        const result = await getRepository(Calendario).save(calendarioUso);
        return res.json(result);
    }
    
    return res.status(412).json({ message: 'Calendario en uso.'});
}

export const updateCalendario = async (req: Request, res: Response): Promise<Response> => {    
    const calendario = await getRepository(Calendario).findOne(req.params.idCalendario);
        if(calendario !== undefined && calendario) {
            getRepository(Calendario).merge(calendario, req.body);
            const result = await getRepository(Calendario).save(calendario);
            return res.json(result);
        }
        
    return res.status(404).send({ message: 'Calendario no existente' });
}

export const deleteCalendario = async (req: Request, res: Response): Promise<Response> => {
    const calendarioUso = await getRepository(Calendario).findOne(req.params.chofer);
    if(calendarioUso !== undefined && calendarioUso){
        const result = await getRepository(Calendario).delete(req.params.idCalendario);
        return res.json(result);
    }

    return res.status(412).json({ message: 'No se puede eliminar el Calendario en uso.' });    
}