import {Request, Response, response} from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import { Chofer } from '../entity/Chofer'
import { nextTick } from 'process';

export const getChoferes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const choferes = await getRepository(Chofer).find();
        return res.json(choferes);

    } catch (error) {
        return res.status(400).json({ Message: 'Ocurrio un error al obtener los choferes'});

    }    
}

export const getChofer = async (req: Request, res: Response): Promise<Response> => {
    //.leftJoinAndSelect('Chofer.lineaColectivo", "LineaColectivo')
    try {        
        const chofer = await createQueryBuilder('Chofer')
        .leftJoinAndSelect('Chofer.lineaColectivo', 'LineaColectivo')
        .where('Chofer.Cuil = :Cuil', {Cuil: req.params.cuil})
        .getOne();

        if(chofer !== undefined && chofer){
            return res.json(chofer);

        } else {
            return res.json({ Message: 'Chofer not found'});

        }

    } catch (error) {
        return res.status(400).json({ Message: 'Error al obtener el chofer'});

    }
}

export const createChofer = async (req: Request, res: Response): Promise<Response> => {    
    
    try {
        
        const chofer = await getRepository(Chofer).findOne(req.body.Cuil);
        
        if(chofer === undefined){
            const chof = await getRepository(Chofer).create(req.body);            
            const result = await getRepository(Chofer).save(chof);
            return res.json(result);

        } else {            
        return res.status(404).json({ Message: 'El chofer existe' });

    }

    } catch (error) {
        return res.status(400).json({ Message: 'Error al crear el chofer'});
    }
    
}

export const updateChofer = async (req: Request, res: Response): Promise<Response> => {    
    try {
        
        const chofer = await getRepository(Chofer).findOne(req.params.Cuil);
        
        if(chofer !== undefined && chofer) {
            getRepository(Chofer).merge(chofer, req.body);            
            const result = await getRepository(Chofer).save(chofer);
            return res.json(result);

        } else{
            return res.json({ Message: 'Chofer not found' });

        }
    
    } catch (error) {
        return res.status(400).json({ Message: 'Chofer not found' });

    }    
}

export const deleteChofer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Chofer).delete(req.params.cuil);        

        if(result !== undefined){
            return res.json(result);

        } else{
            return res.json({ Message: 'Hubo un error al elimiar el chofer' });

        }    
    } catch (error) {
        return res.json({ Message: 'Hubo un error al elimiar el chofer' });

    }
}