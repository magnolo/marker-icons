import { ChangeDetectionStrategy, Component, ElementRef, Input, HostBinding, PLATFORM_ID, inject, input, linkedSignal, effect } from '@angular/core';
import { MarkerIconsService} from './marker-icons.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'marker-icons',
    template: `
    <ng-content></ng-content>
  `,
    styleUrls: ['./marker-icons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerIconsComponent {
  private element = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);
  private markerIconsService = inject(MarkerIconsService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT, { optional: true });

  private svgIcon: SVGElement;

  name = input.required<string>();


  private onNameChange = effect(() => {
    const iconName = this.name();
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    this.render(iconName)
  })

  readonly color = input('#ff0000');
  readonly size = input(50);

  @HostBinding('attr.style')
  public get style() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--fill-color: ${this.color()}; --size: ${this.size()}px`
    );
  }

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
