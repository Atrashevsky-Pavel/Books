import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { FormBookComponent } from './components/form-book/form-book.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './componentsView/footer/footer.component';
import { HeaderComponent } from './componentsView/header/header.component';
import { ContentComponent } from './componentsView/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    FormBookComponent,
    FormRegisterComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
