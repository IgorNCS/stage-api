import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthModule } from './authentication/auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { AreaModule } from './modules/area/area.module';
import { ProcessModule } from './modules/process/process.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
dotenv.config()
@Module({
  imports: [
    AuthModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      interceptor: { mount: false },
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

    }),
    AreaModule,
    ProcessModule,
    DocumentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
