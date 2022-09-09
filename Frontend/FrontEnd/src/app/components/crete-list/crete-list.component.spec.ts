import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteListComponent } from './crete-list.component';

describe('CreteListComponent', () => {
  let component: CreteListComponent;
  let fixture: ComponentFixture<CreteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
