import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:4000/api/usuarios/';

  constructor( private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarUsuario(id:string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
