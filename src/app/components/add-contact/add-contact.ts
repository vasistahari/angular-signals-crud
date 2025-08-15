import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactForm } from '../contact-form/contact-form';
import { Contact } from '../../modals/contact';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-contact',
  imports: [ContactForm, MatProgressSpinnerModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss',
})
export class AddContact {
  private router = inject(Router);
  private api = inject(ApiService);

  saving = signal(false);

  async addContact(newContact: Contact) {
    this.saving.set(true);
    await this.api.addContact(newContact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
