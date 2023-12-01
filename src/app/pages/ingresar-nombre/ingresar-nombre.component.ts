import { Component, NgModule } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.scss'],
})
export class IngresarNombreComponent {
  nombre: string = '';

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {}

  guardarNombre() {
    // Puedes hacer validaciones aquí si es necesario
    this.modalCtrl.dismiss({ nombre: this.nombre });
  }
}

@NgModule({
  imports: [
    IonicModule,
    FormsModule, // Si estás utilizando formularios
    // Otros imports...
  ],
  declarations: [IngresarNombreComponent],
})
export class IngresarNombreComponentModule {}
