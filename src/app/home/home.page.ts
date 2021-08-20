import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qrData = 'https://app-area-testes.web.app'
  scannedCode = null;
  elementType: any = 'url';

  constructor(
    private barcodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

  }

  scanCode() {

    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
      }
    )

  }

  downloadQR() {

    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();

    let data = imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(
      data, { prefix: '_img', mediaScanner: true })
      .then(res => {

        this.showToast('Salvo na galeria com sucesso!');

      }).catch((error) => {

        this.showToast('Algo saiu errado! ERRO: ' + error);
      });
  }

  async showToast(message) {

    const toast = await this.toastCtrl.create({
      header: message,
      duration: 10000
    });
    toast.present();

  }


}


