import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as colorService from '../../services/color-services';

@Component({
  selector: 'app-color-div',
  templateUrl: './color-div.component.html',
  styleUrls: ['./color-div.component.css']
})
export class ColorDivComponent implements OnInit {
  @Input() color!: {
    red: number,
    green: number,
    blue: number
  };

  colorRGB!: string;
  colorHex!: string;
  colorDescription!: string;
  isDark!: boolean;
  isLocked = false;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {

    this.colorDescription = colorService.getColorDescription(this.color);
    this.colorRGB = colorService.generateRGBValue(this.color);
    this.colorHex = colorService.rgbToHex(this.color);
    this.isDark = colorService.isDark(this.color);
  }


  refreshColor = () => {
    if (!this.isLocked) {
      this.color = colorService.pickRandomColor();
      this.colorDescription = colorService.getColorDescription(this.color);
      this.colorRGB = colorService.generateRGBValue(this.color);
      this.colorHex = colorService.rgbToHex(this.color);
      this.isDark = colorService.isDark(this.color);
    }
  }

  toggleLock = () => {
    this.isLocked = !this.isLocked;
  }

  removeColor = () => {
    this.elementRef.nativeElement.remove();
  }

}



