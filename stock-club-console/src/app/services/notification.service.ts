import { Injectable } from '@angular/core';
import { Notification } from '../common/types';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationStream: Subject<Notification> = new Subject<Notification>();
  public notifications: Observable<Notification> = this.notificationStream.asObservable();

  constructor() { }

  public addNotification(type: string, message: string, dismissible=false, duration=3000) {
    this.notificationStream.next(new Notification(type, message, dismissible, duration));
  }

  public getNotifications(): Observable<Notification> {
    return this.notifications;
  }
}
