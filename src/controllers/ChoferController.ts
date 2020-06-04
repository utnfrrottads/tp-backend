import * as express from 'express';
import * as typeorm from 'typeorm';
import { Chofer } from '../models/Chofer';

class ChoferController{
    public path = './chofer';
    public router: express.Router = express.Router();
    private choferRepository = typeorm.getRepository(Chofer);

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);

        //Controller ennpoints
        // this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.CreateChofer);
        this.router.get(this.path, this.GetAllChoferes);
        this.router.get(this.path + '/:cuil', this.GetChofer);

        this.router.put(this.path + '/:cuil', this.UpdateChofer);

        this.router.delete(this.path + '/:cuil', this.DeleteChofer);
    }

    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction){
        const params = {cuil: req.url.split('/')[2]};
        switch(req.method){
            case 'GET':
                break;

            case 'DELETE':
                if(!params.cuil){return res.status(400).send({message: 'cuil is requered'});}
                break;
            
            case 'POST':
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can`t be empty'}); }
                break;

            case 'PUT':
                if(!params.cuil) {return res.status(400).send({ message: 'cuit is required'}); }
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can´t be empty'}); }
                break;

        }
    }

    public async CreateChofer(req: express.Request, res: express.Response) {
        const choferData = req.body;
        const chofer = new Chofer();
        chofer.Cuil = choferData.Cuil;
        chofer.Nombre = choferData.Nombre;
        chofer.Apellido = choferData.Apellido;
        chofer.Telefono = choferData.Telefono;
        chofer.Localidad = choferData.Localidad;
        chofer.Provincia = choferData.Provincia;
        chofer.Email = choferData.Email;
        chofer.lineaColectivo = choferData.lineaColectivo;
        this.choferRepository.save(chofer);

        return res.send(chofer);
    }

    public async GetAllChoferes (req: express.Request, res: express.Response){
        const choferes = await this.choferRepository.find();
        return res.send(choferes);

    }

    public async GetChofer(req: express.Request, res: express.Response){
        const chofer = await this.choferRepository.find(req.body.Cuil);
        return res.send(chofer);
    }

    public async UpdateChofer(req: express.Request, res: express.Response){
        const chofer = await this.choferRepository.findOne(req.params.Cuil);
        if(chofer !== undefined){
            await this.choferRepository.update(req.params.Cuil, req.body);
            return res.status(200).send({ message: 'Chofer actualizada correctamente' });
        }

        return res.status(400).send({ message: 'Chofer not found' })
    }

    public async DeleteChofer(req: express.Request, res: express.Response){
        this.choferRepository.delete(req.params.Cuil);
        return res.status(200).send({ message: 'Chofer delete successfully' });
    }
}

export default ChoferController;

