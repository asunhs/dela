import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[delaFolder]'
})
export class FolderDirective implements AfterContentInit   {

  fold = true;
  @Input() delaFolder: string;

  constructor(private el:ElementRef) { }

  ngAfterContentInit() {
    this.setStyle();
  }
  
  toggle() {
    this.fold = !this.fold;
    this.setStyle();
  }

  setStyle() {
    if (this.fold) {
      this.el.nativeElement.style.height = this.delaFolder || "auto";
    } else {
      this.el.nativeElement.style.height = null;
    }
  }

}
