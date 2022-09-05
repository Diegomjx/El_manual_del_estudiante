import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiNotesComponent } from './mi-notes.component';

describe('MiNotesComponent', () => {
  let component: MiNotesComponent;
  let fixture: ComponentFixture<MiNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
