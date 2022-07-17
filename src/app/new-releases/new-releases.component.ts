import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases!: any[];
 // dataSubscribe: Subscription | undefined;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.musicDataService
      .getNewReleases()
      .subscribe((data) => {
        this.releases = data.albums.items;
      });
  }

 

}
