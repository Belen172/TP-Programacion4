import { Module } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { IngredienteController } from './ingrediente.controller';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IngredienteController],
  providers: [IngredienteService],
  imports: [TypeOrmModule.forFeature([Ingrediente])],
})
export class IngredienteModule {}
