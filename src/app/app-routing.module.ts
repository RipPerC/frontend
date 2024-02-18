import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { SeriesComponent } from './pages/series/series.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BooksComponent } from './pages/books/books.component';
import { TecasComponent } from './pages/tecas/tecas.component';
import { FilmComponent } from './pages/films/film.component';
import { AuxiliariesComponent } from './pages/auxiliaries/auxiliaries/auxiliaries.component';
import { BooksagesComponent } from './pages/auxiliaries/booksages/booksages.component';
import { BookComponent } from './pages/books/book.component';

const routes: Routes = [
  {
    path: 'tecas',
    component: TecasComponent,
    data: { section: 'Tecas', title: 'Main' },
  },
  {
    path: 'tecas/films',
    component: FilmsComponent,
    data: { section: 'Tecas', title: 'Films' },
  },
  {
    path: 'tecas/films/new',
    component: FilmComponent,
    data: { section: 'Tecas', title: 'New Film' },
  },
  {
    path: 'tecas/series',
    component: SeriesComponent,
    data: { section: 'Tecas', title: 'Series' },
  },
  {
    path: 'tecas/books',
    component: BooksComponent,
    data: { section: 'Tecas', title: 'Books' },
  },
  {
    path: 'tecas/books/new',
    component: BookComponent,
    data: { section: 'Tecas', title: 'New Book' },
  },
  {
    path: '',
    redirectTo: '/tecas',
    pathMatch: 'full',
    data: { section: 'Tecas', title: 'Main' },
  },
  {
    path: 'auxiliaries',
    component: AuxiliariesComponent,
    data: { section: 'Auxiliaries', title: 'Main' },
  },
  {
    path: 'auxiliaries/sages',
    component: BooksagesComponent,
    data: { section: 'Auxiliaries', title: 'Books Sages' },
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
