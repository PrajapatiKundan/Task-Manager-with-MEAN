import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  listId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId
    })
  }

  updateList(title: string){
    this.taskService.updateList(this.listId, title).subscribe((res) => {
      this.router.navigate(['/lists', this.listId])
    })
  }
}
