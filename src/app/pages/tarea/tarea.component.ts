import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// MODEL
import { Task } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/users.model';
import { Step } from 'src/app/models/steps.model';

// SERVICE
import { TasksService } from '../../services/tasks.service';
import { StepsService } from '../../services/steps.service';
import { SearchService } from '../../services/search.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { environment } from '../../../environments/environment';
const base_url = environment.base_url;

declare function horizontalFunction(): any;

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css' ]
})
export class TareaComponent implements OnInit {

  public url: any;

  constructor(  private tasksService: TasksService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private stepsService: StepsService,
                private searchService: SearchService,
                private fileUploadService: FileUploadService,
                private fb: FormBuilder) { }

  ngOnInit(): void {

    this.url = base_url;

    this.activatedRoute.params
        .subscribe( ({id}) => {
          this.loadTaskId(id);
          
        });

  }

  /** ======================================================================
   * LOAD TASK ID
  ====================================================================== */
  public task!: Task;
  public steps: Step[] = [];
  loadTaskId(id: string){

    this.tasksService.loadTaskId(id)
        .subscribe( ({task}) => {

          this.task = task;

          this.loadSteps();

        }, (err) => {
          console.log(err);          
          Swal.fire('Error', err.error.msg, 'error');
          this.router.navigateByUrl('/dashboard/tareas');
        });

  }

  /** ======================================================================
   * LOAD STEPS TASK ID
  ====================================================================== */
  loadSteps(){

    this.stepsService.loadStepTask(this.task.tid!)
          .subscribe( ({ steps }) => {
            
            this.steps = steps; 
            horizontalFunction();             

          });

  }

  /* ============================================================================
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  ============================================================================ 
  SEARCH STAFFS
  ============================================================================ */
  
  public resStaff: number = 0;
  public staffs: User[] = [];
  public sinResultadoS: boolean = false;
  searchStaffs(termino: string){

    this.sinResultadoS = false;
    if (termino.length === 0) {
      this.sinResultadoS = true;
      this.staffs = [];
      this.resStaff = 0;
      return;
    }
    

    let query = `desde=${0}&hasta=${10000}`;

    this.searchService.search('users', termino, query)
    .subscribe( ( {resultados, total} ) => {

        this.sinResultadoS = false;
        this.resStaff = total;
        this.staffs = resultados;
        
        
      }, (err) => { 
        this.sinResultadoS = true;
        Swal.fire('Error', err.error.msg, 'error'); 
      });
      
  };
      
  /* ============================================================================ 
  SELECT STAFF
  ============================================================================ */
  @ViewChild('buscadorS') buscadorS!: ElementRef;
  public staffSelect!: User;
  public selectStaff: boolean = false;
  selectStaffs(staff: User){
    this.sinResultadoS = false;
    this.staffs = [];
    this.resStaff = 0;
    this.buscadorS.nativeElement.value = '';
    this.staffSelect = staff;
    this.selectStaff = true;

  };

  /** ======================================================================
  * CREATE STEP
  ====================================================================== */
  @ViewChild('descriptionStepp') descriptionStepp!: ElementRef;
  createStep(){

    if (!this.selectStaff) {
      Swal.fire('Error', 'No has seleccionado ningun cliente', 'error')
      return;
    }

    let newStep = {
      staff: this.staffSelect.uid,
      description: this.descriptionStepp.nativeElement.value,
      task: this.task.tid
    }

    this.stepsService.createStep(newStep)
        .subscribe( ({step}) => {       

          this.steps.push(step);

        });



  }



  /** ======================================================================
  * END TASK
  ====================================================================== */
  terminar(){

  }

  /** ================================================================
   *  ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *   SUBIR ARCHIVOS
  ==================================================================== */
  public imgTemp: any = null;
  public imgTempAft: any = null;
  public subirArchivo!: File;
  public desc: 'archivo' | 'img' = 'img';
  cambiarImage(file: any): any{

    this.subirArchivo = file.files[0];
    
    if (!this.subirArchivo) {  
      return this.imgTemp = null;         
    }
    
    let fileTemp = this.subirArchivo;
    
    let verExt = fileTemp.name.split('.');
    let ext = verExt[verExt.length - 1];

    // VALID EXT
    const imgExt = ['jpg', 'png', 'jpeg', 'webp', 'bmp', 'svg'];

    if (imgExt.includes(ext)) {
      this.desc = 'img';

      const reader = new FileReader();
      const url64 = reader.readAsDataURL(fileTemp);
      
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }


    }else{

      this.desc = 'archivo';
      let fileExt = ['zip', 'rar', 'ai', 'eps', 'psd'];

      if (!fileExt.includes(ext)) {

        ext = 'file';
  
      }

      this.imgTemp = `../../../assets/images/icon/${ext}.png`;

    }

       
    // FIN DE CAMBIAR IMAGEN
  }
      
  /** ================================================================
   *  SUBIR ARCHIVOS
  ==================================================================== */
  @ViewChild('fileImg') fileImg!: any;

  public imgProducto: string = 'no-image';

  subirImg(step: Step, i: number){
    
    this.fileUploadService.updateImage( this.subirArchivo, 'archivos', step.stid!, this.desc)
    .then( data => {      

      if (data.ok === false) {
        Swal.fire('Error', data.msg, 'error');

        this.imgProducto = 'no-image';    
        this.imgTemp = null;
        this.fileImg!.nativeElement.value = '';

        return;
      }

      this.steps[i].attachments = data.data.attachments;
      
    });
    
    this.imgProducto = 'no-image';
    
    this.imgTemp = null;
    this.fileImg!.nativeElement.value = '';
    
  }

  /** ================================================================
   *  ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *   STEPS
  ==================================================================== */
  @ViewChild('notaI') notaI!: ElementRef;
  public formsNoteSubmitted: boolean = false;
  public formNotes =  this.fb.group({
    note: ['', [Validators.minLength(1), Validators.required]],
    date: ['']
  });

  postNota(step: Step, i: number){

    this.notaI.nativeElement.value = '';
    this.formsNoteSubmitted = true;

    if (this.formNotes.invalid) {
      return;
    }

    // AGREGAR FECHA
    this.formNotes.value.date = Date.now();

    this.stepsService.postNotesStep(this.formNotes.value, step.stid)
        .subscribe( ({ step }) =>{
          
          this.formsNoteSubmitted = false;
          this.formNotes.reset();

          // this.preventive.notes = preventive.notes;
          this.steps[i].notes = step.notes;
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        });
    
  }

  /** ======================================================================
   * VALIDATE FORM
  ====================================================================== */
  validate( campo: string): boolean{
    
    if ( this.formNotes.get(campo)?.invalid && this.formsNoteSubmitted ) {      
      return true;
    }else{
      return false;
    }

  }

  // FIN DE LA CLASE
}
