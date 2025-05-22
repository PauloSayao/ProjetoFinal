import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  contactEmail = 'privacidade@trufflesite.com';
  contactPhone = '(XX) XXXX-XXXX';
  lastUpdateDate = new Date().toLocaleDateString('pt-BR');
}
