import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CGGoComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ CGGoComponent ],
  bootstrap:    [ CGGoComponent ]
})
export class AppModule { }