import { Component } from '@angular/core';
import { Article } from './Models/article';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'frontend-ecommerce';

  article = new Article('asd', 'test', 'testdesc', '50ml', ['fruta'], [{price:15.5, date: new Date()}])
  
}
