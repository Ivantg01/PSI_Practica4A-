import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "./modelTARDIS.ts";
import DimensionModel from "./modelDimension.ts";
import PlanetaModel from "./modelPlaneta.ts";
import PersonaModel from "./modelPersona.ts";

//obtener todas las Tardis existentes
export const getAllTardis = async (req: Request, res: Response) => {
    try{
        const allTardis= await TardisModel.find()
            .populate({
                path: 'dimensiones', model: 'Dimension',
                populate: {
                    path: 'planetas', model: 'Planeta',
                    populate: {
                        path: 'personas', model: 'Persona'
                    }
                }
            });
        res.send(allTardis);
    }catch (error){
        res.status(500).send(error.message);
    }
    return;
}

//obtener una Tardis por ID
export const getTardisById = async (req: Request, res: Response) => {
    try{
        const allTardis= await TardisModel.findById(req.params.id)
            .populate({
                path: 'dimensiones', model: 'Dimension',
                populate: {
                    path: 'planetas', model: 'Planeta',
                    populate: {
                        path: 'personas', model: 'Persona'
                    }
                }
            });
        res.send(allTardis);
    }catch (error){
        res.status(500).send(error.message);
    }
    return;
}

//obtener una Tardis por Name
export const getTardisByName = async (req: Request, res: Response) => {
    try{
        const allTardis= await TardisModel.find({name: req.params.name})
            .populate({
                path: 'dimensiones', model: 'Dimension',
                populate: {
                    path: 'planetas', model: 'Planeta',
                    populate: {
                        path: 'personas', model: 'Persona'
                    }
                }
            });
        res.send(allTardis);
    }catch (error){
        res.status(500).send(error.message);
    }
    return;
}

//crear una Tardis
export const addTardis = async (req: Request, res: Response) => {
    if(!req.body.name || !req.body.camouflage || !req.body.regNumber || !req.body.year){
        res.status(400).send("Bad request: missing name, camouflage, regNumber or year");
        return;
    }
    try{
        const  tardisFound= await TardisModel.findOne({name: req.body.name}).exec(); // buscamos si existe una TARDIS con el mismo nombre
        if(tardisFound){
            res.status(400).send("Error: TARDIS name already exists");
            return;
        }
        const tardis= new TardisModel(req.body);
        const result= await tardis.save();
        res.send(result);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//crear una Dimension. Necesita el id del Tadis a la que pertenece
export const addDimension = async (req: Request, res: Response) => {
    try{
        const  tardisFound= await TardisModel.findById(req.body.tardisId).exec(); // buscamos si existe una TARDIS
        if(!tardisFound || !req.body.name){
            res.status(400).send("Error: Name or valid tardisId are required");
            return;
        }
        //creamos la dimension
        const dimension= new DimensionModel({name: req.body.name});
        const result= await dimension.save();
        //aÃ±adimos la dimension a la tardis
        tardisFound.dimensiones.push(result._id);
        await tardisFound.save();
        res.status(200).send(result)
    }catch (error){
        res.status(500).send(error.message);
    }
}

//crear un Planeta
export const addPlaneta = async (req: Request, res: Response) => {
    try{
        const  dimensionFound= await DimensionModel.findById(req.body.dimensionId).exec(); // buscamos si existe una Dimension
        if(!dimensionFound || !req.body.name){
            res.status(400).send("Error: Name or valid dimensionId are required");
            return;
        }
        //creamos la dimension
        const planeta= new PlanetaModel({name: req.body.name});
        const result= await planeta.save();
        //aÃ±adimos la dimension a la tardis
        dimensionFound.planetas.push(result._id);
        await dimensionFound.save();
        res.status(200).send(result)
    }catch (error){
        res.status(500).send(error.message);
    }
}

//crear una Persona
export const addPersona = async (req: Request, res: Response) => {
    try{
        const  planetFound= await PlanetaModel.findById(req.body.planetId).exec(); // buscamos si existe una Dimension
        if(!planetFound || !req.body.name){
            res.status(400).send("Error: Name or valid planetId are required");
            return;
        }
        //creamos la dimension
        const persona= new PersonaModel({name: req.body.name});
        const result= await persona.save();
        //aÃ±adimos la dimension a la tardis
        planetFound.personas.push(result._id);
        await planetFound.save();
        res.status(200).send(result)
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Actualizar una Tardis
export const updateTardis = async (req: Request, res: Response) => {
    try{
        const result= await TardisModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Actualizar una Dimension
export const updateDimension = async (req: Request, res: Response) => {
    try{
        const result= await DimensionModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Actualizar un Planeta
export const updatePlaneta = async (req: Request, res: Response) => {
    try{
        const result= await PlanetaModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Actualizar una Persona
export const updatePersona = async (req: Request, res: Response) => {
    try{
        const result= await PersonaModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Borrar una Tardis
export const deleteTardis = async (req: Request, res: Response) => {
    try{
        const tardisFound= await TardisModel.findById(req.params.id).exec();
        if(!tardisFound){
            res.status(404).send("Error: Valid TardisId is required");
            return;
        }
        if(tardisFound.dimensiones.length>0){
            res.status(400).send("Error: Tardis has dimensions. Delete them first");
            return;
        }
        await TardisModel.findByIdAndDelete(req.params.id).exec();
        res.send(tardisFound);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Borrar una Dimension
export const deleteDimension = async (req: Request, res: Response) => {
    try{
        const dimensionFound= await DimensionModel.findById(req.params.id).exec();
        if(!dimensionFound){
            res.status(404).send("Error: Valid DimensionId is required");
            return;
        }
        if(dimensionFound.planetas.length>0){
            res.status(400).send("Error: Dimension has planets. Delete them first");
            return;
        }
        const tardis= await TardisModel.findOne({dimensiones: req.params.id}).exec();
        //borra la relacion de la dimension con la Tardis
        if(tardis) {
            tardis.dimensiones=tardis.dimensiones.filter((dimensionId: string) => dimensionId != req.params.id);
            await tardis.save();
        }
        await DimensionModel.findByIdAndDelete(req.params.id).exec();
        res.send(dimensionFound);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Borrar un Planeta
export const deletePlaneta = async (req: Request, res: Response) => {
    try{
        const planetFound= await PlanetaModel.findById(req.params.id).exec();
        if(!planetFound){
            res.status(404).send("Error: Valid PlanetId is required");
            return;
        }
        if(planetFound.personas.length>0){
            res.status(400).send("Error: Planet has personas. Delete them first");
            return;
        }
        //borramos la relacion del planeta con la dimension
        const dimension= await DimensionModel.findOne({planetas: req.params.id}).exec();
        if(dimension) {
            dimension.planetas = dimension.planetas.filter((planetaId: string) => planetaId != req.params.id);
            await dimension.save();
        }
        await PlanetaModel.findByIdAndDelete(req.params.id).exec();
        res.send(planetFound);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//Borrar una Persona
export const deletePersona = async (req: Request, res: Response) => {
    try{
        const personaFound= await PersonaModel.findById(req.params.id).exec();
        if(!personaFound){
            res.status(404).send("Error: Valid PersonaId is required");
            return;
        }
        const planet= await PlanetaModel.findOne({personas: req.params.id}).exec();
        //borramos la relacion de la persona con planeta
        if(planet){
            planet.personas=planet.personas.filter((personaId: string) => personaId != req.params.id);
            await planet.save()
        }
        await PersonaModel.findByIdAndDelete(req.params.id).exec();
        res.send(personaFound);
    }catch (error){
        res.status(500).send(error.message);
    }
}

//-Inicializamos la base de datos con datos de prueba
export const initDB = async (req: Request, res: Response) => {
    try {
        await PersonaModel.deleteMany({}).exec();
        await PlanetaModel.deleteMany({}).exec();
        await DimensionModel.deleteMany({}).exec();
        await TardisModel.deleteMany({}).exec();

        const peter = await PersonaModel.create({ name: "Peter" });
        const rose = await PersonaModel.create({ name: "Rose" });
        const donna = await PersonaModel.create({ name: "Donna" });
        const martha = await PersonaModel.create({ name: "Martha" });
        const phobos = await PersonaModel.create({ name: "Phobos" });
        const deimos = await PersonaModel.create({ name: "Deimos" });
        const io = await PersonaModel.create({ name: "Io" });
        const europa = await PersonaModel.create({ name: "Europa" });
        const titan = await PersonaModel.create({ name: "Titan" });
        const kirk = await PersonaModel.create({ name: "Kirk" });
        const spock = await PersonaModel.create({ name: "Spock" });
        const scotty = await PersonaModel.create({ name: "Scotty" });

        const earth = await PlanetaModel.create({ name: "Earth", personas: [peter, rose, donna, martha] });
        const mars = await PlanetaModel.create({ name: "Mars", personas: [phobos, deimos] });
        const jupiter = await PlanetaModel.create({ name: "Jupiter", personas: [io, europa] });
        const saturn = await PlanetaModel.create({ name: "Saturn", personas: [titan] });
        const earth2 = await PlanetaModel.create({ name: "Earth 2", personas: [kirk, scotty] });
        const vulcan = await PlanetaModel.create({ name: "Vulcan", personas: [spock] });

        const dimension1 = await DimensionModel.create({ name: "Dimension 1", planetas: [earth, mars, jupiter, saturn] });
        const dimension2 = await DimensionModel.create({ name: "Dimension 2", planetas: [earth2, vulcan] });

        const tardis1 = await TardisModel.create({ camouflage: "Phone Box", regNumber: 1, year: 2003, dimensiones: [dimension1, dimension2] });


        res.status(200).send("Init database ok");

    } catch (e) {
        console.log(e.message);
    }
}