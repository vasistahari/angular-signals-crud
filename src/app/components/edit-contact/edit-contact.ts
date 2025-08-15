import { Component, computed, inject, input, resource, signal } from '@angular/core';
import { ContactForm } from '../contact-form/contact-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Contact } from '../../modals/contact';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-contact',
  imports: [ContactForm, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './edit-contact.html',
  styleUrl: './edit-contact.scss',
})
export class EditContact {
  id = input.required<string>();
  private router = inject(Router);

  private apiService = inject(ApiService);

  saving = signal(false);

  loading = computed(() => this.contactResource.isLoading() || this.saving());

  contactResource = resource({
    loader: () => this.apiService.getContact(this.id()),
  });

  async updateContact(contact: Contact) {
    this.saving.set(true);
    await this.apiService.updateContact(contact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
