import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar ='';
  ideas:string[]=['Spiderman', 'Avengers','El señor de los anillos','La vida es bella', 'Las edades de Lulú','Alicia en calzones']
  peliculas:string[]=[];
  buscando = false;
 
  constructor(private moviesService:MoviesService, private modalCtrl:ModalController) {}

  buscar(event){
    this.buscando=true;
    const valor = event.detail.value;
    //este if es para manejar el error que aparece al borrar la busqueda de peliculas y hacer que vuelva a tener un arreglo vacio de pelis
    if(valor.length ===0){
      this.buscando=false;
      this.peliculas=[];
      return
    }

    this.moviesService.buscarPeliculas(valor).subscribe(resp=>{
      console.log(resp)
      this.peliculas=resp['results'];
      this.buscando=false;
    })
  }

  async detalle(id:string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present()

  }


}
