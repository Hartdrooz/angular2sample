import { IEvent } from './shared/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({    
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>        
        <hr/>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
            <event-thumbnail #thumbnail                     
                [event]="event" (click)="handleThumbnailClick(event.name)">
            </event-thumbnail>                   
            </div>
        </div>
        <!-- Demo for ref to child
        <h3>{{thumbnail.someProperty}}</h3>
        <button class="btn btn-primary" (click)="thumbnail.logFoo()">
            Log me some foo
        </button>
        -->
    </div>    
    `
})
export class EventsListComponent implements OnInit {
  
    events: IEvent;

    constructor(private eventService: EventService,
                private route:ActivatedRoute){        
    }

    ngOnInit(): void {

        // Get data from resolver
        this.events = this.route.snapshot.data['events'];

    //    this.eventService.getEvents().subscribe(events => {
    //        this.events = events;
    //    });
    }    

    handleEventClicked(data){
        console.log(data);
    }

    handleThumbnailClick(event){

    }
}