import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnswerLogin, BodyLogin } from '../interfaces/Auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SaveUserBody } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private $httpClient: HttpClient) { }

  saveUser(body: SaveUserBody): Observable <any>{
    let direction = environment.apiCommandService + 'api/v1/user/register';

    return this.$httpClient.post<any>(direction,body);
  }

  findUserByEmail(email:string){
    let direction = environment.apiQueryService + 'api/v1/user/' + email;
    return this.$httpClient.get(direction);
  }

}
