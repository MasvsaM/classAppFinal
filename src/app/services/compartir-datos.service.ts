import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  private alumnoPresenteSubject = new Subject<void>();
  alumnoPresente$: Observable<void> = this.alumnoPresenteSubject.asObservable();

  enviarAlertaAlumnoPresente() {
    this.alumnoPresenteSubject.next();
  }
}
