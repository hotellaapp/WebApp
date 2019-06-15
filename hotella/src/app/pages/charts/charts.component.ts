import {Component} from '@angular/core';

@Component({
  selector: 'Charts',
  template: `<router-outlet><chartist-js></chartist-js></router-outlet>`
})
export class Charts {

  constructor() {
  }

  ngOnInit() {
  }

}
