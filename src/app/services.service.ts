import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type imageArray ={
  image : string;
}
export type beerData={
  abv : string;
  ibu : string;
  id : number;
  name :  string;
  style : string;
  ounces : number;
}
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http1 : HttpClient) { }
  
  fetchImages(){
    // 'https://aqueous-caverns-98789.herokuapp.com/'
    let headers1 = new HttpHeaders();
  headers1 = headers1.append('origin','X-Requested-With');
    return this.http1.get<imageArray[]>('https://aqueous-caverns-98789.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json',{
      // headers : headers1
    });
  }
  fetchData(){
  let headers1 = new HttpHeaders();
  headers1 = headers1.append('origin','X-Requested-With');
    return this.http1.get<beerData[]>('https://aqueous-caverns-98789.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json',{
      // headers : headers1
    });

  }
}
