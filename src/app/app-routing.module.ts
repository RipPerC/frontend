import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { SeriesComponent } from './pages/series/series.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BooksComponent } from './pages/books/books.component';
import { TecasComponent } from './pages/tecas/tecas.component';

const routes: Routes = [
  { path: 'tecas', component: TecasComponent },
  { path: 'tecas/films', component: FilmsComponent },
  { path: 'tecas/series', component: SeriesComponent },
  { path: 'tecas/books', component: BooksComponent },
  { path: '', redirectTo: '/tecas', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
