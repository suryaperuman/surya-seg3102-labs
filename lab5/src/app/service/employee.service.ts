import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  constructor(private firestore: Firestore) {
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee) {
    addDoc(collection(this.firestore, 'employees'), {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender,
      email: employee.email
    })
    .then(() => {
      this.fetchEmployees
    })

    return true;
  }

  async fetchEmployees() {
    const docs = await getDocs(collection(this.firestore, 'employees'));

    const employeesList: Employee[] = docs.docs.map(doc => {
        const employee = doc.data();
        return {
            name: employee['name'],
            dateOfBirth: (employee['dateOfBirth']).toDate(),
            city: employee['city'],
            salary: employee['salary'],
            gender: employee['gender'],
            email: employee['email'],
        } as Employee;
    });
    this.employees$.next(employeesList);
  }

}
