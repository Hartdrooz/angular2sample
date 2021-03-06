import { ISession, IEvent } from './../shared/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from "@angular/router";


@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container: { padding-left:20px; padding-right: 20px; }
        .event-image: { height: 100px; }
        a {cursor: pointer;}
    `]
})
export class EventDetailsComponent implements OnInit {
    
    addMode: boolean;
    filterBy: string = "all";
    sortBy: string = 'votes';
    event: any;

    constructor (private eventService: EventService,
                 private route:ActivatedRoute) {}

    ngOnInit(): void {

        // Because we use the navigation in the modal
        // component we need to listen the params change
        // We use this because with use a resolver if not
        // we use the code below
        this.route.data.forEach(data => {
            this.event = data['event'];
            this.addMode = false;
        });

        // this.route.params.forEach((p:Params) => {            
        //     // this.eventService.getEvent(+p['id']).subscribe((event:IEvent) => {
        //     //     this.event = event;
        //     //     this.addMode = false;
        //     // });
        // });

        // const id = this.route.snapshot.params['id'];

        // // The + cast the string to a number
        // this.event = this.eventService.getEvent(+id);
    }

    addSession(){
        this.addMode = true;
    }

    saveNewSession(session:ISession){

        const nextId = Math.max.apply(null,this.event.sessions.map(s => s.id));

        session.id = nextId + 1;

        this.event.sessions.push(session);

        this.eventService.saveEvent(this.event).subscribe(event => {
            this.addMode = false;
        });
    }

    cancelAddSession(){
        this.addMode = false;
    }
}