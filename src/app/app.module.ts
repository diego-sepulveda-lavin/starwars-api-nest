import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        database: process.env.DB_NAME,
        entities: [],
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
        type: 'mysql',
        synchronize: true,
        username: process.env.DB_USERNAME,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
