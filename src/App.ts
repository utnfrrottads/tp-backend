import * as express from 'express';
import { createConnection, Connection } from 'typeorm';

class App {
    public app: express.Application;
    public port: number;
    public connection: Connection; //TypeORM connection to the database

    //The constructor receives an array with instances 
    //of the controllers for the application and an integer to designate the port number.

    constructor(controllers: any[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeModels();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);

    }

    private async initializeModels() {
        const connection = await createConnection();

        // In case the connection failed, the app stops.
        if (connection == undefined) { throw new Error('Error connecting to database'); }  
        connection.synchronize(); // this updates the database schema to match the models' definitions
        this.connection = connection; // Store the connection object in the class instance.

    }

    // Here we can add all the global middlewares for our application. 
    //(Those that will work across every controller)
    private initializeMiddlewares(){
        this.app.use(express.json());

    }

    private initializeControllers(controllers: any[] ) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.route);
        });
    }

    //Boots the application
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default App;