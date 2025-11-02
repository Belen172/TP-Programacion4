import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from '../categoria/entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaService } from '../receta/receta.service';
import { Receta } from '../receta/entities/receta.entity';


@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [TypeOrmModule.forFeature([Categoria, Receta])]
})
export class CategoriaModule {}
