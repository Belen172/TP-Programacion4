import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { ProductoCrearDto } from "./../types/ProductoTypes" 
import { ProductosService } from "./../services/ProductosService"

const estadoInicial: ProductoCrearDto = {
    titulo: "",
    descripcion: "",
    slug: "",
    precio: 0,
    stock: 0
}

export default function ProductosCrearPage() {
    const [form, setForm] = useState<ProductoCrearDto>(estadoInicial)
    const [cargando, setCargando] = useState<boolean>(false)

    async function handleOnSubmit (event: FormEvent) {
        event.preventDefault();
        try {
            setCargando(true)
            const result = await ProductosService.crearProducto(form)
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
            [name]: name === "stock" || name === "precio" ? Number(value) : value
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
                    value={form.titulo}
                    name="titulo"
                    onChange={handleOnChange}
                    label="Título"/>


                    <TextField
                    value={form.descripcion}
                    name="descripcion"
                    onChange={handleOnChange}
                    label="Descripción"/>

                    <TextField
                    required
                    value={form.slug}
                    name="slug"
                    onChange={handleOnChange}
                    label="slug"/>

                    <TextField
                    required
                    value={form.precio}
                    type="number"
                    name="precio"
                    onChange={handleOnChange}
                    label="precio"/>

                    <TextField
                    required
                    value={form.stock}
                    type="number"
                    name="stock"
                    onChange={handleOnChange}
                    label="stock"/>

                    <div>
                        <Button variant="contained" type="submit">Enviar</Button>
                        <Button variant="outlined" onClick={handleClickReiniciar}>Reiniciar</Button>
                    </div>
                </div>
            </form>

        </div>
    )
}