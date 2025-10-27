import { Injectable,ConflictException,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Pais } from './entities/pais.entity';
import { Repository} from 'typeorm';

@Injectable()
export class PaisService {

  constructor(
        @InjectRepository(Pais)
        private readonly paisRepository : Repository<Pais>){}

  async create(createPaisDto: CreatePaisDto) {

        const { nombre } = createPaisDto;

        const nombreExistente = await this.paisRepository.findOne({where : {nombre : nombre} });

        if(nombreExistente){
          throw new ConflictException ("Pais ya registrado"); }

        const nuevoPais = this.paisRepository.create({
          nombre
        });
      
        return this.paisRepository.save(nuevoPais);

  }

  findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  findOne(id_pais: number) {
    return this.paisRepository.findOne({where:{id_pais}})
  }

  async update(id_pais: number, updatePaisDto: UpdatePaisDto) {
    
      const paisExistente = await this.paisRepository.findOne({where: {id_pais}});
      
      if(!paisExistente){
        throw new NotFoundException("Pais no encontrado");
      }

      if (updatePaisDto.nombre) {
        const nombreExistente = await this.paisRepository.findOne({
        where: { nombre: updatePaisDto.nombre },
    });

        if (nombreExistente && nombreExistente.id_pais !== id_pais) {
        throw new ConflictException("Ya existe un país con ese nombre");
    }
  }

      const updated = this.paisRepository.merge(paisExistente, {
        ...updatePaisDto
      });

     return await this.paisRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }
}
