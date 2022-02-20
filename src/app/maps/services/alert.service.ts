import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private option: Subject<{error: boolean, message: string}> = new Subject<{error: boolean, message: string}>();
  constructor() { }

  public options: Observable<{error: boolean, message: string}> = this.option.asObservable();

  alertBox(error: boolean, message: string){
    this.option.next({error, message});
  }
}
