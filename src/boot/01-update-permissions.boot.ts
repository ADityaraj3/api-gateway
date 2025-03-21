import { UniqueConstraintError } from 'sequelize';
import permissions from 'src/fixtures/permissions.fixtures';

import { PermissionModel } from 'src/models/master/permissions.model';

export default async function updatePermissions() {
  try {
    await PermissionModel.bulkCreate(permissions, {
      fields: [
        'permission_name', 
        'permission_slug',
        'parent',
        'dependency',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'status',
      ],
      validate: true,
      ignoreDuplicates: true,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      console.log(
        'Some permissions were not inserted due to uniqueness constraints. This is expected behavior.',
      );
    } else {
      console.error('Error updating permissions:', error);
    }
  }
}
