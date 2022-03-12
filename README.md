
# Businessapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
# businessapp
angular application for CRUD operations



###How to add AG_GRID TO application
TO add AG GRID, perform following steps

npm i --save ag-grid-community ag-grid-angular

app.module.ts

import { AgGridModule } from 'ag-grid-angular';



$ npm install --save ag-grid-community
app.module.ts

import { Grid } from 'ag-grid-community';

style.css
  @import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";


var eGridDiv = document.querySelector('#myGrid');
new Grid(eGridDiv, this.gridOptions);


====================
Step 10: Install Toastr
npm i ngx-toastr
angular.json
 "styles": [
              "src/styles.css",
               "./node_modules/ngx-toastr/toastr.css"
            ],

product.list.component.ts=> add in constructor( private ToastrService  toastr)

import {  
    ToastrService  
} from 'ngx-toastr'; 

inside app.module.ts

import { ToastrModule } from 'ngx-toastr';
 imports: [
  ToastrModule.forRoot(),
    AgGridModule.withComponents([])
    
  ],
  
============
Step 9: Install bootstrap
npm install bootstrap --save

