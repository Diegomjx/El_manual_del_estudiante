import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegustaComponent } from './megusta.component';

describe('MegustaComponent', () => {
  let component: MegustaComponent;
  let fixture: ComponentFixture<MegustaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegustaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegustaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
