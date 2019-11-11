import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VulnerabilityResponse } from '../modelo/vulnerability.response';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  
export class RestApiService {

     // Define API
  apiURL = 'http://localhost:8181/app/v1/vulnerability?costumerName=cyxtera';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getEmployees(): Observable<VulnerabilityResponse> {
    return this.http.get<VulnerabilityResponse>(this.apiURL, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
  