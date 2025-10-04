import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetaIngredienteService } from './receta-ingrediente.service';
import { CreateRecetaIngredienteDto } from './dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from './dto/update-receta-ingrediente.dto';

@Controller('receta-ingrediente')
export class RecetaIngredienteController {
  constructor(private readonly recetaIngredienteService: RecetaIngredienteService) {}

  @Post()
  create(@Body() createRecetaIngredienteDto: CreateRecetaIngredienteDto) {
    return this.recetaIngredienteService.create(createRecetaIngredienteDto);
  }

  @Get()
  findAll() {
    return this.recetaIngredienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaIngredienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaIngredienteDto: UpdateRecetaIngredienteDto) {
    return this.recetaIngredienteService.update(+id, updateRecetaIngredienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaIngredienteService.remove(+id);
  }
}
