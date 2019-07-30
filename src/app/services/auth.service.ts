import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  currentUser() {
    return this.http.get('/api/auth/')
  }

  login(data) {
    return this.http.post('/api/auth/', data)
  }

  logout() {
    return this.http.post('/api/auth/logout/', {})
  }

}
