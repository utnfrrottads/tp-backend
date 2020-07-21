import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Chofer } from '../entity/Chofer'

export const getChoferes = async (req: Request, res: Response): Promise<Response> => {
    const choferes = await getRepository(Chofer).find();
    return res.json(choferes);
}

export const getChofer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const chofer = await getRepository(Chofer).findOne(req.params.cuil);
        if(chofer !== undefined && chofer){
            return res.status(200).json(chofer);

        } else {
            return res.status(204).send({ Message: 'Chofer not found'});

        }

    } catch (error) {
        return res.status(400).send({ Message: 'Error al obtener el chofer'});

    }
}

export const createChofer = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const chofer = await getRepository(Chofer).create(req.body);
        if(chofer === undefined){
            const result = await getRepository(Chofer).save(chofer);
            return res.json(result);

        } else{
            return res.status(204).send({ Message: 'El chofer existe' });

        }

    } catch (error) {
        return res.status(400).send({ Message: 'Error al crear el chofer' });
    }
    
}

export const updateChofer = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const chofer = await getRepository(Chofer).findOne(req.params.cuil);
        if(chofer !== undefined) {
            getRepository(Chofer).merge(chofer, req.body);
            const result = await getRepository(Chofer).save(Chofer);
            return res.json(result);
        }else{
            return res.status(204).send({ message: 'Chofer not found' });
        }
    
    } catch (error) {
        return res.status(400).send({ message: 'Chofer not found' });
    }    
}

export const deleteChofer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Chofer).delete(req.params.cuil);
        if(result){
            return res.status(200).json(result);
        } else{
            return res.status(204).json(result);
        }
    
    } catch (error) {
        return res.status(400).json({ Message: 'Hubo un error al elimiar el chofer' });

    }
    
}