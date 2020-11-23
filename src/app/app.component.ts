import { Component, QueryList, ViewChildren, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ColorDivComponent } from './color-div/color-div.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import * as colorService from '../services/color-services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChildren(ColorDivComponent) children!: QueryList<ColorDivComponent>;
  @ViewChild('palette') paletteDom!: ElementRef;
  title = 'color-picker';
  colors: Array<any>;
  colorsTemp!: Array<any>;
  showBackgroundLayer = false;
  expandedColor = '#ffffff';

  constructor() {
    this.colors = colorService.generateColors(5);
  }


  removeColor = (color: any) => {
    console.log(color);
    this.colors = this.colors.filter((clr) => clr !== color);
  }

  addColor = (color: any) => {
    const index = this.colors.indexOf(color);
    this.colors.splice(index + 1, 0, colorService.pickRandomColor());
  }
  expandColor = (color: any) => {
    this.expandedColor = colorService.rgbToHex(color);
    this.showBackgroundLayer = true;

  }

  refreshColors = () => {
    this.children.forEach((colorDiv, indx) => {
      colorDiv.refreshColor();
      this.colors[indx] = colorDiv.color;
    });
    console.log(this.colors);
  }

  drop = (event: CdkDragDrop<string[]>) => {
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
  }

}

