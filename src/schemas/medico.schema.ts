import { z } from 'zod';

export const medicoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser un texto"
  }),
  especialidad: z.string({
    required_error: "La especialidad es obligatoria",
    invalid_type_error: "La especialidad debe ser un texto"
  }).regex(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ\s]*$/, {
    message: "La especialidad debe usar formato Title Case (ej: Clínica médica, Pediatría, Odontología)"
  }),
  disponible: z.boolean({
    required_error: "Debe indicar si está disponible (true o false)",
    invalid_type_error: "Disponible debe ser un valor booleano (true o false)"
  })
});