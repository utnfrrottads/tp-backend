import dotenv from "dotenv";
import AppInitializer from "./AppInitializer";

dotenv.config();
const appInitializer = new AppInitializer();
appInitializer.init();
