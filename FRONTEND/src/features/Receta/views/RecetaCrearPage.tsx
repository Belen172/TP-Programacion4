import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { RecetaCrearDto } from "../types/RecetaTypes" 
import { RecetaService } from "../services/RecetaService"

const estadoInicial: RecetaCrearDto = {
    nombre: "",
    pasos: [],
    id_categoria: 0,
    id_pais: 0,
    ingredientes: []
}

export default function RecetaCrearPage() {
    const [form, setForm] = useState<RecetaCrearDto>(estadoInicial)
    const [cargando, setCargando] = useState<boolean>(false)

    async function handleOnSubmit (event: FormEvent) {
        event.preventDefault();
        try {
            setCargando(true)
            const result = await RecetaService.crearReceta(form)
            reiniciarForm()
        } catch (e) {
            console.error(e)
        } finally {
            setCargando(false)
        }
    }
    function handleOnChange (event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setForm(prevFormData => ({
            ...prevFormData,
            [name]: name === "nombre"  ? Number(value) : value            
        }));
    }
    function handleClickReiniciar () {
        reiniciarForm()
    }
    function reiniciarForm () {
        setForm(estadoInicial)
    }
    return (
        <div>
            <div>
                <h1>Formulario para crear Producto</h1>
            </div>

            <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
                <div>
                    <TextField
                    required
                    value={form.nombre}
                    name="nombre"
                    onChange={handleOnChange}
                    label="Nombre"/>


                    <TextField
                    value={form.ingredientes.join(", ")}
                    name="ingredientes"
                    onChange={handleOnChange}
                    label="Ingredientes"/>

                    <TextField
                    required
                    value={form.pasos.join("\n")}
                    name="pasos"
                    onChange={handleOnChange}
                    label="Pasos"/>

                    <TextField
                    required
                    value={form.id_categoria}
                    type="number"
                    name="id_categoria"
                    onChange={handleOnChange}
                    label="Pertenece a la Categoría"/>

                    <TextField
                    required
                    value={form.id_pais}
                    type="number"
                    name="id_pais"
                    onChange={handleOnChange}
                    label="Pertenece al País"/>

                    <div>
                        <Button variant="contained" type="submit">Enviar</Button>
                        <Button variant="outlined" onClick={handleClickReiniciar}>Reiniciar</Button>
                    </div>
                </div>
            </form>

        </div>
    )
}