import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recruitments} from "./recruitments";

const API_URL = "http://localhost:8080/api/recruitments";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllRecruitment(index: number):Observable<Recruitments[]>{
    return this.http.get<Recruitments[]>(API_URL + `/paging/?page=`+ index)
  }
  getAll():Observable<Recruitments[]>{
    return  this.http.get<Recruitments[]>(API_URL+'/listRec')
  }
}
