import { Directive,
         ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rootHost]',
})
export class RootHost {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {}
}
