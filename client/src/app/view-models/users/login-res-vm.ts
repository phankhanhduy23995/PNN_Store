import { Type } from 'class-transformer';

import { RoleVM } from '../roles/role-vm';

export class LoginResVM {
  email: string;
  name: string;
  token: string;
  @Type(() => RoleVM)
  role: RoleVM;
}
