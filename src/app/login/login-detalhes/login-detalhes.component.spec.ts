import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetalhesComponent } from './login-detalhes.component';

describe('LoginDetalhesComponent', () => {
  let component: LoginDetalhesComponent;
  let fixture: ComponentFixture<LoginDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
