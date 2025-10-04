import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"
import { RecetaModule } from './modules/receta/receta.module';
import { RecetaIngredienteModule} from './modules/receta-ingrediente/receta-ingrediente.module';
import { IngredienteModule } from './modules/ingrediente/ingrediente.module';
import { PaisModule } from './modules/pais/pais.module';
import { CategoriaModule } from './modules/categoria/categoria.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RecetaModule,
    RecetaIngredienteModule,
    IngredienteModule,
    PaisModule,
    CategoriaModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
