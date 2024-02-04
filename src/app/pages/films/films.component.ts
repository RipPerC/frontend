import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Film } from 'src/app/interfaces/film.interface';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: [],
})
export class FilmsComponent implements OnInit, OnDestroy {
  public allFilms: Film[] = [];
  public allFilmsAux: Film[] = [];
  public pages: number = 1;
  public items: number = 10;
  public total: number = 0;
  public loading: boolean = true;

  constructor(private filmService: FilmService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading = true;
    this.filmService.loadFilms().subscribe((response: any) => {
      this.allFilms = response;
      this.allFilmsAux = response;
      this.total = this.allFilms.length;
      this.loading = false;
    });
  }

  search(word: string) {
    if (word.length === 0) {
      return (this.allFilms = this.allFilmsAux);
    }

    this.allFilms = this.allFilms.filter((obj) => {
      return obj.title.toLowerCase().includes(word.toLowerCase());
    });

    this.total = this.allFilms.length;
    return this.allFilms;
  }

  deleteFilm(film: Film) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Film to remove: ${film.title}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.filmService.deleteFilm(film).subscribe((resp) => {
          Swal.fire({
            title: 'Deleted!',
            text: `Film: ${film.title}`,
            icon: 'success',
          });
        });
      }
    });
    this.loadFilms();
  }

  downloaded(film: Film) {
    this.filmService.updateOrCreateFilm(film).subscribe((resp) => {
      Swal.fire({
        title: 'Updated!!',
        text: `Film: ${film.title}`,
        icon: 'success',
      });
      this.loadFilms();
    });
  }
}
