import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColorDivComponent } from './color-div/color-div.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundLayerComponent } from './background-layer/background-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ColorDivComponent,
    BackgroundLayerComponent
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    DragDropModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
