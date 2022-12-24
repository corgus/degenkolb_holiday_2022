import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { BookModule } from './book/book.module';
// import { BookModule } from './book/book.module';

import { CoreModule } from './_core/core.module'
import { SharedModule } from './_shared/shared.module'

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    BookModule,
    AppRoutingModule
  ],
  providers: [
    // BookModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
