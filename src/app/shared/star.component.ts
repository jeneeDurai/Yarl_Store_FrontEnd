import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
  starClassName = "star-rating-blank";

  @Input() starId: number;
  starWidth: number;
  @Input() rating: number;
  @Input() ratingKind: string;

  @Output() ratingEnter: EventEmitter<number> = new EventEmitter<number>();
  @Output() ratingLeave: EventEmitter<number> = new EventEmitter<number>();
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges() {
    this.starWidth = this.rating * 150/5
  }

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }

  }
  onRatingEnter() {
    this.ratingEnter.emit(this.starId);

  }
  onRatingLeave() {
    this.ratingLeave.emit();

  }
  onRatingClick() {
    this.ratingClicked.emit(this.starId);
  }
}
