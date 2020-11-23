import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-background-layer',
  templateUrl: './background-layer.component.html',
  styleUrls: ['./background-layer.component.css']
})
export class BackgroundLayerComponent implements OnInit {

  @Input() isShown!: boolean;
  @Output() isShownChange = new EventEmitter<boolean>();
  @Input() color!: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleVisibilty = () => {
    this.isShown = false;
    this.isShownChange.emit(this.isShown);

  }

}
