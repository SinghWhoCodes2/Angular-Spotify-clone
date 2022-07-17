import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: any;
  searchQuery: string |undefined;
  private searchSub: any;
  constructor( private route: ActivatedRoute,
    private musicDataService: MusicDataService) { }

    ngOnInit(): void {
      
      this.searchSub= this.route.queryParams.subscribe(
        (params: Params) => {
          this.searchQuery = params['q'];
          this.musicDataService
            .searchArtists(this.searchQuery)
            .subscribe((data) => {
              this.results = data.artists.items.filter(
                (artist: any) => artist.images.length > 0
              );
            });
        }
      );
      }
      ngOnDestroy(): void {
        this.searchSub?.unsubscribe();
      }
}
