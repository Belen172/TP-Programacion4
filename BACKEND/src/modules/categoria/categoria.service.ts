import { Injectable, ConflictException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Receta } from '../receta/entities/receta.entity';

@Injectable()
export class CategoriaService {

   constructor(
          @InjectRepository(Categoria)
          private readonly categoriaRepository : Repository<Categoria>,

          @InjectRepository(Receta)
          private readonly recetaRepository : Repository<Categoria>){}
  

  async create(createCategoriaDto: CreateCategoriaDto) {

        const { nombre, descripcion } = createCategoriaDto;

        const nombreExistente = await this.categoriaRepository.findOne({where : {nombre : nombre} });

        if(nombreExistente){
          throw new ConflictException ("Categoria ya registrada"); }

        const nuevoPais = this.categoriaRepository.create({
          nombre,
          descripcion
        });
      
        return this.categoriaRepository.save(nuevoPais);

  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  findOne(id_categoria: number) {
    return this.categoriaRepository.findOne({where:{id_categoria}})
  }

 async update(id_categoria: number, updateCategoriaDto: UpdateCategoriaDto) {
      const categoriaExistente = await this.categoriaRepository.findOne({where: {id_categoria}});
      
      if(!categoriaExistente){
        throw new NotFoundException("Categoria no encontrada");
      }

      if (updateCategoriaDto.nombre) {
        const nombreExistente = await this.categoriaRepository.findOne({
        where: { nombre: updateCategoriaDto.nombre },
    });

        if (nombreExistente && nombreExistente.id_categoria !== id_categoria) {
        throw new ConflictException("Ya existe una categoria con ese nombre");
    }
  }

      const updated = this.categoriaRepository.merge(categoriaExistente, {
        ...updateCategoriaDto
      });

     return await this.categoriaRepository.save(updated);
  }

  async remove(id_categoria: number) {
    
    const categoriaAEliminar = await this.categoriaRepository.findOne({where:{id_categoria: id_categoria}});

    if(!categoriaAEliminar){
      throw new ConflictException ("Categoria no encontrada");
    }

    const recetasAsociadas = await this.recetaRepository.count({
      where: { categoria: { id_categoria } } as any,
      });


    if (recetasAsociadas > 0) {
      throw new ConflictException(
        `No se puede eliminar la categoría porque tiene recetas asociadas.`,
      );
    }

    await this.categoriaRepository.remove(categoriaAEliminar)

    return {mensaje: "Categoria eliminada"};
  }
}
