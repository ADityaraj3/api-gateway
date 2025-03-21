import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/public/users.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PLATFORM_INTEGRATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      }
    ]),
    SequelizeModule.forFeature([
      UserModel
    ])
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
