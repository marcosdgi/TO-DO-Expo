import { z } from 'zod';

export const taskSchema = z.object({
    titulo: z.string({ message: "Este campo es requerido" }).nonempty("El título es requerido"),
    descripcion: z.string({ message: "Este campo es requerido" }).nonempty("La descripción es requerida"),
    estado: z.boolean().default(false)
});
export type taskSchemaType = z.infer<typeof taskSchema>


export default taskSchema
