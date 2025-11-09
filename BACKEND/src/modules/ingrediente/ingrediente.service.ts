import { Injectable, ConflictException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { Ingrediente } from './entities/ingrediente.entity';
import { Receta } from '../receta/entities/receta.entity';

@Injectable()
export class IngredienteService {

   constructor(
          @InjectRepository(Ingrediente)
          private readonly ingredienteRepository : Repository<Ingrediente>,

          @InjectRepository(Receta)
          private readonly recetaRepository : Repository<Receta>){}



  async create(createIngredienteDto: CreateIngredienteDto) {
        const { nombre, unidad_medida } = createIngredienteDto;

        const nombreExistente = await this.ingredienteRepository.findOne({where : {nombre : nombre} });

        if(nombreExistente){
          throw new ConflictException ("Ingrediente ya registrado"); }

        const nuevoIngrediente = this.ingredienteRepository.create({
          nombre,
          unidad_medida
        });
      
        return this.ingredienteRepository.save(nuevoIngrediente);

  }

  findAll() {
    return this.ingredienteRepository.find();
  }

  findOne(id_ingrediente: number) {
    return this.ingredienteRepository.findOne({where:{id_ingrediente}})
  }

  async update(id_ingrediente: number, updateIngredienteDto: UpdateIngredienteDto) {
      const ingredienteExistente = await this.ingredienteRepository.findOne({where: {id_ingrediente}});
      
      if(!ingredienteExistente){
        throw new NotFoundException("Categoria no encontrada");
      }

      if (updateIngredienteDto.nombre) {
        const nombreExistente = await this.ingredienteRepository.findOne({
        where: { nombre: updateIngredienteDto.nombre },
    });

        if (nombreExistente && nombreExistente.id_ingrediente !== id_ingrediente) {
        throw new ConflictException("Ya existe una ingrediente con ese nombre");
    }
  }

      const updated = this.ingredienteRepository.merge(ingredienteExistente, {
        ...updateIngredienteDto
      });

     return await this.ingredienteRepository.save(updated);
  }

  async remove(id_ingrediente: number) {
    
    const IngredienteAEliminar = await this.ingredienteRepository.findOne({where:{id_ingrediente: id_ingrediente}});

    if(!IngredienteAEliminar){
      throw new ConflictException ("Ingrediente no encontrado");
    }

      const recetasAsociadas = await this.recetaRepository
        .createQueryBuilder('receta')
        .innerJoin('receta.ingredientes', 'ingrediente')
        .where('ingrediente.id_ingrediente = :id', { id: id_ingrediente })
        .getCount();


    if (recetasAsociadas > 0) {
      throw new ConflictException(
        `No se puede eliminar el ingrediente porque tiene recetas asociadas.`,
      );
    }

    await this.ingredienteRepository.remove(IngredienteAEliminar)

    return {mensaje: "Ingrediente eliminado"};
  }
}
