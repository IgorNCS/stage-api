import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('POSTGRES_HOST'),
  entities: ['**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.js'],
});