import { Injectable, ConflictException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { Ingrediente } from './entities/ingrediente.entity';

@Injectable()
export class IngredienteService {

   constructor(
          @InjectRepository(Ingrediente)
          private readonly ingredienteRepository : Repository<Ingrediente>){}


  async create(createIngredienteDto: CreateIngredienteDto) {
        const { nombre, unidad_medida } = createIngredienteDto;

        const nombreExistente = await this.ingredienteRepository.findOne({where : {nombre : nombre} });

        if(nombreExistente){
          throw new ConflictException ("Ingrediente ya registrado"); }

        const nuevoPais = this.ingredienteRepository.create({
          nombre,
          unidad_medida
        });
      
        return this.ingredienteRepository.save(nuevoPais);

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

  remove(id: number) {
    return `This action removes a #${id} ingrediente`;
  }
}
