import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  HostBinding,
  PLATFORM_ID
} from '@angular/core';
import { MarkerIconsService} from './marker-icons.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'marker-icons',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./marker-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerIconsComponent {
  private svgIcon: SVGElement;

  @Input()
  set name(iconName) {
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    this.render(iconName);
  }

  @Input() color = '#ff0000';
  @Input() size = 50;

  @HostBinding('attr.style')
  public get style() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--fill-color: ${this.color}; --size: ${this.size}px`
    );
  }

  constructor(
    private element: ElementRef,
    private sanitizer: DomSanitizer,
    private markerIconsService: MarkerIconsService,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }

  render(iconName) {
    if (isPlatformBrowser(this.platformId)) {
      const svgData = this.markerIconsService.getIcon(iconName);
      this.svgIcon = this.svgElementFromString(svgData);
      this.element.nativeElement.appendChild(this.svgIcon);
    }
  }
}
