import { Component, OnInit, inject } from '@angular/core';
import { Curso, User } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { CompartirDatosService } from 'src/app/services/compartir-datos.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  cursos: Curso[] = [];
  firebaseauthSvc = inject(FirebaseauthService);
  utilsSvc = inject(UtilsService);
  users: User[] = [];
  rol: 'alumno' | 'profesor' | 'admin' = null;
  loading: boolean = false;
  alumnosPresentes: User[] = [];
  barcodeScanner: BarcodeScanner;
  alertController: AlertController;


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
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen de Curso')).dataUrl;
  }
  async scanQRCode(scannedData: string) {
    if (this.cursos.some(curso => curso.qrCode === scannedData)) {
      const alert = await this.alertController.create({
        header: 'Ingrese su Nombre',
        inputs: [
          {
            name: 'nombre',
            type: 'text',
            placeholder: 'Nombre'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Confirmar Asistencia',
            handler: (data) => {
              // Manejar la lógica para guardar el nombre ingresado
              this.guardarNombreEnGenerarQR(data.nombre);
            }
          }
        ]
      });
      await alert.present();
    } else {
      // Mostrar una alerta indicando que el código no es válido
      // ...
    }
  }
  guardarNombreEnGenerarQR(nombre: any) {
    throw new Error('Method not implemented.');
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
