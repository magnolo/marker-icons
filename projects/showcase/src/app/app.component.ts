import { Component, signal } from '@angular/core';
// import * as Markers from '../../../marker-icons/src/icons';
import { MarkerIconsComponent } from 'projects/marker-icons/src/public-api';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [MarkerIconsComponent, NgStyle, FormsModule],
    styleUrls: ['./app.component.scss']
  })
export class AppComponent {
  title = 'marker-test';
  size: number = 50;
  color: string = '#ff0000';


  markerName = signal<string>('aerialway')
  // allMarkers = Object.values(Markers).map((item) => item.name);
  
}
