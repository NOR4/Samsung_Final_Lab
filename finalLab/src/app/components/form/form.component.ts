import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;

  constructor( private fb: FormBuilder,
               private router: Router) { 
    this.userForm = this.fb.group({
     nombre: [ '', [Validators.minLength(3), Validators.required]], 
     apellidos: ['',[ Validators.minLength(3), Validators.required]],
     age: ['',Validators.required],
     dni: ['', Validators.required],
     birthday: ['', Validators.required],
     favColor: ['', [Validators.minLength(3), Validators.required]],
     gender: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  newUser() {

    let User= {
      nombre: this.userForm.get('nombre')?.value,
      apellidos: this.userForm.get('apellidos')?.value,
      age: this.userForm.get('age')?.value,
      dni: this.userForm.get('dni')?.value,
      birthday: this.userForm.get('birthday')?.value,
      favColor: this.userForm.get('favColor')?.value,
      gender: this.userForm.get('gender')?.value
    }

    console.log(User);
    this.router.navigate(['/']);
  }

}
