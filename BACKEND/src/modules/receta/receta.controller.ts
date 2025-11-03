import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}


//Create receta a partir de FromData y no aplication/json.
@Post()
@UseInterceptors(FileInterceptor('foto', {
  storage: diskStorage({
    destination: './fotosRecetas/',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${uniqueName}${ext}`);
    },
  }),
}))
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() body,
) {
  const fotoPath = file ? `/fotosRecetas/${file.filename}` : null;

  // convertir campos a sus tipos reales
  const dto = {
    nombre: String(body.nombre),
    id_categoria: Number(body.id_categoria),
    id_pais: Number(body.id_pais),
    pasos: body.pasos ? JSON.parse(body.pasos) : [],
    ingredientes: body.ingredientes ? JSON.parse(body.ingredientes) : [],
    foto: fotoPath,
  } as CreateRecetaDto;

  return this.recetaService.create(dto);
}


  @Get()
  findAll() {
    return this.recetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.recetaService.findOne(+id);
  }

  @Patch(':id')
@UseInterceptors(FileInterceptor('foto', {
  storage: diskStorage({
    destination: './fotosRecetas/',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${uniqueName}${ext}`);
    },
  }),
}))
async update(
  @Param('id') id: number,
  @UploadedFile() file: Express.Multer.File,
  @Body() body
) {
  const dto = {
    nombre: String(body.nombre),
    id_categoria: Number(body.id_categoria),
    id_pais: Number(body.id_pais),
    pasos: JSON.parse(body.pasos),
    ingredientes: JSON.parse(body.ingredientes),
    foto: file
      ? `/fotosRecetas/${file.filename}`
      : body.fotoActual || null, // usa la existente si no hay nueva
  };

  console.log(dto)

  return this.recetaService.update(id, dto);
}

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recetaService.remove(+id);
  // }
}
