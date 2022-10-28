import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsEditorComponent } from './maps-editor.component';

describe('MapsEditorComponent', () => {
  let component: MapsEditorComponent;
  let fixture: ComponentFixture<MapsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
