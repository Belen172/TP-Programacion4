import { Injectable } from '@nestjs/common';
import { CreateRecetaIngredienteDto } from './dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from './dto/update-receta-ingrediente.dto';

@Injectable()
export class RecetaIngredienteService {
  create(createRecetaIngredienteDto: CreateRecetaIngredienteDto) {
    return 'This action adds a new recetaIngrediente';
  }

  findAll() {
    return `This action returns all recetaIngrediente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recetaIngrediente`;
  }

  update(id: number, updateRecetaIngredienteDto: UpdateRecetaIngredienteDto) {
    return `This action updates a #${id} recetaIngrediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} recetaIngrediente`;
  }
}
