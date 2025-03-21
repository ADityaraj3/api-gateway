import { UniqueConstraintError } from 'sequelize';

import { PermissionModel } from 'src/models/master/permissions.model';
import { RolePermissionMappingModel } from 'src/models/system-config/role-permission-mapping.model';
import { RoleModel } from 'src/models/system-config/role.mode';
import roles from 'src/fixtures/roles.fixtures';
import { slugify } from 'src/shared/utils/common.util';


export default async function updateRoles() {
  try {
    await RoleModel.bulkCreate(
      roles.map((role) => ({
        ...role,
      })),
      {
        fields: [
          'role_name',
          'role_slug',
          'status',
          'created_by',
          'updated_by',
        ],
        ignoreDuplicates: true,
        validate: true,
      },
    );

    const allRoles = await RoleModel.findAll();
    const allPermissions = await PermissionModel.findAll();

    const permissionMap = new Map(
      allPermissions.map((permission) => [
        `${permission.parent}.${permission.permission_name}`,
        permission.permission_id,
      ]),
    );

    const roleMappings = [];
    for (const role of roles) {
      const dbRole = allRoles.find(
        (r) => r.role_slug === role.role_slug,
      );
      if (dbRole) {
        for (const permissionString of role.permissions) {
          const permissionId = permissionMap.get(permissionString);
          if (permissionId) {
            roleMappings.push({
              role_id: dbRole.role_id,
              permission_id: permissionId,
              created_by: role.created_by,
              updated_by: role.updated_by,
            });
          }
        }
      }
    }

    if (roleMappings.length > 0) {
      await RolePermissionMappingModel.bulkCreate(roleMappings, {
        ignoreDuplicates: true,
      });
    }
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      console.log(
        'Some roles or mappings were not inserted due to uniqueness constraints. This is expected behavior.',
      );
    } else {
      console.error('Error updating roles and permissions:', error);
      throw error;
    }
  }
}
