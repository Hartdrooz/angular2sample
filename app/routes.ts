import { EventResolver } from './events/event-resolver.service';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { Routes } from '@angular/router';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventRouterActivator } from './events/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent,
     canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent, resolve: {
        events: EventListResolver
    } },
    { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver} },       
    // { path: 'events/:id', component: EventDetailsComponent, canActivate:[EventRouterActivator] },   
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component }, 
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    // First path is name of the file and after the # the name of the class
    { path: 'user', loadChildren: 'app/user/user.module#userModule' }
];

