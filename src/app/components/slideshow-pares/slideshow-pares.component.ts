import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas : Pelicula[]= [];
  @Output() cargarMas = new EventEmitter();

  slideOpt = {
    slidesPerView : 3.3,
    freeMode:true
  }

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onClick(){
    console.log('cargar más')
    this.cargarMas.emit();
  }

  async verDetalle(id:string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    })
    modal.present();

  }

}
