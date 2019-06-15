import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline" ></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      idInformacao: {
        title: 'Id',
        type: 'number'
      },
      nome: {
        title: 'Nome',
        type: 'string'
      },
      morada: {
        title: 'Morada',
        type: 'string'
      },
      descricao: {
        title: 'Descricao',
        type: 'string'
      },
      longitude: {
        title: 'Longitude',
        type: 'number'
      },
      latitude: {
        title: 'Latitude',
        type: 'number'
      },
      caminho_imagem: {
        title:'Imagem',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService) {
    this.service.getAll().subscribe(
      data => 
      {
        this.source.load(data);
      },
      error => console.log(error)
    )
    
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      
      this.service.deleteInformation(event.data).subscribe();    
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.service.updateInformation(event.newData).subscribe();    

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      //event.newData['name'] += ' + added in code';
      this.service.saveInformation(event.newData).subscribe();    

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  
}
