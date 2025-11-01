import { PartialType } from '@nestjs/mapped-types';
import { CreateRecetaDto } from './create-receta.dto';
import { Categoria } from 'src/modules/categoria/entities/categoria.entity';
import { Pais } from 'src/modules/pais/entities/pais.entity';
export class UpdateRecetaDto extends PartialType(CreateRecetaDto) {
}
