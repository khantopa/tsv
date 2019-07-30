import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  create(user){
    return this.http.post('/api/user/', user);
  }

  update(user) {
    return this.http.put(`/api/user/${user.id}`, user);
  }

}