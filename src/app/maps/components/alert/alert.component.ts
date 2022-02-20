import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public show: boolean = false;
  public alertMessage: string = '';
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.options
      .subscribe(value => {
        this.alertTimeOut(value.error, value.message)
      });
  }

  alertTimeOut(error: boolean, message: string){
    this.alertMessage = message;
    this.show = error;

    setTimeout(() => this.show = false, 2000);
  }
}
