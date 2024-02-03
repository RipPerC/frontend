import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menus: any[] = [
    {
      icon: 'mdi mdi-widgets',
      titulo: 'Tecas',
      submenu: [
        { titulo: 'Main', path: 'tecas' },
        { titulo: 'Books', path: 'tecas/books' },
        { titulo: 'Films', path: 'tecas/films' },
        { titulo: 'Series', path: 'tecas/series' },
      ],
    },
  ];

  constructor() {}
}
