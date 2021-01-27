import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

@ViewChild(IonList) listda:IonList;
@Input() terminada = true;

  constructor(public deseosService:DeseosService,
    private router:Router,
    private alertCtrl:AlertController
   ) { }

  ngOnInit() {}

  
  listaSeleccionada(lista:Lista){

    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
  }

  borrarLista(lista:Lista){
    
    this.deseosService.borrarLista(lista);

  }

  async aditarLista(lista:Lista){
    
    const alert = await this.alertCtrl.create({
      
      header:'Editar Lista',
      inputs:[{
        
        name:'titulo',
        type:'text',
        value:lista.titulo
            
      }],
      buttons:[
      {
       text:'Cancelar',
       role:'cancel',
       handler:()=>{

        this.listda.closeSlidingItems();
       }
      },
      {
        text:'Actualizar',
        handler:(datas)=>{
          
          lista.titulo = datas.titulo;
          this.deseosService.guardarStorage();
          this.listda.closeSlidingItems();
            
        }
      }
    ]     

    });
  
    alert.present();

  }

}

