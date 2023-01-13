import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-window-content',
	standalone: true,
  templateUrl: './modal-window-content.html',
})

export class ModalContent {
	@Input() content: string='';
  @Input() header: string='';
  @Output() close: any = new EventEmitter<any>();

	constructor(public activeModal: NgbActiveModal) { }

  closed() {
    this.close.emit();
  }
}

@Component({ 
  selector: 'modal-window', 
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'] })

export class ModalWindowComponent {

  @Input() content: string = '';
  @Input() header: string = '';
  @Input() close: any;
  @Output() closed: any =  new EventEmitter<any>();

	constructor(private modalService: NgbModal) {}

	open() {
		const modalRef = this.modalService.open(ModalContent);
		modalRef.componentInstance.content = this.content;
		modalRef.componentInstance.header = this.header;
    modalRef.componentInstance.close.subscribe(() => {
      this.closed.emit();
    });
	}

  ngOnInit(): void {
    this.open();
  }
}

