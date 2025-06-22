import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './cats/like.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1',
      database: process.env.DB_NAME || 'support_lk_db',
      entities: [Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Like]),
  ],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}