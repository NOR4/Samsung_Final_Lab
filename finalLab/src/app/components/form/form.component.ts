import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  Usuario } from 'src/app/model/persona';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;

  constructor( private fb: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               private _usuariosService: UsuariosService,
               private aRouter: ActivatedRoute) { 
    this.userForm = this.fb.group({
     nombre: [ '', [Validators.minLength(3), Validators.required]], 
     apellidos: ['',[ Validators.minLength(3), Validators.required]],
     edad: ['', [Validators.required, this.edadValidator]],
     dni: ['', [Validators.pattern('^[0-9]{8,8}[A-Za-z]$'), Validators.required]],
     birthday: ['', Validators.required],
     favColor: ['', [Validators.minLength(3), Validators.required]],
     gender: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar()
  }

  edadValidator(formControl: { value: any; }) {
    const value = formControl.value;
    const max = 125;
    const min = 0;
    if (value >=0 && value <= 125) {
      return null;
    } else {
      return { edadValidator: { max, min}};
    }

  }

  newUser() {

    let User: Usuario = {
      
      nombre: this.userForm.get('nombre')?.value,
      apellidos: this.userForm.get('apellidos')?.value,
      edad: this.userForm.get('edad')?.value,
      dni: this.userForm.get('dni')?.value,
      birthday: this.userForm.get('birthday')?.value,
      favColor: this.userForm.get('favColor')?.value,
      gender: this.userForm.get('gender')?.value
    }

    if(this.id !==null) {
      //editar usuario
      this._usuariosService.editarUsuario(this.id, User).subscribe(data => {
        this.toastr.info('Usuario actualizado con éxito', 'Usuario actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.userForm.reset();
      })

    } else {
      //agregar usuario
      console.log(User);
      this._usuariosService.guardarUsuario(User).subscribe(data => {
        this.toastr.success('Hola, usuario', 'Usuario registrado');
        this.router.navigate(['/editar-usuario']);
      }, error => {
        console.log(error);
        this.userForm.reset();
      })
    }

   
    
  }

  esEditar() {
    if(this.id !==null) {
      this.titulo = 'Editar usuario';
      this._usuariosService.obtenerUsuario(this.id).subscribe(data => {
        this.userForm.setValue({
          nombre: data.nombre, 
          apellidos: data.apellidos,
          edad: data.edad,
          dni: data.dni,
          birthday: data.birthday,
          favColor: data.favColor,
          gender: data.gender
        })
      })
    }
  }

}
