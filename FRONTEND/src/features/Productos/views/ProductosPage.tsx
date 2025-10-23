import { useEffect, useState, useMemo } from 'react'
import { ProductosService } from './../services/ProductosService'
import type { Producto } from "./../types/ProductoTypes"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router';
import { AgGridReact } from 'ag-grid-react';


export default function ProductosPage() {
    const [productos, setProductos] = useState<Producto[]>()
    const [colDefs, setColDefs] = useState([
        { field: "id", headerName: 'Identificador' },
        { field: "titulo" },
        { field: "precio" },
        { field: "descripcion" },
        { field: "slug" },
        { field: "stock" }
    ]);
    const rowSelection = useMemo(() => { 
        return {
            mode: 'singleRow'
        };
    }, []);
    useEffect(() => {
        async function fn () {
            const resultado = await ProductosService.obtenerProductos()
            setProductos(resultado)
        }
        fn()
    }, [])
    const navigate = useNavigate();
    function handleButtonNavClickCrear () {
        navigate("crear")
    }
    function handleButtonNavClickEditar () {
        navigate("editar")
    }
    function handleButtonNavClickEliminar () {
        navigate("eliminar")
    }

    return (
        <>
            <div>
                <Box sx={{ width: '100%' }}>
                    <ButtonGroup variant="outlined">
                        <Button onClick={handleButtonNavClickCrear}>Crear</Button>
                        <Button onClick={handleButtonNavClickEditar}>Editar</Button>
                        <Button onClick={handleButtonNavClickEliminar}>Eliminar</Button>
                    </ButtonGroup>
                </Box>
            </div>
            <h2>Productos</h2>
            <div>
                <div style={{ height: 500 }}>
                <AgGridReact
                    rowData={productos}
                    columnDefs={colDefs} rowSelection={rowSelection}/>
            </div>
            </div>
        </>
    )
}
