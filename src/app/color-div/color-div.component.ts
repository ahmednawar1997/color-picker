import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() canAddColors!: boolean;
  @Output() removeColor: EventEmitter<any> = new EventEmitter();
  @Output() addColor: EventEmitter<any> = new EventEmitter();
  @Output() expandColor: EventEmitter<any> = new EventEmitter();



  colorRGB!: string;
  colorHex!: string;
  colorDescription!: string;
  isDark!: boolean;
  isLocked = false;
  showShades = false;
  shades!: Array<any>;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.setupColor();
  }


  refreshColor = () => {
    if (!this.isLocked) {
      this.color = colorService.pickRandomColor();
      this.setupColor();
    }
  }

  private setupColor = () => {
    this.colorDescription = colorService.getColorDescription(this.color);
    this.colorRGB = colorService.generateRGBValue(this.color);
    this.colorHex = colorService.rgbToHex(this.color);
    this.isDark = colorService.isDark(this.color);
    this.shades = colorService.generateShades(this.color, 20);
  }

  toggleLock = () => {
    this.isLocked = !this.isLocked;
  }
  toggleShades = () => {
    this.showShades = !this.showShades;
  }

  removeColorFromParent = () => {
    this.removeColor.emit(this.color);
  }

  addColorFromParent = () => {
    this.addColor.emit(this.color);
  }
  setColor = (colorString: string) => {
    this.color = colorService.hexToRgb(colorString) || this.color;
    this.setupColor();
    this.toggleShades();
  }

  expandColorFromParent = () => {
    this.expandColor.emit(this.color);
  }
}



