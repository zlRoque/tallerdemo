import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Productos1Page } from './productos1.page';

describe('Productos1Page', () => {
  let component: Productos1Page;
  let fixture: ComponentFixture<Productos1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Productos1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
