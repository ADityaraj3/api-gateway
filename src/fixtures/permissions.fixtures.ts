import { status_type } from "src/models/system-config/role.mode";

const permissions = [
    {
      permission_name: 'Create',
      permission_slug: 'create',
      parent: 'users',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'View',
      permission_slug: 'view',
      parent: 'users',
      status: status_type.ACTIVE,
      dependency: '',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Update',
      permission_slug: 'update',
      parent: 'users',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Delete',
      permission_slug: 'delete',
      parent: 'users',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Users',
      permission_slug: 'users',
      parent: '',
      status: status_type.ACTIVE,
      dependency: '',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Create',
      permission_slug: 'create',
      parent: 'problems',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'View',
      permission_slug: 'view',
      parent: 'problems',
      status: status_type.ACTIVE,
      dependency: '',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Update',
      permission_slug: 'update',
      parent: 'problems',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Delete',
      permission_slug: 'delete',
      parent: 'problems',
      status: status_type.ACTIVE,
      dependency: 'view',
      created_by: 0,
      updated_by: 0,
    },
    {
      permission_name: 'Problems',
      permission_slug: 'problems',
      parent: '',
      status: status_type.ACTIVE,
      dependency: '',
      created_by: 0,
      updated_by: 0,
    },
  ];
  
  export default permissions;