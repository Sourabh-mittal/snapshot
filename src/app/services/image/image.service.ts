import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private api_key: string = '636e1481b4f3c446d26b8eb6ebfe7127';

  constructor(private http: HttpClient) {}

  getImages(tag: string) {
    return this.http.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search& api_key=${this.api_key}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
    );
  }
}
