import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroLoginPage } from './registro-login.page';

describe('RegistroLoginPage', () => {
  let component: RegistroLoginPage;
  let fixture: ComponentFixture<RegistroLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
