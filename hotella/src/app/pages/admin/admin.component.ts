import {Component,OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import { Http } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import {Funcionarios} from './funcionarios';


@Component({
    selector: 'admin',
    templateUrl:'./admin.html',
    styleUrls: ['./admin.scss']
  })
  export class Admin implements OnInit{


    source: LocalDataSource;
    funcionarios :Funcionarios [];

    settings = {
        add: {
          addButtonContent: '<i class="ion-ios-plus-outline"></i>',
          createButtonContent: '<i class="ion-checkmark"></i>',
          cancelButtonContent: '<i class="ion-close"></i>',
          confirmCreate: true
        },
        edit: {
          editButtonContent: '<i class="ion-edit"></i>',
          saveButtonContent: '<i class="ion-checkmark"></i>',
          cancelButtonContent: '<i class="ion-close"></i>',
          confirmSave: true
        },
        delete: {
          deleteButtonContent: '<i class="ion-trash-a"></i>',
          confirmDelete: true
        },
        columns: {
            email: {
            title: 'Email do funcionário',
            type: 'string'
          },
          password: {
            title: 'Password',
            type: 'string'
          },
        
          
        }
      };

    constructor(protected service: AdminService) {
      this.source=new LocalDataSource();
      this.funcionarios=[];
    }
    
    getFuncionarios() {
        return this.service
        .getFuncionarios()
        .map(
          (funcionario) => {
            this.funcionarios=funcionario;
          })
         .catch((error) => {
            throw error;
          });
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
          this.service.saveInformation(event.newData).subscribe();    
    
          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }
 ngOnInit() {

    this.funcionarios=[];
    this.getFuncionarios().subscribe(_=>{

      
      this.source.load(this.funcionarios);
    });
}



  }