import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Course } from '../models/course.models';




@Injectable({ providedIn: 'root' })
export class CourseService {
    constructor(private http: HttpClient) { }

    getAll(): Promise<Course[]> {
        return this.http.get(`${environment.url}course`).toPromise().then((res: any) => {
            if (res && res.Value && res.Value) {
                return res.Value.map((res: any) => this.map(res))
            } else {
                Promise.reject();
            }
        })
    }
    private map(item) {
        var aux = new Course();
        aux.id = item.Id;
        aux.name = item.Name;
        aux.description = item.Description;
        return aux;
    }
}