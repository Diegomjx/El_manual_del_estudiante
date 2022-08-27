import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('class.is-active')
  private isActive = false;

  @HostListener('click')
  toggleActive(): void{
    this.isActive= !this.isActive;
  }

}
