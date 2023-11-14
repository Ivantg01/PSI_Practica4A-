import mongoose from 'npm:mongoose@7.6.3';

const Schema = mongoose.Schema;

type Persona = {
    name: string,
    id: string,
}

const personaSchema = new Schema<Persona>(
    {
        name: String,
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true }
);

export type PersonaModelType = mongoose.Document & Omit<Persona, "id">;

export default mongoose.model<PersonaModelType>("Persona", personaSchema);