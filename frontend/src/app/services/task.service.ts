import { Task } from '../models/task-model';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private webRequestService: WebRequestService ) { }

  getLists(){
    return this.webRequestService.getRequest('lists')
  }

  getTasks( listId: string ) {
    return this.webRequestService.getRequest( `lists/${listId}/tasks` )
  }

  createList( title: string) {
    return this.webRequestService.postRequest( 'lists', { title })
  }

  createTask( title: string, listId: string){
    return this.webRequestService.postRequest( `lists/${listId}/tasks`, { title })
  }
  
  completedTask( task: Task ) {
    return this.webRequestService.putRequest( `lists/${task._listId}/tasks/${task._id}`, { completed: !task.completed } )
  }

  deleteList( listId: string ) {
    return this.webRequestService.deleteRequest( `lists/${listId}` )
  }
  
  deleteTask( listId: string, taskId: string ) {
    console.log("task service")
    return this.webRequestService.deleteRequest( `lists/${listId}/tasks/${taskId}` )
  }

  updateList( listId: string, title: string ) {
    return this.webRequestService.putRequest( `lists/${listId}`, { title } )
  }

  updateTask( listId: string, taskId: string, title: string ) {
    return this.webRequestService.putRequest( `lists/${listId}/tasks/${taskId}`, {  title } )
  }

}
