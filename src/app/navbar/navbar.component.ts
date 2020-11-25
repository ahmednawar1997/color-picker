import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isDark: boolean;

  @Output() changeTheme: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.isDark = false;
  }

  ngOnInit(): void {
  }

  toggleTheme = () => {
    this.isDark = !this.isDark;
    this.changeTheme.emit();
  }

}
