import { Routes } from '@angular/router';
import { ContactList } from './components/contact-list/contact-list';
import { AddContact } from './components/add-contact/add-contact';
import { EditContact } from './components/edit-contact/edit-contact';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContactList,
  },
  {
    path: 'add',
    component: AddContact,
  },
  {
    path: 'edit/:id',
    component: EditContact,
  },
];
