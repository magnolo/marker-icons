import { Injectable } from '@angular/core';

import * as Markers from './../icons/marker-icons';

@Injectable({
  providedIn: 'root',
})
export class MarkerIconsService {
  constructor() {}

  public getIcon(iconName: string) {
    // console.log();
    const name = 'marker' + this.capitalize(this.toCamelCase(iconName));
  
    if (!Markers[name]) {
      console.warn(
        `We could not find the marker Icon with the name ${iconName} by ${name}, did you add it to the Icon registry?`
      );
      return {
        name: '',
        data: null,
      };
    }
    // return this.registry.get(iconName);
    // const icon = await import('../../icons');

    return Markers[name].data;
  }

  private toCamelCase(name) {
    return name
      .split('-')
      .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1))
      .split('_')
      .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1));
  }

  private capitalize(name){
    if (typeof name !== 'string'){
      return '';
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
