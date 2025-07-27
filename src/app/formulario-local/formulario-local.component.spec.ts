import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLocalComponent } from './formulario-local.component';

describe('FormularioLocalComponent', () => {
  let component: FormularioLocalComponent;
  let fixture: ComponentFixture<FormularioLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioLocalComponent]
    });
    fixture = TestBed.createComponent(FormularioLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
