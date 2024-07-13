import { Component, OnInit } from '@angular/core';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';

interface Employee {
  id: number;
  nome: string;
  cognome: string;
  ruolo: string;
  cellulare: number;
  email: string;
  dataAssunzione: string;
  dataScadenzaContratto: string;
}

@Component({
  selector: 'app-sc-staff-management',
  templateUrl: './sc-staff-management.component.html',
  styleUrl: './sc-staff-management.component.css',
})
export class ScStaffManagementComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cognome', 'ruolo'];
  dataSource: Employee[] = [];
  isLoading = false;

  selectedEmployee: Employee = {
    id: 0,
    nome: '',
    cognome: '',
    ruolo: '',
    cellulare: 0,
    email: '',
    dataAssunzione: '',
    dataScadenzaContratto: ''
  };

  employeeToDelete = 0;

  modalTitle = '';
  editItem: any = { name: '', quantity: 0 };
  newItem: any = { name: '', quantity: 0 };
  isOpen = false;

  constructor(private employeeService: EmployeesServiceService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  public getAllEmployee(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployee().subscribe({
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

  public updateEmployee(): void {
    this.isLoading = true;
    if (!this.selectedEmployee) return;

    this.employeeService
      .updateEmployee(
        this.selectedEmployee.id,
        this.selectedEmployee.nome,
        this.selectedEmployee.cognome,
        this.selectedEmployee.ruolo
      )
      .subscribe({
        next: (response: any) => {
          alert(response);

          //this.apiCalled = false;
          //this.productIsPresent = false;
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllEmployee();
        },
      });
  }

  public deleteEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response: any) => {
        alert(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        console.info('complete');
        this.getAllEmployee();
      },
    });
  }

  openEditModal(selectedEmployee: Employee) {
    this.selectedEmployee = { ...selectedEmployee };
    this.modalTitle = 'Modifica Dipendente';
    // Inizializza editItem con i dati del prodotto da modificare
    this.editItem = { name: 'Prodotto da modificare', quantity: 10 };
    this.isOpen = true;
  }

  openAddModal() {
    this.modalTitle = 'Aggiungi Dipendente';
    // Inizializza newItem per aggiungere un nuovo prodotto
    this.newItem = { name: '', quantity: 0 };
    this.isOpen = true;
  }

  openDeleteModal(selectedEmployee: Employee) {
    this.employeeToDelete = selectedEmployee.id;
    this.modalTitle = 'Conferma Eliminazione Dipendente';
    this.isOpen = true;
  }

  saveChanges() {
    console.log('Salvataggio modifiche...');
    // Logica per salvare le modifiche
    this.updateEmployee();
    this.isOpen = false;
  }

  deleteItem() {
    console.log('Eliminazione elemento...');
    // Logica per eliminare l'elemento

    this.deleteEmployee(this.employeeToDelete);
    this.isOpen = false;
  }

  addItem() {
    console.log('Aggiunta nuovo elemento...');
    // Logica per aggiungere un nuovo elemento
    this.isOpen = false;
  }

  closeModal() {
    console.log('Chiusura modale...');
    this.isOpen = false;
  }
}
