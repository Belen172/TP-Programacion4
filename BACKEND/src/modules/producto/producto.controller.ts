import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { productos } from "./productos.data"
import { CrearProductoDto } from "./dto/crear-producto.dto"

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  crearProducto (@Body() productoDto: CrearProductoDto) {
    const resultado = this.productoService.crearProducto(productoDto)
    return {
      resultado
    }
  }

  @Get()
  async obtenerProductos () {
    const resultado = await this.productoService.obtenerProductos()

    return {
      resultado: resultado
    }
  }

  @Get(":idProducto")
  obtenerProducto (@Param("idProducto") idProducto: string) {
    const idConvertido = Number(idProducto)
    const productoEncontrado = productos.find((elemento) => elemento.id === idConvertido)
    return {
      datos: productoEncontrado
    }
  }
}
