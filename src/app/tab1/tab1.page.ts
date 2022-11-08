import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]= [];
  populares: Pelicula[]=[];

  // slideOpt = {
  //   slidesPerView : 1.098,
  //   freeMode:true
  // }

  constructor(private movieService: MoviesService) {}

  ngOnInit() {                                //aca no se debe indicar el tipo de resp porque se indico en el servicio mismo
    this.movieService.getFeature().subscribe(resp => {
      console.log('respuesta: ' + resp);
      this.peliculasRecientes = resp.results;
    })

    this.getPopulares();

   
    
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieService.getPopulares().subscribe(resp => {
      console.log('populares', resp);
      this.populares.push(...resp.results) //para que esto funcione se le tuvo que agregar pure: false en el pares pipe
      
    })
  }

}
