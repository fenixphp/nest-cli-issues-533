/**
 * app.module.ts
 *
 * @author    Desionlab <support@desionlab.net>
 * @copyright 2020 Desionlab
 * @license   MIT
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationService } from './app.service';
import { DatabaseModule } from '@hyper-h/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDB.uri', 'mongodb://127.0.0.1:27017'),
        dbName: configService.get<string>('mongoDB.dbName', 'hhEmbedded'),
        user: configService.get<string>('mongoDB.user', null),
        pass: configService.get<string>('mongoDB.pass', null),
        poolSize: configService.get<number>('mongoDB.poolSize', 10),
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [
        ConfigService
      ]
    })
  ],
  providers: [ApplicationService]
})
export class ApplicationModule {}
