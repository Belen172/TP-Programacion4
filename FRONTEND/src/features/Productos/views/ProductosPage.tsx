import { useEffect, useState } from 'react'
import { ProductosService } from './../services/ProductosService'

export default function ProductosPage() {
    const [productos, setProductos] = useState()
    useEffect(() => {
        async function fn () {
            const resultado = await ProductosService.obtenerProductos()
            setProductos(resultado)
        } 
        fn()
    }, [])
    return (
        <>
            <h2>Productos</h2>
            <div>{ productos && productos.map((el) => <li>{el}</li>)  }</div>
        </>
    )
}
