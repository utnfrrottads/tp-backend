import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Recorrido } from '../entity/Recorrido'

export const getRecorridos = async (req: Request, res: Response): Promise<Response> => {
    const recorridos = await getRepository(Recorrido).find();
    return res.json(recorridos);
}

export const getRecorrido = async (req: Request, res: Response): Promise<Response> => {
    const recorrido = await getRepository(Recorrido).findOne(req.params.nroParada);

    const recorridos = await getRepository(Recorrido)
                            .createQueryBuilder("Recorrido")
                            .where("Recorrido.lineaColectivo = :linea", {lineaColectivo: req.params.lineaColectivo})
                            .getMany();

    return res.json(recorrido);
}

export const createRecorrido = async (req: Request, res: Response): Promise<Response> => {    
    const recorrido = await getRepository(Recorrido).findOne(req.params.nroParada);
    if(recorrido !== undefined && recorrido){
        const result = await getRepository(Recorrido).save(recorrido);
        return res.json(result);
    }    
    
    return res.json({ msj: 'No se pueden duplicar los recorridos, por favor verifique.'});
}

export const updateRecorrido = async (req: Request, res: Response): Promise<Response> => {    
    const recorrido = await getRepository(Recorrido).findOne(req.params.nroParada);
        if(recorrido !== undefined && recorrido){
            getRepository(Recorrido).merge(recorrido, req.body);
            const result = await getRepository(Recorrido).save(recorrido);
            return res.json(result);
        }
        
    return res.status(404).send({ message: 'Recorrido no existe' });
}

export const deleteRecorrido = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Recorrido).delete(req.params.nroParada);
    return res.json(result);
    
}