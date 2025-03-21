// import { UserModel, UserType } from 'src/models/public/users.model';
// import { RoleModel } from 'src/models/system-config/role.model';
// import * as encryption from 'src/shared/utils/encryption.utlis';

// interface DefaultAdmin {
//   name: string;
//   password: string;
//   email: string;
//   role: string;
//   user_type: string;
//   mobile_number: string;
// }

// const defaultAdmins: DefaultAdmin[] = [
//   {
//     name: 'Admin',
//     password: 'Admin@123',
//     email: 'admin@logixpay.in',
//     role: 'admin',
//     user_type: UserType.ADMIN,
//     mobile_number: '+91 234423124',
//   },
// ];

// export default async function defaultAdmin() {
//   try {
//     const adminsWithHashedPasswords = await Promise.all(
//       defaultAdmins.map(async (admin) => ({
//         ...admin,
//         password: await encryption.hashPasswordUsingBcrypt(admin.password),
//       })),
//     );

//     const roles = await RoleModel.findAll({
//       where: {
//         role_name: defaultAdmins.map((admin) => admin.role),
//       },
//     });

//     const roleMap = new Map(
//       roles.map((role) => [role.role_name, role.role_id]),
//     );

//     const usersToCreate = adminsWithHashedPasswords
//       .filter((admin) => roleMap.has(admin.role))
//       .map((admin) => ({
//         name: admin.name,
//         password: admin.password,
//         user_type: admin.user_type,
//         email: admin.email,
//         role_id: roleMap.get(admin.role),
//         mobile_number: admin.mobile_number,
//         created_by: 0,
//         updated_by: 0,
//       }));

//     // Bulk create users
//     await UserModel.bulkCreate(usersToCreate, {
//       ignoreDuplicates: true,
//     });
//   } catch (error) {
//     console.error('Error creating default admin users:', error);
//   }
// }
