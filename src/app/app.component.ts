import { Component, QueryList, ViewChildren, ViewChild, ElementRef, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ColorDivComponent } from './color-div/color-div.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import * as colorService from '../services/color-services';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('100ms ease-in', style({ opacity: 1 }))
        ])
      ]

    ),
    trigger(
      'slideAnimation',
      [
        transition(':enter', [
          style({ transform: 'translateY(-100%)' }),
          animate('100ms ease-in', style({ transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('100ms ease-in', style({ transform: 'translateY(-100%)' }))
        ])
      ]
    )
  ]
})
export class AppComponent {
  @ViewChildren(ColorDivComponent) children!: QueryList<ColorDivComponent>;
  @ViewChild('palette') paletteDom!: ElementRef;

  colors: Array<any>;
  savedPalettes!: Array<any>;
  showSavedPalettes = false;
  isDark = false;

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
    if (colorService.getSavedPalette(this.savedPalettes, newPalette) === -1) {
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

  deleteSavedPalette = (savedPalette: Array<string>) => {
    const index = colorService.getSavedPalette(this.savedPalettes, savedPalette);
    if (index > -1) {
      this.savedPalettes.splice(index, 1);
    }
    if (this.savedPalettes.length === 0) {
      this.showSavedPalettes = false;
    }
  }

  changeTheme = () => {
    this.isDark = !this.isDark;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      this.refreshColors();
    }
  }
}

