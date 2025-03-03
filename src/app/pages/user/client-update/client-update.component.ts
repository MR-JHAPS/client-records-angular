import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {

  public isModelOpen = false;

  openModel(){
    this.isModelOpen = true;
  }

  closeModel(){
    this.isModelOpen = false;
  }



}//ends class
