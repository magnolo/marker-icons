import { Injectable } from '@angular/core';

import * as Markers from './../icons/marker-icons';

@Injectable({
  providedIn: 'root'
})
export class MarkerIconsService {

  constructor() { }

  public getIcon(iconName: string) {
    // console.log();
    if (!Markers[iconName]) {
      console.warn(
        `We could not find the marker Icon with the name ${iconName}, did you add it to the Icon registry?`
      );
      return {
        name: '',
        data: null
      };
    }
    // return this.registry.get(iconName);
    // const icon = await import('../../icons');

    return Markers[iconName].data;
  }
}
