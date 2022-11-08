import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if (!img){
      return '/assets/no-image-banner.jpg';
    }

    const imgUrl = `${url}/${size}${img}`;
     



    return imgUrl;
  }
  //Recordar que para usar este pipe lo primero será importar el pipes module en la carpeta .module de donde se quiera trabajar

}
