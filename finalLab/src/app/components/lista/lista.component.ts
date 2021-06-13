import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/persona';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  constructor(private _usuariosService: UsuariosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuariosService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id:any) {
    this._usuariosService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error('Usuario eliminado', 'El usuario fue eliminado');
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    })
    
     
  }
}
