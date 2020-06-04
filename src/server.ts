import App from './App';

import EmpresaController from './controllers/EmpresaController';
import ChoferController from './controllers/ChoferController';

const controllers = [new EmpresaController(), new ChoferController()];
const app = new App(controllers, 3000);

app.listen();

export default app;