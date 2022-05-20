import { Component, OnInit } from '@angular/core';

// MODELS
import { Product } from 'src/app/models/products.model';
import { User } from '../../models/users.model';

// SERVICES
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public user!: User;

  constructor(  private productsService: ProductsService,
                private usersService: UsersService,) {  }

  ngOnInit(): void {

    this.loadProximos();

    this.user = this.usersService.user;

  }

  /* ============================================================================ 
  LOAD PROXIMOS
  ============================================================================ */
  public products: Product[] = [];
  public totalProximos: number = 0;
  public inProduct: any;
  loadProximos(){

    let query = `tipo=proximos&status=true&preventivo=false`;
    this.productsService.loadProducts(0, 100, query)
        .subscribe(({ products, total }) =>{

          this.products = products;
          this.totalProximos = total;          

        });
  }

  // FIN DE LA CLASE
}
