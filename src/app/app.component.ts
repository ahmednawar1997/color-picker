import { Component, QueryList, ViewChildren } from '@angular/core';
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
  title = 'color-picker';
  colors: Array<any>;

  constructor() {
    this.colors = colorService.generateColors(5);
  }


  refreshColors = () => {
    this.children.forEach(colorDiv => {
      colorDiv.refreshColor();
    });
  }

  drop = (event: CdkDragDrop<string[]>) => {
    console.log('chnaged');
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
  }

}

