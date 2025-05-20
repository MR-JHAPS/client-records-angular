import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit{

  private  _activatedRoute = inject(ActivatedRoute);
  errorCode : string | null = null ;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((param)=>{
      this.errorCode = param.get("code");
    });
  }

}
