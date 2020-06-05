import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Chofer } from '../entity/Chofer'

export const getChoferes = async (req: Request, res: Response): Promise<Response> => {
    const choferes = await getRepository(Chofer).find();
    return res.json(choferes);
}

export const getChofer = async (req: Request, res: Response): Promise<Response> => {
    const chofer = await getRepository(Chofer).findOne(req.params.cuil);
    return res.json(chofer);
}

export const createChofer = async (req: Request, res: Response): Promise<Response> => {    
    const chofer = await getRepository(Chofer).create(req.body);
    const result = await getRepository(Chofer).save(chofer);
    return res.json(result);
}

export const updateChofer = async (req: Request, res: Response): Promise<Response> => {    
    const chofer = await getRepository(Chofer).findOne(req.params.cuil);
        if(chofer !== undefined && chofer) {
            getRepository(Chofer).merge(chofer, req.body);
            const result = await getRepository(Chofer).save(Chofer);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Chofer not found' });
}

export const deleteChofer = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Chofer).delete(req.params.cuil);
    return res.json(result);
}