import { Component, OnInit, inject } from '@angular/core';
import { Curso, User } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  cursos: Curso[] = [];
  firebaseauthSvc = inject(FirebaseauthService);
  utilsSvc = inject(UtilsService);
  codigoQR: string = '';
  users: User[] = [];
  rol: 'alumno' | 'profesor' | 'admin' = null;
  loading: boolean = false;
  alumnosPresentes: User[] = [];

  generarCodigoQR(nombreCurso: string, seccionCurso: string) {
    this.codigoQR = `Curso: ${nombreCurso}, Sección: ${seccionCurso}`;
  }


  user(): User {
    return this.utilsSvc.getFromlocalStorage('user');
  }
  ionViewDidEnter() {
    this.getCursos();
  }

  ngOnInit() {
    this.firebaseauthSvc.stateUser().subscribe(res => {
      if (res) {
        this.getUserInf(res.uid);
        this.getCursos();
      } else {
        this.cursos = [];
      }
    });
  }



  // ======= Datos del Usuario/Rol ============
  getUserInf(uid: string) {
    let path = `users/${uid}`;
    this.firebaseauthSvc.getDocument(path).then((user: User) => {
      console.log('datos ->', user);
      if (user) {
        this.rol = user.profile
      }
    })
  }

  // ========= Obtener Cursos ==========
  getCursos() {
    let path = `cursos`;

    this.loading = true;

    this.firebaseauthSvc.stateUser().subscribe(user => {
      if (user) {
        // Obtener todos los cursos
        this.firebaseauthSvc.getCollectionData(path).subscribe((cursos: Curso[]) => {
          this.cursos = cursos.filter(curso => {
            // Si el usuario es un profesor, mostrar solo el curso que tiene asignado
            if (curso.profesor.uid == user.uid) {
              return true;
            }
            // Si el usuario es un alumno, mostrar solo los cursos a los que está asignado
            if (curso.alumnos.some(alumno => alumno.uid == user.uid)) {
              return true;
            }
            // Si el usuario es un admin, mostrar todos los cursos
            if (this.rol == 'admin') {
              return true;
            }
            return false;
          });
          this.loading = false;
        });
      }
    });
  }

}
