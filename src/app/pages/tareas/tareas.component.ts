import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// MODEL
import { Task } from 'src/app/models/tasks.model';

// SERVICES
import { SearchService } from 'src/app/services/search.service';
import { TasksService } from '../../services/tasks.service';
import { Client } from 'src/app/models/clients.model';



@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  constructor(  private fb: FormBuilder,
                private searchService: SearchService,
                private tasksService: TasksService) { }

  ngOnInit(): void {

    // CARGAR TAREAS
    this.loadTasks();
  }

  /** ======================================================================
   * LOAD TASKS
  ====================================================================== */
  public desde: number = 0;
  public limite: number = 50;
  public tasks: Task[] = [];
  public tasksTemp: Task[] = [];
  public total: number = 0;
  public cargando: boolean = false;
  public sinResultados: boolean = false;

  loadTasks(){

    this.cargando = true;
    this.sinResultados = false;

    this.tasksService.loadTasks(this.desde, this.limite)
        .subscribe( ({ tasks, total }) => {

          // COMPROBAR SI EXISTEN RESULTADOS
          if (tasks.length === 0) {
            this.sinResultados = true;           
          }
          // COMPROBAR SI EXISTEN RESULTADOS

          this.cargando = false;
          this.total = total;
          this.tasks = tasks;
          this.tasksTemp = tasks;
          

        });

  }

  /** ======================================================================
   * CREATE TASK
  ====================================================================== */
  @ViewChild('description') description!: ElementRef;

  createTask(){

    if (!this.selectCliente) {
      Swal.fire('Error', 'No has seleccionado ningun cliente', 'error')
      return;
    }

    let tarea = {
      client: this.clientSelect.cid,
      description: this.description.nativeElement.value
    }

    this.tasksService.createTask(tarea)
        .subscribe( ({task}) => {

          this.tasks.push(task);
          this.total ++;

          this.description.nativeElement.value = '';
          this.loadTasks();

          Swal.fire('Estupendo', 'La maquina se ha creado exitosamente!', 'success');
          

        }, (err) => { 
          Swal.fire('Error', err.error.msg, 'error');    
        });

  }

  /** ======================================================================
   * SELECT
  ====================================================================== */  
  selectMachine(task: Task){

    // this.editMachineForm.reset({
    //   name: machine.name,
    //   serial: machine.serial,
    //   maid: machine.maid
    // });

  }

  /** ======================================================================
   * SEARCH
  ====================================================================== */
  public resultados: number = 0;
  search( termino:string ){

    let query = `desde=${this.desde}&hasta=${this.limite}`;

    if (termino.length === 0) {
      this.tasks = this.tasksTemp;
      this.resultados = 0;
      return;
    }
    
    this.searchService.search('tasks', termino, query)
        .subscribe( ({resultados}) => {

          this.tasks = resultados;
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
    
    this.loadTasks();
    
  }

  /** ================================================================
   *   CHANGE LIMITE
  ==================================================================== */
  limiteChange( cantidad: any ){    

    this.limite = Number(cantidad);
    this.loadTasks();

  }

  /* ============================================================================
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  SEARCH CLIENTS
  ============================================================================ */
  
  public resClient: number = 0;
  public clients: Client[] = [];
  public sinResultadoC: boolean = false;
  searchClients(termino: string){

    this.sinResultadoC = false;
    if (termino.length === 0) {
      this.sinResultadoC = true;
      this.clients = [];
      this.resClient = 0;
      return;
    }
    

    let query = `desde=${0}&hasta=${10000}`;

    this.searchService.search('clients', termino, query)
    .subscribe( ( {resultados, total} ) => {

        this.sinResultadoC = false;
        this.resClient = total;
        this.clients = resultados;
        
        
      }, (err) => { 
        this.sinResultadoC = true;
        Swal.fire('Error', err.error.msg, 'error'); 
      });
      
  };
      
  /* ============================================================================ 
  SELECT CLIENT
  ============================================================================ */
  @ViewChild('buscadorC') buscadorC!: ElementRef;
  public clientSelect!: Client;
  public selectCliente: boolean = false;
  selectClient(client: Client){
    this.sinResultadoC = false;
    this.clients = [];
    this.resClient = 0;
    this.buscadorC.nativeElement.value = '';
    this.clientSelect = client;
    this.selectCliente = true;

  };


  // FIN DE LA CLASE
}
