import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadeAdministradorComponent } from './paginade-administrador.component';

describe('PaginadeAdministradorComponent', () => {
  let component: PaginadeAdministradorComponent;
  let fixture: ComponentFixture<PaginadeAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadeAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginadeAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
