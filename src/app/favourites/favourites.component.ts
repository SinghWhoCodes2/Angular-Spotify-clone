import { Component, OnInit } from '@angular/core';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private favSub:any;
  private removeFavSub:any;
  favourites: any;


  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
  this.favSub=  this.musicDataService
      .getFavourites()
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  removeFromFavourites(id: any) {
    this.removeFavSub=  this.musicDataService
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }
  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
    this.removeFavSub?.unsubscribe();
  }

}
