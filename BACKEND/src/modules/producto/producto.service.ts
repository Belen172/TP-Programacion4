import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity'
import { CrearProductoDto } from './dto/crear-producto.dto'

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    async obtenerProductos () {
        const resultado = await this.productRepository.find()
        return resultado
    }

    async crearProducto (dto: CrearProductoDto) {
        const nuevoProducto = new Product()
        nuevoProducto.titulo = dto.titulo
        nuevoProducto.precio = Number(dto.precio)
        nuevoProducto.slug = dto.slug
        nuevoProducto.stock = dto.stock
        const resultado = await this.productRepository.save(nuevoProducto)
        return resultado
    }
}
