import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  id: any;
  albums: any;
  artist: any;
  private albmSub: any ;
  private artstSub: any;
  constructor(
    private musicDataService: MusicDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.artstSub = this.musicDataService
      .getArtistById(this.id)
      .subscribe((data) => {
        return (this.artist = data);
      });

    this.albmSub = this.musicDataService
      .getAlbumsByArtistId(this.id)
      .subscribe((data) => {
        return (this.albums = data.items.filter(
          (current: any, idx: any, stored: any) =>
            stored.findIndex(
              (i: any) => i.name.toUpperCase() == current.name.toUpperCase()
            ) == idx
        ));
      });
  }
  ngOnDestroy() {
    this.artstSub?.unsubscribe();
    this.albmSub?.unsubscribe();
  }
}
