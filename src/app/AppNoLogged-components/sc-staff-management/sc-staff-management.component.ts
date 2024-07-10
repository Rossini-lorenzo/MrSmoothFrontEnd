import { Component, OnInit } from '@angular/core';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';

interface Employee {
  nome: string;
  cognome: string;
  ruolo: string;
}

@Component({
  selector: 'app-sc-staff-management',
  templateUrl: './sc-staff-management.component.html',
  styleUrl: './sc-staff-management.component.css'
})
export class ScStaffManagementComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cognome', 'ruolo'];
  dataSource: Employee[] = [];
  isLoading = false;

  constructor(private productService: EmployeesServiceService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  public getAllEmployee(): void {
    this.isLoading = true;
    this.productService.getAllEmployee().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }
}
