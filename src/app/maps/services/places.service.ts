import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService,
    private alertService: AlertService
  ) {
    this.getUserLocation();
  }


  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve( this.userLocation );
        },
        ( err ) => {
          // alert('No se pudo obtener la geolocalización')
          this.alertService.alertBox(true, 'No se pudo obtener la geolocalización');
          reject();
        }
      );


    });

  }


  getPlacesByQuery( query: string = '' ) {

    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.userLocation ) {
      this.alertService.alertBox(true, 'No hay userLocation');
      throw Error('No hay userLocation');
    }

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      });

  }

  deletePlaces() {
    this.places = [];
  }
}
