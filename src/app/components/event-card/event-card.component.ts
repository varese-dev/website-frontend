import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() eventTitle: string = '';
  @Input() eventDate: string = '';
  @Input() eventLocation: string = '';

  constructor() {}
}
