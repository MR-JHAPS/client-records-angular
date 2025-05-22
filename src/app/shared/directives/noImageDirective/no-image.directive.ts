import { Directive, ElementRef, HostListener, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImage]',
  standalone: true
})


/* This directive adds a default profile image if the image is not present */
export class NoImageDirective{


  @Input() defaultImage: string = 'assets/images/defaultImage.png';

  //nodoDom stores a reference to the HTML element where the directive is used.
  private nodoDom : ElementRef = inject( ElementRef);
  //  renderer helps us change the element safely.
  private renderer: Renderer2 = inject( Renderer2);



  @HostListener("error")
  onError():void{
    this.renderer.setAttribute(this.nodoDom.nativeElement, "src", this.defaultImage)

  }

}
