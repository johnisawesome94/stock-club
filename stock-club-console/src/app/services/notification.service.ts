import { Injectable } from '@angular/core';
import { Notification } from '../common/types';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private transientNotificationStream: Subject<Notification> = new Subject<Notification>();
  public transientNotifications: Observable<Notification> = this.transientNotificationStream.asObservable();
  private transientNotificationQueue: Notification[] = [];
  private persistentNotificationStream: Subject<Notification> = new Subject<Notification>();
  public persistentNotifications: Observable<Notification> = this.persistentNotificationStream.asObservable();
  private persistentNotificationQueue: Notification[] = [];

  constructor() { }

  public addNotification(type: string, message: string, dismissible=false, duration=3000) {
    if (dismissible) {
      this.persistentNotificationQueue.push(new Notification(type, message, dismissible, duration))
      if (this.persistentNotificationQueue.length === 1) {
        this.sendNotification(this.persistentNotificationQueue[0]);
      }
    } else {
      this.transientNotificationQueue.push(new Notification(type, message, dismissible, duration))
      if (this.transientNotificationQueue.length === 1) {
        this.sendNotification(this.transientNotificationQueue[0]);
      }
    }
  }

  public closePersistentNotification(): void {
    this.persistentNotificationQueue.shift();
    if (this.persistentNotificationQueue.length > 0) {
      this.sendNotification(this.persistentNotificationQueue[0]);
    }
  }

  public closeTransientNotification(): void {
    this.transientNotificationQueue.shift();
    if (this.transientNotificationQueue.length > 0) {
      this.sendNotification(this.transientNotificationQueue[0]);
    }
  }

  public getTransientNotifications(): Observable<Notification> {
    return this.transientNotifications;
  }

  public getPersistentNotifications(): Observable<Notification> {
    return this.persistentNotifications;
  }

  public dismissAllNotifications(): void {
    this.persistentNotificationStream.next(null);
    this.transientNotificationStream.next(null);
    this.persistentNotificationQueue = [];
    this.transientNotificationQueue = [];
  }

  private sendNotification(notification: Notification): void {
    if (notification.dismissible) {
      this.persistentNotificationStream.next(notification);
    } else {
      this.transientNotificationStream.next(notification);
    }
  }
}
