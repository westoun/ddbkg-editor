import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { TripleComponent } from './editor/triple/triple.component';

@NgModule({
  declarations: [AppComponent, EntryPointComponent, EditorComponent, TripleComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
