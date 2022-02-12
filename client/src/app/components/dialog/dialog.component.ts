import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { StarComponent } from './star/star.component';

declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  @Input() title: String = "AVISO";
  @Input() message: String = "";
  @Input() imageSrc: String = "";
  @Input() isReview: boolean = false;
  @Input() hasCancelButton: boolean = true;
  @Input() disableOkButton: boolean = false;

  @ViewChild('oneStar') oneStar?: StarComponent;
  @ViewChild('twoStars') twoStars?: StarComponent;
  @ViewChild('threeStars') threeStars?: StarComponent;
  @ViewChild('fourStars') fourStars?: StarComponent;
  @ViewChild('fiveStars') fiveStars?: StarComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  updateStars(score: number) {
    this.oneStar?.shouldSelect((score >= 1));
    this.twoStars?.shouldSelect((score >= 2));
    this.threeStars?.shouldSelect((score >= 3));
    this.fourStars?.shouldSelect((score >= 4));
    this.fiveStars?.shouldSelect((score === 5));
  }

  willSelect(score: number) {
    this.disableOkButton = false;
    this.updateStars(score);
    this.oneStar?.didSelect();
    this.twoStars?.didSelect();
    this.threeStars?.didSelect();
    this.fourStars?.didSelect();
    this.fiveStars?.didSelect();
  }
}
