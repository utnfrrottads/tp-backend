import {Request, Response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { LineaColectivo } from '../entity/LineaColectivo'

export const getLineaColectivos = async (req: Request, res: Response): Promise<Response> => {
    const lineasCol = await getRepository(LineaColectivo).find();
    return res.json(lineasCol);

}

export const getLineaColectivo = async (req: Request, res: Response): Promise<Response> => {  
    debugger;  
    const lineaCol = await getRepository(LineaColectivo).findOne(req.params.id);
    const lineaColEmpresa = await createQueryBuilder("LineaColectivo")    
    .leftJoinAndSelect("LineaColectivo.empresa", "Empresa")
    .where("LineaColectivo.idLineaColectivo = :idLineaColectivo", {idLineaColectivo : req.params.id})
    .getOne();
    return res.json(lineaColEmpresa);

}

export const createLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    debugger;
    const lineaCol = await getRepository(LineaColectivo).create(req.body);
    const result = await getRepository(LineaColectivo).save(lineaCol);
    return res.json(result);

}

export const updateLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    try {        
        const lineaCol = await getRepository(LineaColectivo).findOne(req.params.idLineaColectivo);    
        if(lineaCol !== undefined && lineaCol) {
            getRepository(LineaColectivo).merge(lineaCol, req.body);
            const result = await getRepository(LineaColectivo).save(lineaCol);
            return res.json(result);
        }
    
    return res.status(404).send({ message: 'Linea Colectivo not found' });
    } catch (error) {
        return res.status(404).send({ message: error });

    }   

}

export const deleteLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const result = await getRepository(LineaColectivo).delete(req.params.id);
        return res.status(200).json({ msj: result });

    } catch (error) {
        return res.status(200).json({ msj: error });

    }
    

}