import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Parada } from '../entity/Parada'

export const getParadas = async (req: Request, res: Response): Promise<Response> => {
    const paradas = await getRepository(Parada).find();
    return res.json(paradas);
}

export const getParada = async (req: Request, res: Response): Promise<Response> => {
    try {
        const parada = await getRepository(Parada).findOne(req.params.nroParada);
        if(parada !== undefined){
            return res.status(200).json(parada);
        } else{
            return res.status(204).send({ Message: 'Parada de colectivo not found' });
        }
        
        } catch (error) {
            return res.status(400).send({ Message: 'Error al obtener la parada de colectivo' });
    }
}

export const createParada = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const parada = await getRepository(Parada).create(req.body);
        if(parada !== undefined){
            const result = await getRepository(Parada).save(parada);
            return res.status(200).json(result);
        } else{
            return res.status(204).send({ Message: 'Parada de colectivo existente' });
        }
    
    } catch (error) {
        return res.status(400).send({ Message: 'Error al crear la parada de colectivo' });
    }
}

export const updateParada = async (req: Request, res: Response): Promise<Response> => {
    try {
        const parada = await getRepository(Parada).findOne(req.params.nroParada);
        if(parada !== undefined) {
            getRepository(Parada).merge(parada, req.body);
            const result = await getRepository(Parada).save(parada);
            return res.status(200).json(result);

        } else{
            return res.status(204).send({ Message: 'Parada de colectivo not found' });

        }
    } catch (error) {
        return res.status(404).send({ message: 'Error al actualizar la Parada de colectivo' });
    }
}

export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Parada).delete(req.params.nroParada);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).send({ Message: 'Error al eliminar la parada de colectivo' });
    
    }
}