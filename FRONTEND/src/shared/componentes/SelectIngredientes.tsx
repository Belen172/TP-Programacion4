import { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Ingrediente {
  id_ingrediente: number;
  nombre: string;
}

interface SelectIngredientesProps {
  /** lista de ids seleccionados, ej: [1, 3, 5] */
  value: number[];
  /** devuelve los nuevos ids seleccionados */
  onChange: (ids: number[]) => void;
  label: string;
}

export const SelectIngredientes = ({ value, onChange, label }: SelectIngredientesProps) => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 Cargar ingredientes al montar
  useEffect(() => {
    setLoading(true);
    axios
      .get<Ingrediente[]>("http://localhost:3000/api/ingrediente")
      .then((res) => setIngredientes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Derivar la lista de objetos seleccionados a partir de los IDs
  const selectedObjects = ingredientes.filter((ing) =>
    value.includes(ing.id_ingrediente)
  );

  return (
    <Autocomplete
      multiple
      options={ingredientes}
      value={selectedObjects}
      loading={loading}
      getOptionLabel={(option) => option.nombre}
      isOptionEqualToValue={(option, val) => option.id_ingrediente === val.id_ingrediente}
      onChange={(_, newValues) => {
        // extrae solo los ids
        const newIds = newValues.map((i) => i.id_ingrediente);
        onChange(newIds);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Seleccionar ingredientes"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};