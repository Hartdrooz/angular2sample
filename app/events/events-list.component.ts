import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';

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
                <!--
                <event-thumbnail #thumbnail                     
                    [event]="event" (eventClick)="handleEventClicked($event)">
                </event-thumbnail>            
                -->
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
  
    events: any[];

    constructor(private eventService: EventService,
                private toastrService: ToastrService){        
    }

    ngOnInit(): void {
      this.events = this.eventService.getEvents();
    }    

    handleEventClicked(data){
        console.log(data);
    }

    handleThumbnailClick(event){
        this.toastrService.info(event);
    }
}