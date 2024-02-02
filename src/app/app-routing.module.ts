import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthloginComponent } from './components/auth/authlogin/authlogin.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CrearproductoComponent } from './components/productos/crearproducto/crearproducto.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/login',pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:AuthloginComponent
  },
  {
    path:'prueba',
    component:FooterComponent
  },
  {
    path:'crearproducto',
    component:CrearproductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
