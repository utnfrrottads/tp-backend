import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StarComponent } from './star/star.component';

declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  isOnHover: boolean = false;
  isSelected: boolean = false;

  title: String = "Titulo";

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
}
