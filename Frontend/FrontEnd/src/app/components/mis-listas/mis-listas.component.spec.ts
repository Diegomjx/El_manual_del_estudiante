import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisListasComponent } from './mis-listas.component';

describe('MisListasComponent', () => {
  let component: MisListasComponent;
  let fixture: ComponentFixture<MisListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
