import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListaComponent } from './components/lista/lista.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'nuevo-usuario', component: FormComponent },
  { path: 'editar-usuario', component: ListaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
