import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      console.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }

  handleWarningAlert() {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })
  }

  customDangerAlert(message?: any) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${message || 'Something went wrong!'}`
    })
  }
}
