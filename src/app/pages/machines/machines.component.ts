import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Machine } from 'src/app/models/machines.model';

import Swal from 'sweetalert2';

// SERVICES
import { MachinesService } from 'src/app/services/machines.service';
import { SearchService } from 'src/app/services/search.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styles: [
  ]
})
export class MachinesComponent implements OnInit {

  constructor(  private fb: FormBuilder,
                private searchService: SearchService,
                private machinesService: MachinesService) { }

  ngOnInit(): void {

    // LOAD MACHINES
    this.loadMachines();
  }

  /** ======================================================================
   * LOAD MACHINES
  ====================================================================== */
  public desde: number = 0;
  public limite: number = 50;
  public machines: Machine[] = [];
  public machinesTemp: Machine[] = [];
  public total: number = 0;
  public cargando: boolean = false;
  public sinResultados: boolean = false;

  loadMachines(){

    this.cargando = true;
    this.sinResultados = false;

    this.machinesService.loadMachines(this.desde, this.limite)
        .subscribe( ({ machines, total }) => {

          // COMPROBAR SI EXISTEN RESULTADOS
          if (machines.length === 0) {
            this.sinResultados = true;           
          }
          // COMPROBAR SI EXISTEN RESULTADOS

          this.cargando = false;
          this.total = total;
          this.machines = machines;
          this.machinesTemp = machines;

        });

  }

  /** ======================================================================
   * CREATE MACHINE
  ====================================================================== */
  public savingNew: boolean = false;
  public newMachineSubmitted: boolean = false;
  public newMachineForm = this.fb.group({
    name: ['', Validators.required],
    serial: ['']
  });

  createMachine(){

    this.savingNew = true;
    this.newMachineSubmitted = true;

    if (this.newMachineForm.invalid) {
      this.savingNew = false;
      return;
    }

    this.machinesService.createMachine(this.newMachineForm.value)
        .subscribe( ({machine}) => {

          this.machines.push(machine);
          this.total ++;
          this.newMachineSubmitted = false;
          this.newMachineForm.reset();
          this.savingNew = false;

          Swal.fire('Estupendo', 'La maquina se ha creado exitosamente!', 'success');
          

        }, (err) => { 
          Swal.fire('Error', err.error.msg, 'error');
          this.savingNew = false;          
        });

  }


  /** ======================================================================
   * VALIDATE MACHINE
  ====================================================================== */
  validateNewForm(campo: string): boolean{

    if ( this.newMachineForm.get(campo)?.invalid && this.newMachineSubmitted ) {      
      return true;
    }else{
      return false;
    }
  }

  /** ======================================================================
   * SELECT
  ====================================================================== */  
  selectMachine(machine: Machine){

    this.editMachineForm.reset({
      name: machine.name,
      serial: machine.serial,
      maid: machine.maid
    });

  }

  /** ======================================================================
   * EDIT MACHINE
  ====================================================================== */
  public editMachineSubmitted: boolean = false;
  public editMachineForm = this.fb.group({
    name: ['', Validators.required],
    serial: [''],
    maid: ['']
  });

  editMachine(){

    this.savingNew = true;
    this.editMachineSubmitted = true;

    if (this.editMachineForm.invalid) {
      this.savingNew = false;
      return;
    }

    this.machinesService.putMachine(this.editMachineForm.value, this.editMachineForm.value.maid)
        .subscribe( ({ machine }) => {

          this.savingNew = false;
          this.selectMachine(machine);
          this.loadMachines();

          Swal.fire('Estupendo', 'Se ha actualizado la maquina exitosamente!', 'success');


        }, (err) => { 
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });


  }


  /** ======================================================================
   * VALIDATE EDIT MACHINE
  ====================================================================== */
  validateEditForm(campo: string): boolean{

    if ( this.editMachineForm.get(campo)?.invalid && this.editMachineSubmitted ) {      
      return true;
    }else{
      return false;
    }
  }

  /** ======================================================================
   * SEARCH
  ====================================================================== */
  public resultados: number = 0;
  search( termino:string ){

    let query = `desde=${this.desde}&hasta=${this.limite}`;

    if (termino.length === 0) {
      this.machines = this.machinesTemp;
      this.resultados = 0;
      return;
    }
    
    this.searchService.search('machines', termino, query)
        .subscribe( ({resultados}) => {

          this.machines = resultados;
          this.resultados = resultados.length;

        });   

  }

  /** ================================================================
   *   CAMBIAR PAGINA
  ==================================================================== */
  @ViewChild('mostrar') mostrar!: ElementRef;
  cambiarPagina (valor: number){
    
    this.limite = Number(this.mostrar.nativeElement.value);
    
    if (this.limite > 10) {
      valor = valor * (this.limite/10);      
    }
    
    this.desde += valor;
    
    if (this.desde < 0) {
      this.desde = 0;
    }else if( this.desde > this.total ){
      this.desde -= valor;
    }
    
    this.loadMachines();
    
  }

  /** ================================================================
   *   CHANGE LIMITE
  ==================================================================== */
  limiteChange( cantidad: any ){    

    this.limite = Number(cantidad);
    this.loadMachines();

  }

  

  // FIN DE LA CLASE
}
