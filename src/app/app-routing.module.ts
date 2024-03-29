import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthloginComponent } from './components/auth/authlogin/authlogin.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PostproductComponent } from './components/productos/postproduct/postproduct.component';
import { FamproductosComponent } from './Familia de Producto/famproductos/famproductos.component';
import { ListfamproductComponent } from './Familia de Producto/listfamproduct/listfamproduct.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { ListFactComponent } from './components/facturacion/list-fact/list-fact.component';
import { FactComponent } from './components/facturacion/fact/fact.component';

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
    path:'familiaproductos',
    component:FamproductosComponent
  },
  {
    path:'postproduct',
    component:PostproductComponent
  },
  {
    path:'listFamiliaProductos',
    component:ListfamproductComponent
  },
  {
    path:'listFact',
    component:ListFactComponent
  },
  {
    path:'listProductos',
    component:ListProductosComponent
  },
  {
    path:'fact',
    component:FactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
