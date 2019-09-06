import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  displayedColumns: string[] = ['title', 'price', 'actions'];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService
  ) {

  }


  getTable() {
    this.dataSource = new MatTableDataSource<any>(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.sort);

  }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(p => {
        this.filteredProducts = this.products = p;
        this.getTable()

      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  filter(query: string) {
    this.filteredProducts = query ?
      this.products.filter(
        p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())
      ) :
      this.products

  }




  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
