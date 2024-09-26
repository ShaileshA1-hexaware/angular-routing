import { Injectable } from '@angular/core';
import { Constants } from '../constants'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  getData() {
    return this.http.get(Constants.mockURL)
  }
  addData(_formData:any){
    return this.http.post(Constants.mockURL,_formData);
  }
}
