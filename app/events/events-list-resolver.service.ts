import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventService } from './shared/event.service';


@Injectable()
export class EventListResolver implements Resolve<any>{
    
    constructor(private eventService:EventService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.eventService.getEvents();
        // return this.eventService.getEvents().map(events => {return events;});
    }

}