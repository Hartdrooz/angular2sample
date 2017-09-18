import { ISession } from './../shared/event.model';
import { Injectable } from '@angular/core';


@Injectable()
export class VoterService {

    deleteVoter(session:ISession,voterName:string){
        session.voters = session.voters.filter(v => v !== voterName);
    }

    addVoter(session:ISession, voterName: string){
        session.voters.push(voterName);
    }

    userHasVoted(session:ISession, voterName: string){
        return session.voters.some(v => v === voterName);
    }

}