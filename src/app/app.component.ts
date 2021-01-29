import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


import { beerData, imageArray, ServicesService } from "./services.service";

declare var $: any;
declare var anime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('span1', { static: true }) span1: ElementRef;
  @ViewChild('span2', { static: true }) span2: ElementRef;
  @ViewChild('paginPage', { static: true }) paginPage: ElementRef;
  title = 'beercraft';
  images: imageArray[];
  totalImages: imageArray[] = [];
  beerArray: beerData[] = [];
  firstImage: imageArray = {
    image: ''
  };
  beerNames: { beername: string, beerId: number }[] = [];
  pagArray: beerData[] = [];
  png: string = '';

  mdlSampleIsOpen: boolean = false;

  public model: string = '';
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? ''
        : this.beerNames.filter(v => v.beername.toLowerCase().indexOf(term.toLowerCase()) > -1).map(v => v.beername)).slice(0, 10))
    );
  }




  constructor(public service1: ServicesService) { }
  dataClicked;
  pagination(val1) {
    $(function () {
      $('#pagination-container').pagination({
        items: val1,
        itemsOnPage: 1,
        cssStyle: 'light-theme',
        onPageClick: () => {
          // console.log(this.pageArray);
          // this.dataClicked = $('#pagination-container').pagination('getCurrentPage');
          // console.log(this.dataClicked);
        }
      });
    });
  }
  ngOnInit() {
    $('#myModal').modal({
      backdrop: 'static',
      // focus : true,
      show: false
    })





    console.log(this.span1);
    const mediaQuery1 = window.matchMedia('(max-width:700px)');
    this.service1.fetchData().subscribe(data => {
      this.beerArray = data;
      let p = 20;
      if (this.beerArray.length < p) {
        p = this.beerArray.length;
      }
      let k = 0;
      if (this.pagArray.length == 0 && this.totalImages.length > 0) {
        console.log(this.totalImages);
        for (let i = 0; i < p; i++) {
          let temp;
          if (k == 0) {
            temp = {
              'image': this.png
            }
          } else if (k == 1) {
            temp = this.firstImage;
          } else {
            temp = this.totalImages[k - 2];
          }
          this.pagArray.push({
            ...this.beerArray[i],
            ...temp
          });

          k++;
          if (k >= (this.totalImages.length + 2)) {
            k = 0;
          }
        }
      }
      let len1 = 0;
      len1 = this.beerArray.length / 20;
      len1 = Math.floor(len1);
      if (this.beerArray.length % 20 > 0) {
        len1++;
      }
      this.pagination(len1);
      console.log(this.beerArray, "beer data");
      console.log(this.pagArray, "this.pagArray")
      this.beerArray.forEach((br) => {
        this.beerNames.push({
          beername: br.name,
          beerId: br.id
        });
      })
      console.log(this.beerNames, "this.beerNames");

    })
    setTimeout(() => {
      if (mediaQuery1.matches) {
        this.span1.nativeElement.style.transform = "translate(-50%,75px)";
        this.span2.nativeElement.style.transform = "translate(-50%,-60%)";
      } else {
        this.span1.nativeElement.style.transform = "translate(70px,-50%)";
        this.span2.nativeElement.style.transform = "translate(-150px,-50%)";
      }
    }, 2500)
    this.service1.fetchImages().subscribe(data => {
      this.totalImages = data;
      if (this.beerArray.length > 0 && this.pagArray.length == 0) {
        let p = 20;
        if (this.beerArray.length < p) {
          p = this.beerArray.length;
        }
        let k = 0;
        for (let i = 0; i < p; i++) {
          let temp;
          if (k == 0) {
            temp = {
              'image': this.png
            }
          } else if (k == 1) {
            temp = this.firstImage;
          } else {
            temp = this.totalImages[k - 2];
          }
          this.pagArray.push({
            ...this.beerArray[i],
            ...temp
          });
          k++;
          if (k >= (this.totalImages.length + 2)) {
            k = 0;
          }
        }
      }
      this.images = data;
      console.log(this.images, "images");
      this.png = this.images[0].image;
      this.firstImage.image = this.images[1].image;
      this.images.shift();
      this.images.shift();
      $('.carousel').carousel({
        interval: 1000,
        keyboard: true,
        pause: false
      });
    })
    // $('.carousel').on('slid.bs.carousel', function (e) {
    //   console.log('trigger on slide transistion');
    //   // callme();
    //   console.log(e);
    // })
    // $(function () {
    //   $('.carousel').on('slid.bs.carousel', function(){
    //     // alert("The sliding transition of previous carousel item has been fully completed.");
    //   imran();
    // }); 
    // function imran(){
    //   console.log('donennnn');
    //   console.log(this.span1);
    // }
    // });
    var lineDrawing1 = anime({
      targets: '#lineDrawing .path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 10000,
      delay: function (el, i) { return i * 250 },
      direction: 'forwards',
      loop: false
    });
  }
 
viewdataTable1(lang) {
  // $(function () {
  //   $('.carousel').on('slid.bs.carousel', function(){
  //     alert("The sliding transition of previous carousel item has been fully completed.");
  //   imran();
  // }); 
  // function imran(){
  //   console.log('donennnn');
    
  // }
  // });

}
  callme(){
    console.log('success fully called me!');
  }
  ngAfterViewInit() {

    window.onscroll = function () { myFunction() };

    var header = document.querySelector(".header1");
    var sticky = 40;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    // window.addEventListener('load', function () {
    //   setTimeout(lazyLoad, 1000);
    // });

    // function lazyLoad() {
    //   var card_images = document.querySelectorAll('.card-image');
    //   card_images.forEach((card_image) => {
    //     var content_image = card_image.querySelector('img');
    //     let tempimg = content_image.src;
    //     content_image.src = tempimg;
    //     content_image.addEventListener('load', () => {
    //       card_image.className = card_image.className + ' is-loaded';
    //     });
    //   });
    // }

   



    const mediaQuery1 = window.matchMedia('(max-width:700px)');
    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (mediaQuery1.matches) {
          this.span1.nativeElement.style.transform = "translate(-50%,75px)";
          this.span2.nativeElement.style.transform = "translate(-50%,-60%)";
        } else {
          this.span1.nativeElement.style.transform = "translate(70px,-50%)";
          this.span2.nativeElement.style.transform = "translate(-150px,-50%)";
        }
      }, 500)
    })

    const paginPage1 = document.querySelector('#pagination-container');
    paginPage1.addEventListener('click', () => {
      // console.log(paginPage1.firstElementChild.children);
      const new111 = Array.from(paginPage1.firstElementChild.children);
      new111.forEach(li => {
        if (li.classList.contains('active')) {
          // console.log(li.textContent);
          this.dataCalc(+li.textContent);
        }
      })
    })

  }

  pageLists() {
    console.log($('#pagination-container').pagination('getCurrentPage'))
    const numb1 = $('#pagination-container').pagination('getCurrentPage');
  }

  dataCalc(pageno) {
    console.log(pageno);
    let start = (pageno - 1) * 20;
    let end = start + 20;
    this.pagArray = [];
    if (end > this.beerArray.length) {
      end = this.beerArray.length;
    }
    let k = 0;
    for (let i = start; i < end; i++) {

      let temp;
      if (k == 0) {
        temp = {
          'image': this.png
        }
      } else if (k == 1) {
        temp = this.firstImage;
      } else {
        temp = this.totalImages[k - 2];
      }
      this.pagArray.push({
        ...this.beerArray[i],
        ...temp
      });

      k++;
      if (k >= (this.totalImages.length + 2)) {
        k = 0;
      }
    }
    console.log(this.pagArray, "this.pagArray");
  }


  public openModal(open: boolean, getRFQ): void {
    this.model = '';
    this.searchedBeer = null;
    this.mdlSampleIsOpen = open;
    if (open === false) {
      return;
    }
  }

  searchFunc() {
    console.log(this.model);
    const newBeerArray = [];
    let k = 0;
    this.beerArray.forEach((br, i) => {
      let temp;
      if (k == 0) {
        temp = {
          'image': this.png
        }
      } else if (k == 1) {
        temp = this.firstImage;
      } else {
        temp = this.totalImages[k - 2];
      }
      newBeerArray.push({
        ...br,
        ...temp
      })
      k++;
      if (k >= (this.totalImages.length + 2)) {
        k = 0;
      }
    })
    newBeerArray.forEach(beer => {
      // if(beer.name.toLowerCase().indexOf(this.model.toLowerCase()) > -1){
      //   console.log(beer);
      // }
      if (beer.name.toLowerCase() === this.model.toLowerCase()) {
        console.log(beer);
        this.searchedBeer = beer;
      }
    })
  }
  public searchedBeer = null;
}
