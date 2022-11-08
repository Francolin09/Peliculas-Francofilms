import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  
  declarations: [
    SlideshowBackdropComponent,SlideshowPosterComponent,SlideshowParesComponent, DetalleComponent
  ],
  exports:[SlideshowBackdropComponent,SlideshowPosterComponent, SlideshowParesComponent, DetalleComponent], //como quiero ocupar este componente afuerda debo declararlo y ademas exportarlo para poder importarlo donde sea necesario
  imports: [
    CommonModule,
    IonicModule,  //aca se agrego el ionic module para cpoder utilizar todos los componentes de ionic como cards, slides etc
    PipesModule,  //este se agrega para poder aplicar el pipe en este componente
    
  ]
})
export class ComponentsModule { }
