import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  
  constructor(categoriesService: CategoriesService) {
    this.categories$ = categoriesService.getAll();
  }

  ngOnInit() {
  }

}
