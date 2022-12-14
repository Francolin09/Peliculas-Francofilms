import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';

const url = environment.url;
const apikey= environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[]= [];

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query:string){

    query=url +query;
    query+= `&api_key=${apikey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares(){
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  buscarPeliculas(texto:string){
    return this.ejecutarQuery(`/search/movie?query=${texto}`)
  }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date (hoy.getFullYear(), hoy.getMonth() +1, 0).getDate();
    const mes = hoy.getMonth()+1;
    let mesString;

    if(mes<10){
      mesString='0'+mes;
    }
    else{
      mesString=mes;

    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`)
                      //aca le indico de que tipo sera el dato que recibira de esa forma no necesito indicarlo en el subscribe del tab1
  }

  getPeliculaDetalle(id:string){
    return this.ejecutarQuery<PeliculaDetalle> (`/movie/${id}?a=1`);
  }

  getActoresPelicula(id:string){
    return this.ejecutarQuery<RespuestaCredits> (`/movie/${id}/credits?a=1`);
  }

  cargarGeneros(): Promise<Genre[]>{
    return new Promise(resolve =>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp=>{
        this.generos=resp['genres'];
        console.log(this.generos)
        resolve(this.generos)
      });
    })
    
  }
}
