import { ModalTriggerDirective } from './common/modalTrigger.directive';
import { SimpleModalComponent } from './common/simpleModal.component';
import { JQ_TOKEN } from './common/jQuery.service';
import { DurationPipe } from './events/shared/duration.pipe';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './user/auth.service';
import { userModule } from './user/user.module';
import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouterActivator,
    EventListResolver
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { RouterModule } from "@angular/router";
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';

declare const toastr:Toastr;
declare const jQuery: Object;

@NgModule({
    imports: [ 
        BrowserModule,
        userModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        CreateSessionComponent,
        NavBarComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        ModalTriggerDirective,
        SimpleModalComponent,
        Error404Component
    ],
    providers: [
        EventService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventRouterActivator,
        EventListResolver,
        AuthService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component: CreateEventComponent){
    if (component.isDirty){
        return window.confirm('You have not saved this event, do you really want to cancel ?');
    }
    return true;
}