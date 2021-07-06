import {Request, Response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { Recorrido } from '../entity/Recorrido'

export const getRecorridos = async (req: Request, res: Response): Promise<Response> => {
    const recorridos = await getRepository(Recorrido).find();
    return res.json(recorridos);

}

export const getRecorrido = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const recorrido = await createQueryBuilder("Recorrido")
                            .leftJoinAndSelect('Recorrido.lineaColectivo', 'LineaColectivo')
                            .where("Recorrido.IdRecorrido = :IdRecorrido", {IdRecorrido: req.params.IdRecorrido})
                            .getMany();                            
                            if(recorrido){
                                return res.status(200).json(recorrido);

                            } else{
                                return res.status(204).send({ Messsage: 'Recorrido not found' });

                            }
    } catch (error) {
        console.log('Error :' + error);
        return res.status(400).send({ Messsage: 'Error al obtener el recorrido' });

    }    
}

export const createRecorrido = async (req: Request, res: Response): Promise<Response> => {
    try {
        const nuevoRecorrido = await getRepository(Recorrido).find();
        if (nuevoRecorrido !== undefined && nuevoRecorrido) {
            const recorrido = await getRepository(Recorrido).create(req.body);
            const reco = await getRepository(Recorrido).save(recorrido);
            return res.status(200).json(reco);

        } else {
            return res.status(204).send(nuevoRecorrido);
            
        }
    } catch (error) {
        console.log('Error :' + error);
        return res.status(400).send({ msj: 'Error al crear el recorrido'});

    }
}

export const updateRecorrido = async (req: Request, res: Response): Promise<Response> => {
    try {
        const recorrido = await getRepository(Recorrido).findOne(req.params.IdRecorrido);
        if(recorrido !== undefined && recorrido){
            getRepository(Recorrido).merge(recorrido, req.body);
            const result = await getRepository(Recorrido).save(recorrido);
            return res.json(result);
        } else{
            return res.status(204).send({Message: 'Recorrido not found'});
        
        }        
    
    } catch (error) {
        console.log('Error :' + error);
        return res.status(404).send({ Message: 'Error al actualizar el recorrido' });

    }
}

export const deleteRecorrido = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Recorrido).delete(req.params.IdRecorrido);
        return res.status(200).json(result);
    
    } catch (error) {
        console.log('Error :' + error);
        return res.status(400).send({ Message: 'Error al eliminar el recorrido' });
    }
}