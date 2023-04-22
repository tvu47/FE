import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[history-tab]'
})
export class DirectDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
