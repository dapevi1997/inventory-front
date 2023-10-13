import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnswerLogin, BodyLogin } from '../interfaces/Auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private $httpClient: HttpClient) { 

  }

  login(body: BodyLogin): Observable <AnswerLogin>{
    let direction = environment.authUrl + 'api/v1/auth/login';

    return this.$httpClient.post<AnswerLogin>(direction,body);
  }

}
