import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  HostBinding,
  PLATFORM_ID,
  inject,
  input,
  linkedSignal,
  effect,
  resource,
} from "@angular/core";
import { MarkerIconsService } from "./marker-icons.service";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "marker-icons",
  template: ` <ng-content></ng-content> `,
  styleUrls: ["./marker-icons.component.scss"],
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

  icon = resource({
    request: () => this.name(),
    loader: ({ request, abortSignal }): Promise<string> => {
      // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
      // indicates that the request has been aborted.
      return this.markerIconsService.getIcon(request);
    },
  });

  private onNameChange = effect(() => {
    const icon = this.icon.value();
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    this.render(icon);
  });

  readonly color = input("#ff0000");
  readonly size = input(50);

  @HostBinding("attr.style")
  public get style() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--fill-color: ${this.color()}; --size: ${this.size()}px`,
    );
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement("DIV");
    div.innerHTML = svgContent;
    return (
      div.querySelector("svg") ||
      this.document.createElementNS("http://www.w3.org/2000/svg", "path")
    );
  }

  render(icon) {
    if (isPlatformBrowser(this.platformId)) {
      this.svgIcon = this.svgElementFromString(icon);
      this.element.nativeElement.appendChild(this.svgIcon);
    }
  }
}
