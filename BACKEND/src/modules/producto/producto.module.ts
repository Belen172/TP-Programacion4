import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],
  imports: [
    TypeOrmModule.forFeature([Product]) // Importamos todas las entities que este modulo utilizará.
  ]
})
export class ProductoModule {}
