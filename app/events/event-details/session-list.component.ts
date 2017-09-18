import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { ISession } from './../shared/event.model';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {

    @Input()
    sessions:ISession[];

    @Input()
    filterBy: string;

    @Input()
    sortBy: string;

    visibleSessions: ISession[];

    constructor(private auth:AuthService,
                private voterService:VoterService){}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.sessions){
            this.filterSession(this.filterBy);
            this.sortBy === 'name'
                ? this.visibleSessions.sort(this.sortByNameAsc)
                : this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    filterSession(filter): any {
        
        if (filter === 'all'){
            // The slice create duplicate of the element
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(s => {
                return s.level.toLocaleLowerCase() === filter;
            });
        }
        
    }

    toggleVote(session: ISession){
        if (this.userHasVoted(session)){
            this.voterService.deleteVoter(session,this.auth.currentUser.userName);
        }else{
            this.voterService.addVoter(session,this.auth.currentUser.userName);
        }

        if (this.sortBy === 'votes'){
            this.visibleSessions.sort(this.sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session,this.auth.currentUser.userName);
    }

    private sortByNameAsc(s1: ISession, s2: ISession): number {
        
        if (s1.name > s2.name) return 1;
        else if (s1.name === s2.name) return 0
        else return -1;
    }


    private sortByVotesDesc(s1: ISession, s2: ISession):number { 
        return s2.voters.length - s1.voters.length;
    }
}