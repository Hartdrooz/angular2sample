import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventService } from './shared/event.service';
import { Injectable } from '@angular/core';



@Injectable()
export class EventResolver implements Resolve<any> {

    constructor(private eventService:EventService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.eventService.getEvent(route.params['id']);
    }
}