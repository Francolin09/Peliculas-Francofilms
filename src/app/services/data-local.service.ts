import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[]=[];

  constructor( private storage: Storage, private toastctrl: ToastController ) { 
    this.initDB();
    this.cargarFavoritos();
  }

  async presentToast(message: string){
    const toast = await this.toastctrl.create({
      message,
      duration:1500
    });
    toast.present();
  }

  private _storage: Storage | null = null;

  async initDB(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    let existe = false;
    let mensaje='';

    for( const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe=true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter( peli =>peli.id !== pelicula.id);
      mensaje='Removido de favoritos';
    }
    else{
      this.peliculas.push(pelicula);
      mensaje='Agregada a favoritos';
    }

    this.presentToast(mensaje)
    
    this.storage.set('peliculas', this.peliculas);

    return !existe;

  }

 async cargarFavoritos(){
     const peliculas = await this.storage.get('peliculas');
     this.peliculas = peliculas || [];
     return this.peliculas;
  }

  async existePelicula(id){
    console.log(id)
    id = Number(id);
    console.log(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id===id);
    return (existe) ? true: false;

  }
}
