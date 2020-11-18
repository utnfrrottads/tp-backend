import {Request, Response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { Calendario } from '../entity/Calendario'

export const getCalendarios = async (req: Request, res: Response): Promise<Response> => {
        const calendarios = await getRepository(Calendario).find();        
        return res.json(calendarios);

}

export const getCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const calendario = await createQueryBuilder('Calendario')
        .leftJoinAndSelect('Calendario.recorrido', 'Recorrido')
        .leftJoinAndSelect('Calendario.chofer', 'Chofer')
        .where('Calendario.IdCalendario = :IdCalendario', {IdCalendario: req.params.IdCalendario})
        .getOne();
        
        if(calendario !== undefined){
            return res.status(200).json(calendario);

        } else{
            return res.status(204).json({ Message: 'Calendario not found' });

        }        
    } catch (error) {
        console.dir(error);
        return res.status(400).json({ Message: 'Error al obtener el calendario' });

    }
}

export const createCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const calendarioUso = await getRepository(Calendario).find();
        if(calendarioUso.length === 0){
            const calendario = await getRepository(Calendario).create(req.body);
            const result = await getRepository(Calendario).save(calendario);
            return res.status(200).json(result);
        
        } else{
            return res.status(204).send({Message: 'Error al crear el calendario'})

        }
    } catch (error) {
        console.dir(error);
        return res.status(400).json({ message: 'Calendario en uso.'});
    
    }
}

export const updateCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.dir(JSON.stringify(req.param));
        const calendario = await getRepository(Calendario).findOne(req.params.idCalendario);
        console.dir(calendario);
        debugger;
        if(calendario !== undefined) {
            getRepository(Calendario).merge(calendario, req.body);
            const result = await getRepository(Calendario).save(calendario);
            return res.json(result);
        } else{
            return res.status(204).send({ message: 'Calendario no existente' });

        }
    } catch (error) {
        console.dir(error);
        return res.status(400).send({ message: 'Calendario no existente' });

    }    
}

export const deleteCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const calendarioUso = await getRepository(Calendario).findOne(req.params.chofer);
        if(calendarioUso !== undefined && calendarioUso){
            const result = await getRepository(Calendario).delete(req.params.idCalendario);
            return res.status(200).json(result);
        
        } else{
            return res.status(204).json({ message: 'No se pudo eliminar el Calendario en uso.' });        
        
        }
    } catch (error) {
        return res.status(400).json({ message: 'No se pudo eliminar el Calendario en uso.' });

    }    
}