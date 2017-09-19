import { EventService } from './shared/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
    templateUrl: 'app/events/create-event.component.html',
    styles:[`
        em: { float: right; color:#E05C65; padding-left: 10px;}
        .error input {background-color:#E3C3C5;}
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color:#999; }
        .error :ms-input-placeholder { color: #999; }
        em { float: right;color:#E05C65;padding-left:10px; }
    `]    
})
export class CreateEventComponent implements OnInit {

    isDirty: boolean = true;

    event: any;

    constructor(private router:Router,
                private eventService: EventService){}

    ngOnInit(): void {
        // How to init data in reactive form
        // this.event = {
        //     name: 'Ng Spectacular',
        //     date: '8/8/2028',
        //     time: '10am',
        //     price: 799.99,
        //     location: {
        //         address: '456 Happy St',
        //         city: 'Felicity',
        //         country: 'Angularistan'
        //     },
        //     onlineUrl: 'http://ngSpectacular.com',
        //     imageUrl: 'http://ngSpectacular.com/logo.png'
        // };
    }
            
    saveEvent(formValues){
        this.eventService.saveEvent(formValues).subscribe(event => {
            this.isDirty = false;
            this.router.navigate(['/events']);
        });
    }

    cancel(){
        this.router.navigate(['/events']);
    }

}