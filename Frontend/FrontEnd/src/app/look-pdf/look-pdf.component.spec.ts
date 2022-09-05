import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookPDFComponent } from './look-pdf.component';

describe('LookPDFComponent', () => {
  let component: LookPDFComponent;
  let fixture: ComponentFixture<LookPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
