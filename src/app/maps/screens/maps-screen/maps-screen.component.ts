import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-maps-screen',
  templateUrl: './maps-screen.component.html',
  styleUrls: ['./maps-screen.component.scss']
})
export class MapsScreenComponent {

  constructor(private placesService: PlacesService) { }

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }
}
