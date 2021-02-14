import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { InstitutionCourse } from '../models/institution-course.models';

export interface InstitutionCourseList {
    total: number;
    list: InstitutionCourse[];
}


@Injectable({ providedIn: 'root' })
export class InstitutionCourseService {
    constructor(private http: HttpClient) { }

    getAll(pageindex: number, pagesize: number, filter?: string,institutionId?: string): Promise<InstitutionCourseList> {


        let url = `${environment.url}institutioncourse?pagesize=${pagesize}&pageindex=${pageindex}`
        if (institutionId) {
            url += `&institutionId=${institutionId}`
        }
        if (filter) {
            url += `&filter=${filter}`
        }

        return this.http.get(url).toPromise().then((res: any) => {
            var list = [];
            if (res && res.Value && res.Value.InstitutionCoursesResult) {
                list = res.Value.InstitutionCoursesResult.map((res: any) => this.map(res))
                return {
                    total: res.Value.TotalInstitutionCourses,
                    list
                }
            } else {
                Promise.reject();
            }

        })
    }
    getById(id) {
        return this.http.get(`${environment.url}institutioncourse/${id}`).toPromise().then((res: any) => {
            if (res && res.Value) {
                return this.map(res.Value);
            }
        });
    }
    delete(id) {
        return this.http.delete(`${environment.url}institutioncourse/delete?instcourseId=${id}`).toPromise();
    }
    collecs() {
        return this.http.get(`${environment.url}institutioncourse/collecs`).toPromise().then((res: any) => {
            if (res && res.Value && res.StatusCode == 200) {
                return res.Value;
            } else {
                Promise.reject();
            }

        })
    }
    update(data) {
        return this.http.put(`${environment.url}institutioncourse/update?instcourseId=${data.id}`, data).toPromise();
    }
    create(data) {
        return this.http.post(`${environment.url}institutioncourse/create`, data).toPromise();
    }
    private map(item) {
        var aux = new InstitutionCourse();
        aux.id = item.Id;
        aux.courseName = item.CourseName;
        aux.institutionId = item.InstitutionId;
        aux.institutionName = item.InstitutionName;
        aux.qtyTerms = item.QtyTerms;
        aux.eduLevelId = item.EduLevelId;
        aux.periods = item.Periods;
        if (item.CheckedPeriods)
            aux.periodIds = item.CheckedPeriods.map(x => x.Id);
        return aux;
    }
}