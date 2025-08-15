import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Contact } from '../../modals/contact';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  title = input<string>('');
  contact = input<Contact>();
  type = input<'add' | 'edit'>('add');

  name = linkedSignal(() => this.contact()?.name ?? '');
  email = linkedSignal(() => this.contact()?.email ?? '');
  phone = linkedSignal(() => this.contact()?.phone ?? '');

  save = output<Contact>();

  onSubmit() {
    this.save.emit({
      id: this.contact()?.id ?? '',
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
  }
}
