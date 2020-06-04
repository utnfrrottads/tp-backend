import * as express from 'express';
import * as typeorm from 'typeorm';
import { Empresa } from '../models/Empresa';

class EmpresaController {
    public path = '/empresa';
    public router: express.Router = express.Router();
    private empresaRepository = typeorm.getRepository(Empresa);

    constructor() {
        this.initializeRoutes();

    }

    public initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);

        //Controller ennpoints
        // this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.createEmpresa);
        this.router.get(this.path, this.getAllEmpresas);
        this.router.get(this.path + '/:cuit', this.getEmpresa);

        this.router.put(this.path + '/:cuit', this.updateEmpresa);

        this.router.delete(this.path + '/:cuit', this.deleteEmpresa);
    }
    
    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction){
        const params = {cuit: req.url.split('/')[2]};
        switch(req.method) {
            case 'GET':
                break;

            case 'DELETE':
                if(!params.cuit) {return res.status(400).send({ message: 'cuit is requered' }); }
                break;

            case 'POST':
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can`t be empty'}); }
                break;
            
            case 'PUT':
                if(!params.cuit) {return res.status(400).send({ message: 'cuit is required'}); }
                if(Object.keys(req.body).length === 0) { return res.status(400).send({ message: 'Request body can´t be empty'}); }
                break;

        }
        next();
    }

    public async createEmpresa(req: express.Request, res: express.Response) {
        const empresaData = req.body;
        const empresa = new Empresa();
        empresa.Domicilio = empresaData.domicilio;
        empresa.Email = empresaData.email;
        empresa.Localidad = empresaData.localidad;
        empresa.Provincia = empresaData.provincia;
        empresa.RazonSocial = empresaData.razonSocial;
        empresa.Telefono = empresaData.telefono;
        this.empresaRepository.save(empresa);

        return res.send(empresa);
    }

    public async getAllEmpresas (req: express.Request, res: express.Response) {
        const empresas = await this.empresaRepository.find();
        return res.send(empresas);

    }

    public async getEmpresa(req: express.Request, res: express.Response) {
        const empresa = await this.empresaRepository.findOne(req.params.cuit);
        return res.send(empresa);

    }

    public async updateEmpresa(req: express.Request, res: express.Response) {
        const empresa = await this.empresaRepository.findOne(req.params.cuit);
        if(empresa !== undefined) {
            await this.empresaRepository.update(req.params.cuit, req.body);
            return res.status(200).send({ message: 'Empresa updated correctly' });
        }
        
        return res.status(400).send({ message: 'Empresa not found' });
    }

    public async deleteEmpresa(req: express.Request, res: express.Response) {
        this.empresaRepository.delete(req.params.cuit);
        return res.status(200).send({ message: 'Empresa delete successfully'});

    }
}

export default EmpresaController;