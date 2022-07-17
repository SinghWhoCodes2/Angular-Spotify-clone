import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {

  favoritesList: Array<any> = []; 

  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id:any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
 

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            params: {
              include_groups: 'album,single',
              limit: '50',
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  getAlbumById(id:any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/albums/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }


  searchArtists(searchString: any): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/search`, {
          params: {
            q: `${searchString}`,
            type: 'artist',
            limit: '50',
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }


  addToFavourites(id: any): boolean {
    if (
      id ==null ||
      id == undefined ||
      this.favoritesList.length >= 50 ||
      this.favoritesList.includes(id)
    ) {
      return false;
    } else {
      this.favoritesList.push(id);
      return true;
    }
  }

  removeFromFavourites(id: any): Observable<any> {

    this.favoritesList.splice(this.favoritesList.indexOf(id), 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favoritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap((token) => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              ids: this.favoritesList.join(','),
            },
          });
        })
      );
    } else {
      return new Observable((o) => {
        o.next([]);
      });
    }
  }


}
