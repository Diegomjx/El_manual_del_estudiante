import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerNavigationComponent } from './hamburger-navigation.component';

describe('HamburgerNavigationComponent', () => {
  let component: HamburgerNavigationComponent;
  let fixture: ComponentFixture<HamburgerNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamburgerNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
