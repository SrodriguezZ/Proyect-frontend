import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthloginComponent } from './components/auth/authlogin/authlogin.component';
import { AuthregisterComponent } from './components/auth/authregister/authregister.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PostproductComponent } from './components/productos/postproduct/postproduct.component';
import { FamproductosComponent } from './Familia de Producto/famproductos/famproductos.component';
import { ListfamproductComponent } from './Familia de Producto/listfamproduct/listfamproduct.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { FacturacionComponent } from './components/facturacion/facturacion/facturacion.component';
import { ListFactComponent } from './components/facturacion/list-fact/list-fact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AuthloginComponent,
    AuthregisterComponent,
    HomeComponent,
    PostproductComponent,
    FamproductosComponent,
    ListfamproductComponent,
    ListProductosComponent,
    FacturacionComponent,
    ListFactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
