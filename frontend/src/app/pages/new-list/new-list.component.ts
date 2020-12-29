import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/List';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private _taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(title: string){
    this._taskService.createList(title)
    .subscribe((response: List) => {
      this.router.navigate(['/lists', response._id])
    })                      
  }
}
