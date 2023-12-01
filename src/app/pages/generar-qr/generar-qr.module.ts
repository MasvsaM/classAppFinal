import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarQRPageRoutingModule } from './generar-qr-routing.module';

import { GenerarQRPage } from './generar-qr.page';
import { SharedModule } from "../../shared/shared.module";
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [GenerarQRPage],
    imports: [QRCodeModule,
        CommonModule,
        FormsModule,
        IonicModule,
        GenerarQRPageRoutingModule,
        SharedModule
    ]
})
export class GenerarQRPageModule {}
