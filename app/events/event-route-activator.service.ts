import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EventService } from './shared/event.service';
import { Observable } from "rxjs/Observable";


@Injectable()
export class EventRouterActivator implements CanActivate {
    
    constructor(private eventService:EventService,
                private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        const eventExits = !!this.eventService.getEvent(+route.params['id']);

        if (!eventExits){
            this.router.navigate(['/404']);
        }

        return eventExits;
    }    
}