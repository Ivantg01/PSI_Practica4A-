import mongoose from 'npm:mongoose@7.6.3';
import PersonaModel from './modelPersona.ts';

const Schema = mongoose.Schema;

export type Planeta = {
    name: string,
    persona: [Schema.Types.ObjectId],
    id: string,
}

const planetaSchema = new Schema(
    {
        name: String,
        personas: [{type: Schema.Types.ObjectId, ref: 'Persona'}],
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true }
);

export type PlanetaModelType = mongoose.Document & Omit<Planeta, "id">;

export default mongoose.model<PlanetaModelType>("Planeta", planetaSchema);