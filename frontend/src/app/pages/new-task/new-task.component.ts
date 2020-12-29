import { Task } from './../../models/task-model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  listId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId
    })
  }

  createNewTask(title: string){
  //url to create task: /lists/:listId/tasks
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate(['../'], { relativeTo: this.route })
    })
  }
}
