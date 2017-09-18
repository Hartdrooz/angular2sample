import { JQ_TOKEN } from './jQuery.service';
import { Directive, OnInit, Inject, ElementRef,Input } from "@angular/core";

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    
    private el: HTMLElement;

    @Input('modal-trigger') 
    modalId: string;

    constructor(@Inject(JQ_TOKEN) private $: any,
                el: ElementRef){
        this.el = el.nativeElement;
    }

    ngOnInit(): void {
        
        this.el.addEventListener('click',(e) =>{
            this.$(`#${this.modalId}`).modal({});
        });
   
    }
}