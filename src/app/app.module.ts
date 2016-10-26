import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CGGoComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ CGGoComponent ],
  bootstrap:    [ CGGoComponent ]
})
export class AppModule { }
