import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { Institution } from '../models/institution.models';

export interface InstitutionList {
    total: number;
    list: Institution[];
}


@Injectable({ providedIn: 'root' })
export class InstitutionService {
    constructor(private http: HttpClient) { }

    getAll(pageindex: number, pagesize: number, filter?: string): Promise<InstitutionList> {


        let url = `${environment.url}institution?pagesize=${pagesize}&pageindex=${pageindex}`
        if (status) {
            url += `&status=${status}`
        }
        if (filter) {
            url += `&filter=${filter}`
        }

        return this.http.get(url).toPromise().then((res: any) => {
            var list = [];
            if (res && res.Value && res.Value.InstitutionsResult) {
                list = res.Value.InstitutionsResult.map((res: any) => this.map(res))
                return {
                    total: res.Value.TotalIntitutions,
                    list
                }
            } else {
                Promise.reject();
            }

        })
    }
    // postStatus(studentId, newStatus, reason) {
    //     return this.http.post(`${environment.url}student/status`, { studentId, newStatus, reason }).toPromise();
    // }
    delete(id) {
        return this.http.delete(`${environment.url}institution/delete?id=${id}`).toPromise();
    }
    update(data) {
        return this.http.put(`${environment.url}institution/update?id=${data.id}`, data).toPromise();
    }
    add(data) {
        return this.http.post(`${environment.url}institution/create`, data).toPromise();
    }
    private map(item) {
        var aux = new Institution();
        aux.id = item.Id;
        aux.name = item.Name;
        aux.location = item.Location;
        return aux;
    }
}