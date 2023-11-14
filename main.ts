//Practica 4A - Spin me like a record

//cargamos el fichero de entorno .env con la URI de la base de datos
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const DB_URI = env["DB_URI"] || Deno.env.get("DB_URI") || "mongodb://localhost:27017/pr4"

//conexion con la base de datos
//import mongoose from "npm:mongoose@^6.7";
import mongoose from "npm:mongoose@7.6.3";
try {
    console.log("Database: connecting... ", DB_URI);
    const db = await mongoose.connect(DB_URI);
    console.log("Database: connected", db.connection.name);
} catch (error) {
    console.log("Database: error: ", error);
}


//inicialiamos aplicacion web
import express, { Request, Response } from "npm:express@4.18.2";
const app = express();
app.use(express.json());  //habilitamos el uso de json

//importamos las funciones llamadas por cada peticion get, post, put y delete
import {getAllTardis,getTardisById, getTardisByName,
    addTardis, addDimension, addPlaneta, addPersona, initDB,
    updateTardis,updateDimension, updatePlaneta, updatePersona,
    deleteTardis, deleteDimension, deletePlaneta, deletePersona} from "./resolvers.ts";
//registramos en express las llamadas web
app
    //Llamadas GET ->
    .get("/", (req: Request, res: Response) => {
        res.status(200).send("API REST for management of TARDIS!");
    })
    //obtenemos todas las tardis
    .get("/tardis/", getAllTardis)
    //obtenemos una tardis por su id
    .get("/tardis/:id", getTardisById)
    //obtenemos una tardis por su nombre
    .get("/tardis/name/:name", getTardisByName)
    //creamos una tardis
    .post("/tardis/", addTardis)
    //creamos una dimension
    .post("/tardis/dimension/", addDimension)
    //creamos un planeta
    .post("/tardis/planeta", addPlaneta)
    //creamos una persona
    .post("/tardis/persona", addPersona)
    //actualizamos una tardis
    .put("/tardis/:id",updateTardis)
    //actualizamos una dismension
    .put("/tardis/dimension/:id",updateDimension)
    //actualizamos un planeta
    .put("/tardis/planeta/:id",updatePlaneta)
    //actualizamos una persona
    .put("/tardis/persona/:id",updatePersona)
    //borramos una tardis mediante su id
    .delete("/tardis/:id", deleteTardis)
    //borramos una dimension mediante su id
    .delete("/tardis/dimension/:id", deleteDimension)
    //borramos un planeta mediante su id
    .delete("/tardis/planeta/:id", deletePlaneta)
    //borramos una persona mediante su id
    .delete("/tardis/persona/:id", deletePersona)
    //Eliminar la base de datos y añadir datos de ejemplo
    .get("/initDB/", initDB)
    ;


app.listen(3000, () => {
    console.log("Server started on port 3000");
});