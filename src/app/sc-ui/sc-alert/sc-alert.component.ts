import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sc-alert',
  templateUrl: './sc-alert.component.html',
  styleUrl: './sc-alert.component.css',
})
export class ScAlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'success';
  @Input() isVisible = false;
}
