import { Observable } from 'rxjs/Observable';
import { ISession } from './../shared/event.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class VoterService {

    constructor(private http:Http){

    }

    deleteVoter(eventId: number, session:ISession,voterName:string){
        session.voters = session.voters.filter(v => v !== voterName);

        const url = `/api/events/${eventId}/sessions/${session.id}
        /voters/${voterName}`;

        this.http.delete(url)
                 .catch(this.handleError)
                 .subscribe();
    }

    addVoter(eventId: number, session:ISession, voterName: string){
        session.voters.push(voterName);

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options = new RequestOptions({headers:headers});

        const url = `/api/events/${eventId}/sessions/${session.id}
                    /voters/${voterName}`;

        this.http.post(url,JSON.stringify({}),options)
                 .catch(this.handleError)
                 .subscribe();
    }

    userHasVoted(session:ISession, voterName: string){
        return session.voters.some(v => v === voterName);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }

}