import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() { 
  }

  initializeWebSocketConnection(idCorrelation: string) {
    this.socket$ = webSocket(environment.webSocketUrl + `retrieve/${idCorrelation}`);
  }

  sendMessage(message: string) {
    this.socket$.next({ message: message });
  }

  receiveMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

}
