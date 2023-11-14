import mongoose from 'npm:mongoose@7.6.3';
import Dimension from './modelDimension.ts';
import TardiSchema from "./modelTARDIS.ts";

const Schema = mongoose.Schema;

type Tardis = {
    name: string,
    camouflage: string,
    regNumber: number,
    year: number,
    dimensiones: [Schema.Types.ObjectId],
    id: string,
}

const TardisSchema = new Schema(
    {
        name: String,
        camouflage: String,
        regNumber: Number,
        year: Number,
        dimensiones: [{type: Schema.Types.ObjectId, ref: 'Dimension'}],
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true }
);


export type TardisModelType = mongoose.Document & Omit<Tardis, "id">;

export default mongoose.model<TardisModelType>("Tardis", TardisSchema);