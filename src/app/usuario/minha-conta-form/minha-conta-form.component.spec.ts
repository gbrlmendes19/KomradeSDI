import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhaContaComponent } from 'src/app/usuario/minha-conta-form/minha-conta-form.component';

describe('UsuarioFormComponent', () => {
  let component: MinhaContaComponent;
  let fixture: ComponentFixture<MinhaContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
