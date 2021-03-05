import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() searchBar = false
  @Output() searchActive = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(text: string){
    this.searchActive.emit(text)
  }

  onTxtBoxChanged(text: string){
    if(text.length==0){
      this.searchActive.emit('')
    }
  }

}
