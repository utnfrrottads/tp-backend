import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @Output() updateStars = new EventEmitter<number>();
  @Output() willSelect = new EventEmitter<number>();

  @Input() score: number = 1;

  iconRegular: String = "fa-regular";
  iconSolid: String = "fa-solid";
  iconName: String = "fa-regular";

  isMouseOver: boolean = false;
  shouldBeSelected: boolean = false;
  canSelect: boolean = true;
  isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateStarIcon(isMouseOver?: boolean) {
    if (isMouseOver != null) {
      this.isMouseOver = isMouseOver;
    }
    if ((this.shouldBeSelected || this.isMouseOver) && this.canSelect) {
      this.iconName = this.iconSolid;
    } else {
      this.iconName = (this.isSelected) ? this.iconSolid: this.iconRegular;
    }
  }

  onMouseOver() {
    this.updateStarIcon(true);
    this.updateStars.emit(this.score);
  }

  onMouseOut() {
    this.updateStars.emit(0);
    this.updateStarIcon(false);
  }

  onClick() {
    if (this.canSelect) {
      this.isSelected = true;
      this.willSelect.emit(this.score);
    }
  }

  shouldSelect(value: boolean) {
    this.shouldBeSelected = value;
    this.updateStarIcon();
  }

  didSelect() {
    if (this.shouldBeSelected) {
      this.isSelected = true;
      this.updateStarIcon();
    }
    this.canSelect = false;
  }
}
