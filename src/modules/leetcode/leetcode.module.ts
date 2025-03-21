import { Module } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { LeetcodeController } from './leetcode.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/public/users.model';
import { RoleModel } from 'src/models/system-config/role.mode';
import { PermissionModel } from 'src/models/master/permissions.model';
import { RolePermissionMappingModel } from 'src/models/system-config/role-permission-mapping.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      RoleModel,
      PermissionModel,
      RolePermissionMappingModel
    ]),
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
  ],
  providers: [LeetcodeService],
  controllers: [LeetcodeController]
})
export class LeetcodeModule {}
