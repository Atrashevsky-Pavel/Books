import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from './componentsView/content/content.component';
import {FormRegisterComponent} from './components/form-register/form-register.component';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'register', component: FormRegisterComponent},
  {path: 'enter', component: FormRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
