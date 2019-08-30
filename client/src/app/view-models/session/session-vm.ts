import { Type } from 'class-transformer';

import { RoleVM } from '../roles/role-vm';

export class SessionVM {
  token: string;
  name: string;
  email: string;
  @Type(() => RoleVM)
  role: RoleVM;

  constructor(token: string, role: RoleVM, name: string, email: string) {
    this.token = token;
    this.role = role;
    this.name = name;
    this.email = email;
  }
}
