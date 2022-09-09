import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookListComponent } from './look-list.component';

describe('LookListComponent', () => {
  let component: LookListComponent;
  let fixture: ComponentFixture<LookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
