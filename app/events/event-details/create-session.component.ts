import { ISession } from './../shared/event.model';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
    templateUrl: 'app/events/event-details/create-session.component.html'
})
export class CreateSessionComponent implements OnInit {
    
    newSessionForm: FormGroup;
    abstract: FormControl;
    level: FormControl;
    duration: FormControl;
    presenter: FormControl;
    name:FormControl;


    ngOnInit(): void {
        this.name = new FormControl('',Validators.required);
        this.presenter = new FormControl('',Validators.required);
        this.duration = new FormControl('',Validators.required);
        this.level = new FormControl('',Validators.required);
        this.abstract = new FormControl('',[
            Validators.required,
            Validators.maxLength(400),
            this.restrictedWord(['foo','bar'])
        ]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        });
    }

    saveSession(formValues){
        const session:ISession = {
            id: undefined,
            name: formValues.name,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            duration: formValues.duration,
            level: formValues.level,
            voters: []
        }
    }

    // Function for custom validator
    private restrictedWord(words:string[]){
        return (control: FormControl) => {

            if (!words) return null;

            const invalidWords = 
                words.map(w => control.value.include(w) ? w : null)
                     .filter(w => w != null);

            return invalidWords && invalidWords.length > 0
                 ? {'restrictedWords' : invalidWords.join(', ')}
                 : null;
        }
    }


}