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
  colors: Array<any>;
  savedPalettes!: Array<any>;
  showSavedPalettes = false;

  showBackgroundLayer = false;
  expandedColor = '#ffffff';

  constructor() {
    this.colors = colorService.generateSimilarColors(4);
    this.savedPalettes = [];
  }


  removeColor = (color: any) => {
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
  }

  drop = (event: CdkDragDrop<string[]>) => {
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
  }

  changeColorInArray = (oldColor: any, newColor: any) => {
    const index = this.colors.indexOf(oldColor);
    this.colors[index] = newColor;
  }

  savePalette = () => {
    const newPalette = this.colors.map((color) => colorService.rgbToHex(color));
    if (!isPaletteExist(this.savedPalettes, newPalette)) {
      this.savedPalettes.push(newPalette);
    }
  }

  toggleSavedPalettes = () => {
    this.showSavedPalettes = !this.showSavedPalettes;
    if (this.savedPalettes.length === 0) {
      this.showSavedPalettes = false;
    }
  }

  choosePalette = (palette: Array<string>) => {
    this.colors = palette.map(element => {
      return colorService.hexToRgb(element);
    });
  }
}

const isPaletteExist = (savedPalettes: Array<any>, newPalette: Array<any>) => {
  for (const palette of savedPalettes) {

    if (palette.length !== newPalette.length) {
      return false;
    }
    let flag = true;
    for (const [index, element] of palette.entries()) {
      if (element !== newPalette[index]) {
        flag = false;
        break;
      }
    }
    if (flag) { return flag; }
  }
  return false;
};

