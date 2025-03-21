import { Module } from '@nestjs/common';
import { CodeforcesController } from './codeforces.controller';
import { CodeforcesService } from './codeforces.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from 'src/models/system-config/role.mode';
import { UserModel } from 'src/models/public/users.model';
import { PermissionModel } from 'src/models/master/permissions.model';
import { RolePermissionMappingModel } from 'src/models/system-config/role-permission-mapping.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PLATFORM_INTEGRATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002
        }
      }
    ]),
    SequelizeModule.forFeature([
      RoleModel,
      UserModel,
      PermissionModel,
      RolePermissionMappingModel
    ]),
  ],
  controllers: [CodeforcesController],
  providers: [CodeforcesService]
})
export class CodeforcesModule {}
