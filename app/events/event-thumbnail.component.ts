import { IEvent } from './shared/event.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]"  class='well hoverwell thumbnail'>
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date : {{event?.date}}</div>      
        <div [ngClass]="{green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}"
             [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>          
        <div>Price: {{event?.price | currency:'USD':true}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location.address}}</span>            
            <span class="pad-left">{{event?.location.city}}, {{event?.location.country}}</span>
        </div>
        <!--
        <button class="btn btn-primary" (click)="handleClickMe()">Click me!</button>
        -->
    </div>    
    `,
    styles: [`
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px; }
        .green { color: #003300!important; }
        .bold { font-weight: bold; }
    `]
})
export class EventThumbnailComponent {
        
    @Input() 
    event: IEvent;
     
    @Output() 
    eventClick = new EventEmitter();

    someProperty:string = "Some Value";

    handleClickMe(){
         this.eventClick.emit(this.event.name);
    }

    logFoo(){
        console.log('Log foo');
    }
}