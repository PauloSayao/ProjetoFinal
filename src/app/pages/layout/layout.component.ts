import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,CartComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
