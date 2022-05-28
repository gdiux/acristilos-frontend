import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

// MODEL
import { Task } from 'src/app/models/tasks.model';

// SERVICE
import { TasksService } from '../../services/tasks.service';
import { StepsService } from '../../services/steps.service';
import { Step } from 'src/app/models/steps.model';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styles: [
  ]
})
export class TareaComponent implements OnInit {

  constructor(  private tasksService: TasksService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private stepsService: StepsService) { }

  ngOnInit(): void {

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

          this.stepsService.loadStepTask(task.tid)
              .subscribe( ({ steps }) => {

                console.log(steps);
                

              });
          

        }, (err) => {
          console.log(err);          
          Swal.fire('Error', err.error.msg, 'error');
          this.router.navigateByUrl('/dashboard/tareas');
        });

  }


  // FIN DE LA CLASE
}
