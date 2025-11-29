import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  
  constructor(private router: Router) {
  }

  
  checkRoute(route: string): boolean {
    return this.router.url === route;
  }
  
}
