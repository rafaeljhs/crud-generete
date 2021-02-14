import { Issuer } from './../models/issuer.models';
import { Student } from './../models/student.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface IssuerList {
    total: number;
    list: Issuer[];
}


@Injectable({ providedIn: 'root' })
export class IssuerService {
    constructor(private http: HttpClient) { }

    getAll(pageindex: number, pagesize: number, filter?: string): Promise<IssuerList> {
        let url = `${environment.url}issuer?pagesize=${pagesize}&pageindex=${pageindex}`
        if (filter) {
            url += `&filter=${filter}`
        }
        return this.http.get(url).toPromise().then((res: any) => {
            var list = [];
            if (res && res.Value && res.Value.IssuersResult) {
                list = res.Value.IssuersResult.map((res: any) => this.map(res))
                return {
                    total: res.Value.TotalIssuers,
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
    getById(id) {
        return this.http.get(`${environment.url}issuer/${id}`).toPromise().then((res: any) => {
            if (res.StatusCode == 200) {
                return this.map(res.Value);
            }
            return null;
        });
    }
    create(data, logo = null) {
        const formData = new FormData()
        Object.keys(data).forEach(res => {
            formData.append(res, data[res]);
        })
        if (logo) {
            formData.append('logo', logo);
        }
        return this.http.post(`${environment.url}issuer/create`, formData).toPromise();
    }
    update(data: Issuer) {
        // const formData = new FormData()
        // Object.keys(data).forEach(res => {
        //     formData.append(res, data[res]);
        // })
        // if (logo) {
        //     formData.append(logo, logo);
        // }
        return this.http.put(`${environment.url}issuer/update?id=${data.Id}`, data).toPromise();
    }

    delete(id) {
        return this.http.delete(`${environment.url}issuer/delete?id=${id}`).toPromise();
    }
    private map(item) {
        var aux = new Issuer();
        aux = item;
        aux.DeactivationDate = new Date(item.DeactivationDate);
        return aux;
    }
}