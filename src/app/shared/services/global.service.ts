import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
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

  handleWarningAlert(text: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: `${text}` || 'are you sure you want to do this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
  }

  customDangerAlert(message?: any) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${message || 'Something went wrong!'}`
    })
  }

  customNotification(text?: string) {
    return Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${text || 'Completed successfully'}`,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
