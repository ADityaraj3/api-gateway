import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Op } from 'sequelize';
import * as encryption from 'src/shared/utils/encryption.util';
import { Reflector } from '@nestjs/core';
import { UserModel } from 'src/models/public/users.model';
import { RolePermissionMappingModel } from 'src/models/system-config/role-permission-mapping.model';
import { PermissionModel } from 'src/models/master/permissions.model';

@Injectable()
export class PermissionsGuardStrategy implements CanActivate {
    constructor(
        @InjectModel(UserModel) private userModel: typeof UserModel,
        @InjectModel(RolePermissionMappingModel)
        private role_permission_mapping_model: typeof RolePermissionMappingModel,
        @InjectModel(PermissionModel)
        private permissionModel: typeof PermissionModel,
        private readonly reflector: Reflector,
    ) { }

    async findUser(id: number) {
        return await this.userModel.findOne({ where: { user_id: id } });
    }

    async findRole(role_id: number, permissions: string[]) {
        const permissionDetail = await this.role_permission_mapping_model.findOne({
            where: {
                role_id: role_id,
            },
            include: [
                {
                    model: this.permissionModel,
                    attributes: ['permission_id', 'permission_name', 'parent'],
                    required: true,
                    where: {
                        [Op.or]: permissions.map((permission) => {
                            return {
                                parent: permission.split('.')[0],
                                permission_name: permission.split('.')[1],
                            };
                        }),
                    },
                },
            ],
        });

        return permissionDetail ? true : false;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );
        const request = context.switchToHttp().getRequest();

        try {
            const token = this.getToken(request);

            if (!token) {
                throw new HttpException('Unauthorized User', HttpStatus.FORBIDDEN);
            }

            const decoded = this.decodeToken(token);

            const user = await this.findUser(decoded.id);

            if (user) {
                const role_id = user.role_id;

                if (!role_id) {
                    return false;
                }

                return this.findRole(role_id, permissions);
            }

            return false;
        } catch (error) {
            throw new HttpException(
                {
                    error: 'Error',
                    message: error.message || 'Unauthorized User',
                },
                HttpStatus.FORBIDDEN,
            );
        }
    }

    private getToken(request: any): string | null {
        const tokenFromHeader = request.headers?.authorization;
        const tokenFromCookie = request.cookies?.authorization;

        return tokenFromCookie || tokenFromHeader || null;
    }

    private decodeToken(token: string): any {
        return encryption.findByToken(token);
    }
}
