import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/List';
import { Task } from 'src/app/models/task-model';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  selectedListId: string = "";

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService
  ){}

  ngOnInit(): void {    
    this.route.params.subscribe((params: Params) => {
      if(params.listId){
        this.selectedListId = params.listId
        this.taskService
        .getTasks( params.listId )
        .subscribe( ( tasks: any[] ) => {
          console.log("Tasks : ", tasks)
          this.tasks = tasks
        })
      }
    })

    this.taskService
    .getLists()
    .subscribe( ( lists: any[] ) => {
      console.log("List : ", lists)
      this.lists = lists
    })

  }

  completedTask( task: Task ) {
    this.taskService
    .completedTask( task )
    .subscribe( ( result ) => {
      task.completed = !task.completed
    })
  }

  deleteList() {
    this.taskService
    .deleteList( this.selectedListId )
    .subscribe( ( res: List ) => {
      this.selectedListId = ""
      this.router.navigate(['/lists'])
    })
  }

  deleteTask( taskId: string ) {
    this.taskService
    .deleteTask( this.selectedListId, taskId )
    .subscribe( ( res: Task ) => {
      this.tasks = this.tasks.filter( task => task._id !== res._id )
    })
  }

  logOutClick(){
    this.authService.signOut()
  }

}
/**
 * to acces the URL params
 * 1. Access the url by injecting "ActivetedRpute" object
 * 2. Access the url params use "subscribe()" method
 */
