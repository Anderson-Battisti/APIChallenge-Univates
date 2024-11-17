import express, { Express } from "express";
import cors from "cors";
import { productRoute } from "../routes/productRoute";

let server: Express = express();
const serverPort = 2000;

server.use(cors());
server.use(express.json());
server.use(productRoute);


server.listen(serverPort, () =>
{
    console.log("Server started on port " + serverPort + ".");
});


