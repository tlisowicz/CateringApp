import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';

@Component({
	selector: 'carousel',
	standalone: true,
	imports: [NgbCarouselModule, NgIf, NgFor],
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
	@Input() images: string[] = [];
}
