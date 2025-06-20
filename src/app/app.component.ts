import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInitService } from './shared/services/app-init.service';

@Component({
  selector: 'app-root',
  standalone: true, //added here too..? i dont remember if it was me or not
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ecommerce_practice';
  private appInitService = inject(AppInitService);

  async ngOnInit() {
    // Initialize app and load persisted data
    await this.appInitService.initializeApp();
  }
}
