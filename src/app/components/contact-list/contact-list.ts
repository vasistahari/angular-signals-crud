import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [MatListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit, AfterViewInit {
  apiService = inject(ApiService);

  contactsResource = resource({
    loader: () => {
      return this.apiService.getContacts();
    },
  });

  deleting = signal<boolean>(false);
  loading = computed(() => this.contactsResource.isLoading() || this.deleting());

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.apiService.deleteContact(id);
    this.deleting.set(false);
    this.contactsResource.reload();
  }

  ngOnInit(): void {
    // console.log('hi');
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('contactsResource', this.contactsResource.value());
  }
}
