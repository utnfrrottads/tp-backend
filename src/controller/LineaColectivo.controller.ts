import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { LineaColectivo } from '../entity/LineaColectivo'

export const getLineaColectivos = async (req: Request, res: Response): Promise<Response> => {
    const lineasCol = await getRepository(LineaColectivo).find();
    return res.json(lineasCol);
}

export const getLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    const lineaCol = await getRepository(LineaColectivo).findOne(req.params.id);
    return res.json(lineaCol);
}

export const createLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    const lineaCol = await getRepository(LineaColectivo).create(req.body);
    const result = await getRepository(LineaColectivo).save(lineaCol);
    return res.json(result);
}

export const updateLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    const lineaCol = await getRepository(LineaColectivo).findOne(req.params.id);
        if(lineaCol !== undefined && lineaCol) {
            getRepository(LineaColectivo).merge(lineaCol, req.body);
            const result = await getRepository(LineaColectivo).save(LineaColectivo);
            return res.json(result);
        }
        
        return res.status(404).send({ message: 'Linea Colectivo not found' });
}

export const deleteLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(LineaColectivo).delete(req.params.id);
    return res.json(result);
}