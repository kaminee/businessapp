import { ProductDetailsComponent } from './../product-details/product-details.component';
import { Observable } from "rxjs";
import { ProductService } from "./../product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private prodService: ProductService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.products = this.prodService.getProductsList();
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
}
