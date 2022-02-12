import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @Output() updateStars = new EventEmitter<number>();
  @Input() score: number = 1;
  iconRegular: String = "fa-regular";
  iconSolid: String = "fa-solid";
  iconName: String = "fa-regular";

  selected: boolean = false;
  shouldBeSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateStarIcon(isSelected?: boolean) {
    if (isSelected != null) {
      this.selected = isSelected;
    }
    this.iconName = (this.shouldBeSelected || this.selected) ? this.iconSolid: this.iconRegular;
  }

  onMouseOver() {
    this.updateStarIcon(true);
    this.updateStars.emit(this.score);
  }

  onMouseOut() {
    this.updateStars.emit(0);
    this.updateStarIcon(false);
  }

  shouldSelect(value: boolean) {
    this.shouldBeSelected = value;
    this.updateStarIcon();
  }
}
