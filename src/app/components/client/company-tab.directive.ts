import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[active-tab]'
})
export class CompanyTabDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
