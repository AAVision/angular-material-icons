import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icons } from '../models/icon.model';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private _http:HttpClient) { }

  getIcons():Observable<Icons[]> {
    return this._http.get<Icons[]>("../../assets/data.json");
  }

}
