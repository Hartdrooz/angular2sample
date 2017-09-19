import { Observable } from 'rxjs/Observable';
import { ISession } from './../shared/event.model';
import { VoterService } from './voter.service';


describe('VoterService', () => {

    let voterService: VoterService;
    let mockHttp:any;

    beforeEach(() => {

        mockHttp = jasmine.createSpyObj('mockHttp',['delete','post']);

        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter',() => {

        it ('should remove the voter from the list of voters',() => {
            let session = {
                id: 6,
                voters: ['joe','john']
            };

            mockHttp.delete.and.returnValue(Observable.of(false));
            
            voterService.deleteVoter(6,<ISession>session,'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');

        });

        it('should call http.delete with the right url',() => {

            let session = {
                id: 6,
                voters: ['joe','john']
            };

            mockHttp.delete.and.returnValue(Observable.of(false));
            
            voterService.deleteVoter(6,<ISession>session,'joe');    
            
            expect(mockHttp.delete).toHaveBeenCalledWith('... add good url');

        });        

    });

    describe('addVoter',() => {

        it('should call http.post with the right url',() => {

            let session = {
                id: 6,
                voters: ['joe']
            };

            mockHttp.post.and.returnValue(Observable.of(false));
            
            voterService.addVoter(6,<ISession>session,'joe');    
            
            expect(mockHttp.post).toHaveBeenCalledWith('... add good url',{},jasmine.any(Object));

        });           

    });

});