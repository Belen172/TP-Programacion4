import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, MenuItem } from "@mui/material";
import type { Pais } from "src/features/Pais/types/PaisTypes";

interface SelectPaisProps {
  value: number | "";                     // el ID seleccionado (si estás editando)
  onChange: (id: number) => void;         // se ejecuta cuando cambia
}

export const SelectPais = ({ value, onChange }: SelectPaisProps) => {
  const [paises, setPaises] = useState<Pais[]>([]);

  useEffect(() => {
    axios.get<Pais[]>("http://localhost:3000/api/pais")
      .then(res => setPaises(res.data))
      .catch(console.error);
  }, []);

  return (
    <TextField
      select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="form-select"
      fullWidth
      label = "Pais"
    >
      {paises.map(p => (
        <MenuItem key={p.id_pais} value={p.id_pais}>
          {p.nombre}
        </ MenuItem>
      ))}
    </TextField>

  );
};