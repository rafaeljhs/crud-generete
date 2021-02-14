import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { Institution } from '../models/institution.models';


@Injectable({ providedIn: 'root' })
export class FileService {
    constructor(private http: HttpClient) { }


    add(file, OwnerId) {

        const formData = new FormData()
        // Object.keys(data).forEach(res => {
        //     formData.append(res, data[res]);
        // })
        formData.append('FFile', file);
        formData.append('Code', 'LOGO');
        formData.append('Owner', '2');
        formData.append('OwnerId', OwnerId);
        return this.http.post(`${environment.url}file`, formData).toPromise();
    }

}