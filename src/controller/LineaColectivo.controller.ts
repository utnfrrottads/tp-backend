import {Request, Response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { LineaColectivo } from '../entity/LineaColectivo'

export const getLineaColectivos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const lineasCol = await getRepository(LineaColectivo).find();
        if(lineasCol && lineasCol !== undefined){
            return res.status(200).json(lineasCol);
        } else{
            return res.status(400).json({ Message: 'Linea de colectivo not found' });
        }        

    } catch (error) {
        return res.status(400).json({ Message: error.message });
    }
}

export const getLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    try {
        // const lineaCol = await getRepository(LineaColectivo).findOne(req.params.id);
        const lineaColEmpresa = await createQueryBuilder("LineaColectivo")
        .leftJoinAndSelect("LineaColectivo.empresa", "Empresa")
        .where("LineaColectivo.idLineaColectivo = :idLineaColectivo", {idLineaColectivo : req.params.id})
        .getOne();

    if(lineaColEmpresa != undefined && lineaColEmpresa){
        return res.status(200).json(lineaColEmpresa);
        
    }else{
        return res.status(400).json({ Message: 'Linea de colectivo not found' });
    }

    } catch (error) {
        return res.status(400).json({ Message: error.message});
    }
}

export const createLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const lineaCol = await getRepository(LineaColectivo).create(req.body);
        const result = await getRepository(LineaColectivo).save(lineaCol);
        
        return res.status(200).json(result);
    
    } catch (error) {
        res.status(404).json({ message : error.message});

    }
    return res.status(400).json({ Message: 'Error al crear la linea de colectivo' });    
}

export const updateLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const lineaCol = await getRepository(LineaColectivo).findOne(req.params.idLineaColectivo);    
        if(lineaCol !== undefined && lineaCol) {
            getRepository(LineaColectivo).merge(lineaCol, req.body);
            const result = await getRepository(LineaColectivo).save(lineaCol);
            return res.json(result);
        } else{
            return res.status(404).send({ message: 'Linea Colectivo not found' });
        }
    
    } catch (error) {
        return res.status(404).send({ message: error.message });

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