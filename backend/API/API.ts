import express, { Express } from "express";
import cors from "cors";

let server: Express = express();
const serverPort = 2000;

server.use(cors());

server.listen(serverPort, () =>
{
    console.log("Server started on port " + serverPort + ".");
});


