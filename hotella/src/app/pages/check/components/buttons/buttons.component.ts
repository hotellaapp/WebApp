import {Component} from '@angular/core';
import { ButtonsService } from './buttons.service';
import {  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.html',
  styleUrls: ['./buttons.scss']
})

export class Buttons {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  @ViewChild('texto') texto: ElementRef;
  @ViewChild('cancelado') cancelado: ElementRef;
  @ViewChild('texto1') texto1: ElementRef;


  constructor(protected service: ButtonsService) {
    
  }

  public gerar(idReserva:string,nacionalidade:string,cliente:string) {
    this.service.getCodigo(idReserva,nacionalidade,cliente).subscribe(
      data=>{
        let resposta= JSON.stringify(data['_body']).split(":")

        if(resposta[0]=='"Válido'){
          
          this.texto.nativeElement.innerHTML = resposta[1].substring(0, resposta[1].length - 1);

        this.dataContainer.nativeElement.click();
          
        }
        
      }
    );
  }

  public cancelar(idReserva:string) {
    this.service.cancelaCodigo(idReserva).subscribe(
      data=>{
          this.texto1.nativeElement.innerHTML = JSON.stringify(data['_body']);

        this.cancelado.nativeElement.click();
          
        
        
      }
    );
  }
}
