import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FilmsComponent } from './pages/films/films.component';
import { SeriesComponent } from './pages/series/series.component';
import { BooksComponent } from './pages/books/books.component';
import { TecasComponent } from './pages/tecas/tecas.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    NotfoundComponent,
    FilmsComponent,
    SeriesComponent,
    BooksComponent,
    TecasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
