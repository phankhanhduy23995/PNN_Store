import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiResult } from '../data-transfer/api-result';
import { LoginApiResult } from '../data-transfer/users/login.api-result';
import { LoginVM } from '../view-models/users/login-vm';

@Injectable()
export class UserService extends APIService {
  constructor(private http: HttpClient) {
    super(http);
  }

  public login(loginVM: LoginVM) {
    return super.apiPost<LoginApiResult>('/users/login', loginVM);
  }

  public logout() {
    return super.apiPost<ApiResult>('/users/logout', null, null, true);
  }
}
