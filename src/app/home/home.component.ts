import { UserService } from '../services/user/user.service';
import { ImageService } from '../services/image/image.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string | null = localStorage.getItem('name');
  tag: string = 'mountain';
  imageData: any;
  imgList: any = [];
  imagesExist: boolean = true;

  constructor(
    private router: Router,
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getImagesByTag(this.tag);
  }

  getImagesByTag(tag: string): void {
    this.tag = tag;
    this.imageService.getImages(tag).subscribe((res) => {
      this.imageData = res;
      if (
        this.imageData.stat == 'ok' &&
        this.imageData.photos.photo.length > 0
      ) {
        this.imagesExist = true;
        this.createImgUrls();
      } else {
        this.imagesExist = false;
        console.log('no images');
      }
    });
  }

  createImgUrls(): void {
    this.imgList = [];
    for (let imgdata of this.imageData.photos.photo) {
      if (imgdata.farm)
        this.imgList.push(
          `https://farm${imgdata.farm}.staticflickr.com/${imgdata.server}/${imgdata.id}_${imgdata.secret}_m.jpg`
        );
    }
  }

  onSearch(e: any): void {
    if (e.target.value.length > 1) {
      this.tag = e.target.value;
      this.getImagesByTag(e.target.value);
    }
  }

  logOut(): void {
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }
}
