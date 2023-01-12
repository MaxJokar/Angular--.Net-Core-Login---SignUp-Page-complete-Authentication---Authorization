import { Component,OnInit } from '@angular/core';
import { PhotoInterface } from 'src/app/models/photo.model';
import { GalleryService } from 'src/app/services/gallery.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})



export class GalleryComponent implements OnInit {

  exactPhotoInPage = 5;
  currentPage: number = 1;
  //photos?: Observable<PhotoInterface[]>; with async in html
  photos: PhotoInterface[] =[]


  constructor(private service:GalleryService) { }

  ngOnInit(): void {
      //this.photos = this.service.getPhotos(this.currentPage);
      this.detectLazyLoading();

    }
  detectLazyLoading() {
    const observer = new IntersectionObserver(enteries=> {
      enteries.forEach(entery=> {
          if(entery.isIntersecting) {
            //console.log('lazy is testing , just for test ');
            this.service.getPhotos(this.currentPage).subscribe(data=> {

              //console.log('Testing LazyLoadingData' , data);
              //data.forEach(Image => {
              //this.photos = data; // with this synt we can see photos OR Below:


              data.forEach(image => {
                this.photos.push(image);

              });



                this.currentPage++;
            });
          }

      });
    });
       observer.observe(document.querySelector('.lazy-loading-detector')!);
  }
}







