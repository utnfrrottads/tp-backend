import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '../Models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  selectedBranch: Branch
  branches: Branch[]

  readonly API_URL = "http://localhost:3000/api/branch/"

  constructor(private http: HttpClient) {
    this.selectedBranch = new Branch()
    this.branches =  []
   }

   getBranches(){
     return this.http.get(this.API_URL)
   }

   getBranch(branch: Branch){
      return this.http.get(this.API_URL+`${branch._id}`)
   }

   postBranch(branch: Branch){
     return this.http.post(this.API_URL, branch)
   }

   putBranch(branch: Branch){
     return this.http.put(this.API_URL+`${branch._id}`, branch)
   }

   deleteBranch(branch: Branch){
     this.http.delete(this.API_URL+`${branch._id}`)
   }
}
