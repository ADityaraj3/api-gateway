import { status_type } from "src/models/system-config/role.mode";

const roles = [
  {
    role_name: 'Admin',
    role_slug: 'admin',
    status: status_type.ACTIVE,
    created_by: 0,
    updated_by: 0,
    permissions: [
      'users.create',
      'users.update',
      'users.view',
      'users.delete',
      '.users',
      'problems.create',
      'problems.update',
      'problems.view',
      'problems.delete',
      '.problems',
    ],
  },
  {
    role_name: 'End User',
    role_slug: 'end_user',
    status: status_type.ACTIVE,
    created_by: 0,
    updated_by: 0,
    permissions: [
    ],
  },
];

export default roles;
