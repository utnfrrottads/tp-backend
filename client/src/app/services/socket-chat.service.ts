import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from "./auth.service"; 

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {

  io = io(environment.SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
  });

  constructor(private authService: AuthService) { }

  connectToChat(idContrato: String) {
    if (this.authService.loggedIn()) {
      this.io.connect();
      this.io.emit('joinChat', this.authService.getToken(), idContrato);
    }
  }
  
}
