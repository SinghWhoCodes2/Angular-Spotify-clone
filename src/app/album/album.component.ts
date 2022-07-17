import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService) { 

 

  }
  private albmSub: any;
  album: any;
  id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   this.albmSub= this.musicDataService
     .getAlbumById(this.id)
     .subscribe((data) => {
       return (this.album = data);
     });

  }

  addToFavourites(trackID: any) {
   this.musicDataService.addToFavourites(trackID) 
      this.snackBar.open("Adding to Favourites...", 'Done', { duration: 1500 });
  }


  ngOnDestroy() {
    this.albmSub?.unsubscribe();
  }

}
