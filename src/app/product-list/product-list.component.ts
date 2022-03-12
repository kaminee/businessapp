import { ProductDetailsComponent } from './../product-details/product-details.component';
import { Observable } from "rxjs";
import { ProductService } from "./../product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ColDef,GridApi,ColumnApi,GridOptions} from 'ag-grid-community';
import {  
    ToastrService  
} from 'ngx-toastr'; 

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
public gridOptions: GridOptions;
 private api: GridApi;  
    private columnApi: ColumnApi; 
  products: Observable<Product[]>;
 productslist: Product[];
  constructor(private prodService: ProductService,
    private router: Router, private toastr: ToastrService) {
  this.prodService.getProducts().subscribe(data => {  
            this.productslist = data  
        });
    }

  ngOnInit() {
    this.reloadData();
       this.prodService.getProducts().subscribe(data => {  
            this.productslist = data  
        })  
        
         this.gridOptions = {
  columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single',
      onRowClicked: (event: any) => console.log('A row was clicked')
};
  }

  reloadData() {
    this.products = this.prodService.getProductsList();
  }
   columnDefs: ColDef[] = [
       { field: 'productName', sortable: true, filter: true,checkboxSelection: true },
       { field: 'productType', sortable: true, filter: true },
       { field: 'description', sortable: true, filter: true }
   ];
// let the grid know which columns and what data to use

     onGridReady(params: any) {
    this.api = params.api;
      this.columnApi = params.columnApi;  
        this.api.sizeColumnsToFit();
  }
  deleteProduct(id: number) {
    this.prodService.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  productDetails(id: number){
    this.router.navigate(['product/details', id]);
  }

  updateProduct(id: number){
    this.router.navigate(['product/update', id]);
  }
  
   //Delete user  
    deleteProd() {  
        debugger;  
        var selectedRows = this.api.getSelectedRows();  
        if (selectedRows.length == 0) {  
            this.toastr.error("error", "Please select a Product for deletion");  
            return;  
        }  
        this.prodService.deleteProduct(selectedRows[0].id).subscribe(data => {  
            this.toastr.success("Record deleted successfully.");  
            this.ngOnInit();  
         //   this.api.refreshRows(null);  
        });  
    }  
}
