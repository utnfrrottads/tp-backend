import {Request, Response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { LineaColectivo } from '../entity/LineaColectivo'

export const getLineaColectivos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const lineasCol = await getRepository(LineaColectivo).find();
        if(lineasCol && lineasCol !== undefined){            
            return res.status(200).json(lineasCol);
        } else{
            return res.status(204).send({ Message: 'Linea de colectivo not found' });
        }        

    } catch (error) {
        return res.status(400).send({ Message: 'Hubo un error al obtener las lineas de colectivos' });
    }
}

export const getLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const lineaColEmpresa = await createQueryBuilder('LineaColectivo')
        .leftJoinAndSelect('LineaColectivo.empresa', 'Empresa')
        .where('LineaColectivo.idLineaColectivo = :idLineaColectivo', {idLineaColectivo : req.params.id})
        .getOne();

    if(lineaColEmpresa != undefined && lineaColEmpresa){
        return res.status(200).json(lineaColEmpresa);
        
    }else{
        return res.status(204).send({ Message: 'Linea de colectivo not found' });

    }

    } catch (error) {
        return res.status(400).json({ Message: 'No existe o no se pudo obtener la Linea de colectivo'});

    }
}

export const createLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const lineaCol = await getRepository(LineaColectivo).create(req.body);
        const lineaC = await getRepository(LineaColectivo).save(lineaCol);
        if(lineaC !== undefined && lineaC){
            return res.status(204).json(lineaC);

        } else{
            return res.status(204).send({ Message: 'errro al crear la linea de colectivo' });
        }
    
    } catch (error) {
        return res.status(404).send({ Message : error.message});
    
    }    
}

export const updateLineaColectivo = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const lineaCol = await getRepository(LineaColectivo).findOne(req.params.idLineaColectivo);    
        if(lineaCol !== undefined && lineaCol) {
            getRepository(LineaColectivo).merge(lineaCol, req.body);
            const result = await getRepository(LineaColectivo).save(lineaCol);
            return res.json(result);
        } else{
            return res.status(404).send({ Message: 'Linea Colectivo not found' });

        }            
    } catch (error) {
        return res.status(404).send({ Message: error.message });

    }
}

export const deleteLineaColectivo = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const result = await getRepository(LineaColectivo).delete(req.params.id);
        if(result !== undefined && result){
            return res.status(200).json({ Message: result });

        } else{
            return res.status(200).json({ Message: result });

        }
    } catch (error) {
        return res.status(200).json({ msj: error });

    }
}