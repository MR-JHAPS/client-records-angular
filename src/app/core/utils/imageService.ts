// // image.service.ts
// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { map, Observable } from 'rxjs';
// import { AuthServiceService } from '../auth/services/auth-service.service';

// @Injectable({ providedIn: 'root' })
// export class ImageService {
//   constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

//   private _auth = inject(AuthServiceService);

//     getImage(imagePath: string): Observable<SafeUrl> {
//         return this.http.get(`${imagePath}`, {
//             headers: {
//                 'authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbInVzZXIiXSwic3ViIjoic21pdGhAZ21haWwuY29tIiwiaWF0IjoxNzQ2Mjg0MzIxLCJleHAiOjE3NDYyODc5MjF9.SG5mT_X8z4JCgn0qFcB0mVM95XXbdsPIPy7gguuVO-OFwN0NGip817oh3YOqwTG5ucgzDlS9HHfF1muypQ8ZqAeyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbInVzZXIiXSwic3ViIjoic21pdGhAZ21haWwuY29tIiwiaWF0IjoxNzQ2Mjg1NTMyLCJleHAiOjE3NDYyODkxMzJ9._O5jMyMJYujgI4WDQJLwqlQ8ccAz1KkfFDIWMoTfUJVTiX6Deh2VUEdMe3dasYSa_fS0gzsVBcYcVELexGXFYg`
//               }
//         })
//       }
//     }