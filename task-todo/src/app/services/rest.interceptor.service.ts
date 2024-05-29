import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { EventEmitter, Injectable, Signal, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


const reLoginEvent = new EventEmitter<void>(); // Define event type (optional)
const getAuthenticationToken = signal("");

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authToken = getAuthenticationToken(); // Replace with your actual token retrieval logic 

    const headers: any = {
        'Content-Type': 'application/json',
        'Accept': "*/*"
    }
    if (authToken.length > 0) {
        headers.Authorization = authToken;
    }
    const authReq = req.clone({
        setHeaders: headers
    });
    // return// Chain the interceptor to handle successful responses as well as errors
    return next(authReq).pipe(
        catchError(error => {
            console.error('API Error:', error); // Log the error details to the console
            // Optionally handle specific error types here (e.g., authentication failures, network issues)
            if (error.statusText === "Unauthorized") {
                reLoginEvent.emit();
            }

            // Return an appropriate error response to the caller
            return throwError(() => error);
        })
    );;
};

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    event: EventEmitter<void> = reLoginEvent;
    token = getAuthenticationToken;
} 