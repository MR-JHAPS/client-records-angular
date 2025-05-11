import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements OnInit {

  _elementRef = inject(ElementRef);
  _renderer = inject(Renderer2);


  ngOnInit(): void {
    this.setUpAnimation();
  }


  private setUpAnimation(){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
          if(entry.isIntersecting){
            this._renderer.addClass(entry.target , "animate-in");
          }
      })
    }, {threshold : 0.1} );
    observer.observe(this._elementRef.nativeElement);
  }//ends-method



}//ends directive
