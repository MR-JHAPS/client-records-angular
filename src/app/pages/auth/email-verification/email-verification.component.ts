import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  imports: [RouterLink],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {

    route  = inject(ActivatedRoute);

    isEmailVerified = false;
    verificationCode : null | string;

    ngOnInit(): void {
       this.extractVerificationCode();
    }


    /* This extracts the verification code from the url */
    extractVerificationCode():void{
       this.route.queryParamMap.subscribe((param)=>{
        this.verificationCode = param.get("verification_code");
        })
    }

    


    







}
