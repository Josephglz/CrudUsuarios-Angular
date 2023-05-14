import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  constructor(
    private _http: HttpClient
  ) { }

  loadUsers(): Observable <User[]> {
    return this._http.get<User[]>('http://localhost:3000/users')
  }

  addUser(user: User): Observable <any> {
    return this._http.post('http://localhost:3000/users', user)
  }

  deleteUser(id: number): Observable <any> {
    return this._http.delete(`http://localhost:3000/users/${id}`)
  }

  updateUser(id: number, user: User): Observable <any> {
    return this._http.put(`http://localhost:3000/users/${id}`, user)
  }
}
