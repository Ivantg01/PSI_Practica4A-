import mongoose from 'npm:mongoose@7.6.3';
import Planeta from './modelPlaneta.ts';

const Schema = mongoose.Schema;

type Dimensiones = {
    name: string,
    planetas: [Schema.Types.ObjectId],
    id: string
}

const dimensionSchema = new Schema(
    {
        name: String,
        planetas:[{type: Schema.Types.ObjectId, ref: 'Planeta'}],
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true }
);

export type DimensionModelType = mongoose.Document & Omit<Dimensiones, "id">;

export default mongoose.model<DimensionModelType>("Dimension", dimensionSchema);