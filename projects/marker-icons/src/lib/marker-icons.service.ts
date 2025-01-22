import { Injectable } from '@angular/core';

import * as Markers from './../icons/';

@Injectable({
  providedIn: 'root',
})
export class MarkerIconsService {
  constructor() {}

  public async getIcon(iconName: string) {
    if (!iconName) {
      console.warn(
        `You have to provide a name for the icon. Couldnt find one.`
      );
      return {
        name: '',
        data: null,
      };
    }

    // console.log();
    const name = 'marker' + this.capitalize(this.toCamelCase(iconName));

    const icon = await(import(`../icons/marker-icons/marker-${iconName}.icon.mjs`));

    if (!icon) {
      console.warn(
        `We could not find the marker Icon with the name ${iconName} by ${name}.`
      );
      return {
        name: '',
        data: null,
      };
    }
    // return this.registry.get(iconName);
    // const icon = await import('../../icons');

    return icon[name].data;
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
