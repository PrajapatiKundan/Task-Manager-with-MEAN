import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  listId: string;
  taskId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId
      this.taskId = params.taskId
    })
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title)
    .subscribe((res) => {
      this.router.navigate(['/lists', this.listId])
    })
  }
}
