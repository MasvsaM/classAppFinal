import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { GenerarQRPage } from './generar-qr.page';

describe('GenerarQRPage', () => {
  let component: GenerarQRPage;
  let fixture: ComponentFixture<GenerarQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
