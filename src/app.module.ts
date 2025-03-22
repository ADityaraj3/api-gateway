import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModel } from './models/public/users.model';
import { PermissionModel } from './models/master/permissions.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModel } from './models/system-config/role.mode';
import { RolePermissionMappingModel } from './models/system-config/role-permission-mapping.model';
import { UniversityModel } from './models/system-config/universities.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CodeforcesModule } from './modules/codeforces/codeforces.module';
import { TagsModule } from './modules/tags/tags.module';
import { LeetcodeModule } from './modules/leetcode/leetcode.module';
import { GeeksForGeeksModule } from './modules/geeks-for-geeks/geeks-for-geeks.module';
import { HackerrankModule } from './modules/hackerrank/hackerrank.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.db_host,
      port: Number(process.env.db_port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      dialectOptions: {},
      models: [
        UserModel,
        PermissionModel,
        RoleModel,
        RolePermissionMappingModel,
        UniversityModel,
      ],
      synchronize: false,
      autoLoadModels: true,
      define: {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      logging: false,
      pool: {
        max: 30,
        min: 3,
        idle: 60000,
      },
    }),
    AuthModule,
    CodeforcesModule,
    LeetcodeModule,
    TagsModule,
    GeeksForGeeksModule,
    HackerrankModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
