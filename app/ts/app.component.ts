import { Component } from '@angular/core';
import { DrawComponent } from './draw-panel.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/app.component.html',
  styleUrls: ['app/css/app.component.css'],
  directives: [DrawComponent]
})

export class AppComponent { }
