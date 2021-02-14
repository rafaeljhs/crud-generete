import { Student } from './../models/student.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

export interface StudentList {
    total: number;
    list: Student[];
}


@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll(pageindex: number, pagesize: number, status?: number, filter?: string): Promise<StudentList> {


        let url = `${environment.url}student?pagesize=${pagesize}&pageindex=${pageindex}`
        if (status) {
            url += `&status=${status}`
        }
        if (filter) {
            url += `&filter=${filter}`
        }

        return this.http.get(url).toPromise().then((res: any) => {
            var list = [];
            if (res && res.Value && res.Value.StudentsResult) {
                list = res.Value.StudentsResult.map((res: any) => this.map(res))
                return {
                    total: res.Value.TotalStudents,
                    list
                }
            } else {
                Promise.reject();
            }

        })
    }
    postStatus(studentId, newStatus, reason) {
        return this.http.post(`${environment.url}student/status`, { studentId, newStatus, reason }).toPromise();
    }
    update(data) {
        return this.http.put(`${environment.url}student/update?id=${data.id}`, data).toPromise();
    }
    private map(item) {
        var aux = new Student();
        aux.id = item.Id;
        aux.name = item.Name;
        aux.birthDate = new Date(item.BirthDate);
        aux.rg = item.RG;
        aux.cpf = item.CPF;
        aux.institutionName = item.InstitutionName;
        aux.courseName = item.CourseName;
        aux.currentTerm = item.CurrentTerm;
        aux.maxTerms = item.MaxTerms;
        aux.period = item.Period;
        aux.cep = item.CEP;
        aux.address = item.Address;
        aux.neighborhood = item.Neighborhood;
        aux.city = item.City;
        aux.stateUF = item.StateUF;
        aux.photoURL = item.PhotoURL;
        aux.status = item.Status;
        aux.reason = item.Reason;
        aux.cardCode = item.CardCode;

        return aux;
    }
}