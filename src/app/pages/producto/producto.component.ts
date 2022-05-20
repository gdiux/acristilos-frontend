import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// MODELS
import { Product } from 'src/app/models/products.model';

// SERVICES
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private productsService: ProductsService,
                private router: Router) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    //     .subscribe( ({id}) =>  {
    //       this.loadProduct(id);          
    //     });

    this.loadProduct();

  }

  /** ================================================================
   *  LOAD PRODUCT ID
  ==================================================================== */
  public product: Product | any;
  loadProduct(){

    this.activatedRoute.params
        .subscribe( ({id}) =>  {      
        

          this.productsService.loadProductId(id)
              .subscribe( ({product}) => {

                this.product = product;

              }, (err) => {
                Swal.fire('Error', err.error.msg, 'error');
                this.router.navigateByUrl('/');
                
              });

      });

  }

  
  // FIN DE LA CLASE
}
