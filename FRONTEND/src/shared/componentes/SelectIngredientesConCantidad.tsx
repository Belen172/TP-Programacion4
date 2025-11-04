import { useEffect, useState } from "react";
import {Box,Stack,TextField,Typography,IconButton,Button,Autocomplete} from "@mui/material";
import { IngredienteService } from "src/features/Ingrediente/services/IngredienteService";
import { Add, Delete } from "@mui/icons-material";

interface IngredienteCantidad {
  id_ingrediente: number;
  cantidad: number;
}

interface Props {
  value: IngredienteCantidad[];
  onChange: (nuevoValor: IngredienteCantidad[]) => void;
}

export function SelectIngredientesConCantidad({ value, onChange }: Props) {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState<
    { id_ingrediente: number; nombre: string }[]
  >([]);

  useEffect(() => {
    IngredienteService.obtenerIngredientes()
      .then(setIngredientesDisponibles)
      .catch(console.error);
  }, []);

  const handleAgregarFila = () => {
    onChange([...value, { id_ingrediente: 0, cantidad: 0 }]);
  };

  const handleEliminarFila = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleCambiarValor = (
    index: number,
    campo: keyof IngredienteCantidad,
    nuevoValor: any
  ) => {
    const nuevos = value.map((item, i) =>
      i === index ? { ...item, [campo]: nuevoValor } : item
    );
    onChange(nuevos);
  };

  return (
    <Box>
      <Typography variant="subtitle1">
        <b><u>Ingredientes y cantidades</u></b>
      </Typography>

      <Stack spacing={2} py={3}>
        {value.map((item, index) => {
          const seleccionado =
            ingredientesDisponibles.find(
              (ing) => ing.id_ingrediente === item.id_ingrediente
            ) || null;

          return (
            <Box key={index} display="flex" alignItems="center" gap={1}>

            <Box flex={2}>
              <Autocomplete
                options={ingredientesDisponibles}
                getOptionLabel={(option) => option.nombre}
                value={seleccionado}
                onChange={(_, newValue) =>
                  handleCambiarValor(
                    index,
                    "id_ingrediente",
                    newValue ? newValue.id_ingrediente : 0
                  )
                }
                isOptionEqualToValue={(option, value) =>
                  option.id_ingrediente === value.id_ingrediente
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Ingrediente ${index + 1}`}
                    fullWidth
                    variant="outlined"
                  />
                )}
                noOptionsText="No hay ingredientes"
              />
              </Box>

              <Box flex={1}>
              <TextField
                label="Cantidad"
                type="number"
                variant="outlined"
                fullWidth
                value={item.cantidad}
                onChange={(e) =>
                  handleCambiarValor(index, "cantidad", Number(e.target.value))
                }
              />
              </Box>


              <IconButton color="error" onClick={() => handleEliminarFila(index)}>
                <Delete />
              </IconButton>
            </Box>
          );
        })}


        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAgregarFila}
          sx={{ alignSelf: "flex-start" }}
        >
          Agregar Ingrediente
        </Button>
      </Stack>
    </Box>
  );
}
