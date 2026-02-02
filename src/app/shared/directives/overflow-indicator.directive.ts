import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostListener
} from '@angular/core';

 /* 
  *  The following directives check if the element have overflow 
  *  accordingly the sides will be masked with specific classes
  *  the mask effect is declared in master style.css
 */

@Directive({
  selector: '[appOverflowXIndicator]'
})
export class OverflowXIndicatorDirective implements AfterViewInit {

  private readonly THRESHOLD = 1; // overflow tollerance in px

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.checkOverflow();
  }

  @HostListener('scroll')
  onScroll(): void {
    this.checkOverflow();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkOverflow();
  }

  private checkOverflow(): void {
    const el = this.el.nativeElement;

    // horizontal
    const hasOverflowLeft = el.scrollLeft > this.THRESHOLD;
    const hasOverflowRight =
      el.scrollLeft + el.clientWidth < el.scrollWidth - this.THRESHOLD;

    this.toggle('has-overflow-left', hasOverflowLeft);
    this.toggle('has-overflow-right', hasOverflowRight);
  }

  private toggle(className: string, active: boolean): void {
    if (active) {
      this.renderer.addClass(this.el.nativeElement, className);
    } else {
      this.renderer.removeClass(this.el.nativeElement, className);
    }
  }
}

@Directive({
  selector: '[appOverflowYIndicator]'
})
export class OverflowYIndicatorDirective implements AfterViewInit {

  private readonly THRESHOLD = 1; // overflow tollerance in px

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.checkOverflow();
  }

  @HostListener('scroll')
  onScroll(): void {
    this.checkOverflow();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkOverflow();
  }

  private checkOverflow(): void {
    const el = this.el.nativeElement;

    // vertical
    const hasOverflowTop = el.scrollTop > this.THRESHOLD;
    const hasOverflowBottom =
      el.scrollTop + el.clientHeight < el.scrollHeight - this.THRESHOLD;

    this.toggle('has-overflow-top', hasOverflowTop);
    this.toggle('has-overflow-bottom', hasOverflowBottom);
  }

  private toggle(className: string, active: boolean): void {
    if (active) {
      this.renderer.addClass(this.el.nativeElement, className);
    } else {
      this.renderer.removeClass(this.el.nativeElement, className);
    }
  }
}

@Directive({
  selector: '[appOverflowIndicator]'
})
export class OverflowIndicatorDirective implements AfterViewInit {

  private readonly THRESHOLD = 1; // overflow tollerance in px

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.checkOverflow();
  }

  @HostListener('scroll')
  onScroll(): void {
    this.checkOverflow();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkOverflow();
  }

  private checkOverflow(): void {
    const el = this.el.nativeElement;

    // horizontal
    const hasOverflowLeft = el.scrollLeft > this.THRESHOLD;
    const hasOverflowRight =
      el.scrollLeft + el.clientWidth < el.scrollWidth - this.THRESHOLD;

    // vertical
    const hasOverflowTop = el.scrollTop > this.THRESHOLD;
    const hasOverflowBottom =
      el.scrollTop + el.clientHeight < el.scrollHeight - this.THRESHOLD;

    this.toggle('has-overflow-left', hasOverflowLeft);
    this.toggle('has-overflow-right', hasOverflowRight);
    this.toggle('has-overflow-top', hasOverflowTop);
    this.toggle('has-overflow-bottom', hasOverflowBottom);
  }

  private toggle(className: string, active: boolean): void {
    if (active) {
      this.renderer.addClass(this.el.nativeElement, className);
    } else {
      this.renderer.removeClass(this.el.nativeElement, className);
    }
  }
}
