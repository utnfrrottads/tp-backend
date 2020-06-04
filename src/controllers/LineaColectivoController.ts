import * as express from 'express';
import * as typeorm from 'typeorm';
import { LineaColectivo } from '../models/LineaColectivo';
import { timingSafeEqual } from 'crypto';

class LineaColectivoController{
    public path = './lineaColectivo';
    public router: express.Router = express.Router();
    private lineaColectivoRepository = typeorm.getRepository(LineaColectivo);

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        // UserController middleware
        this.router.use(this.validateInput);

        //Controller ennpoints
        // this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.CreateLineaColectivo);
        this.router.get(this.path, this.GetAllLineaColectivos);
        this.router.get(this.path + '/:id', this.GetLineaColectivo);

        this.router.put(this.path + '/:id', this.UpdateLineaColectivo);

        this.router.delete(this.path + '/:id', this.DeleteLineaColectivo);
    }

    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction){
        const params = {id: req.url.split('/')[2]};
        switch(req.method){
            case 'GET':
                break;

            case 'DELETE':
                if(!params.id){return res.status(400).send({message: 'id is requered'});}
                break;
            
            case 'POST':
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can`t be empty'}); }
                break;

            case 'PUT':
                if(!params.id) {return res.status(400).send({ message: 'id is required'}); }
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can´t be empty'}); }
                break;

        }
    }

    public async CreateLineaColectivo(req: express.Request, res: express.Response) {
        const choferData = req.body;
        const chofer = new LineaColectivo();
        chofer.idLineaColectivo = choferData.Cuil;
        chofer.empresa = choferData.Nombre;
        chofer.nombre = choferData.Apellido;
        chofer.latitud = choferData.Telefono;
        chofer.longitud = choferData.Localidad;             

        return res.send(chofer);
    }

    public async GetAllLineaColectivos(req: express.Request, res: express.Response){
        const choferes = await this.lineaColectivoRepository.find();
        return res.send(choferes);

    }

    public async GetLineaColectivo(req: express.Request, res: express.Response){
        const lineaColectivo = await this.lineaColectivoRepository.findOne(req.params.id);
        return res.send(lineaColectivo);
        
    }

    public async UpdateLineaColectivo(req: express.Request, res: express.Response){
        const lineaColectivo = this.lineaColectivoRepository.findOne(req.params.id);
        if(lineaColectivo !== undefined){
            await this.lineaColectivoRepository.update(req.params.id, req.body);
            return res.status(200).send({ message: 'Linea de colectivo actualizada correctamente' })
        }

        return res.status(400).send({ message: 'Linea de colectivo no encontrada' });
    }

    public async DeleteLineaColectivo(req: express.Request, res: express.Response){
        this.lineaColectivoRepository.delete(req.params.id);
        return res.status(200).send({message : 'Linea de colectivo eliminada de forma exitosa'});

    }    
}

export default LineaColectivoController;
