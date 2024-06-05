import { Component, ElementRef } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-event-dialog-content',
  templateUrl: './event-dialog-content.component.html',
  styleUrls: ['./event-dialog-content.component.css']
})
export class EventDialogContentComponent {
  title: string = '';
  description: string = '';
  employees: any[] = [];
  selectedEmployee: any;
  constructor(
    public dialogRef: MatDialogRef<EventDialogContentComponent>,
    private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    this.productService.getAllEmployee().subscribe({
      next: (response: any) => {
        
        const responseData = response.body; // Accesso al corpo della risposta
        console.log("Response data:", responseData); // Logga i dati ricevuti
        
          for (const emp of responseData) {
            const employee = {
              idDipendente: emp.id,
              nomeDipendente: emp.nome,
              cognomeDipendente: emp.cognome
            };
            this.employees.push(employee);
          }
        
       
      },
      error: (error) => console.error(error),
      complete: () => {console.info('complete');console.log(this.employees)},
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLTextAreaElement>;

  getTitleValue(): string {
    return this.titleInput.nativeElement.value;
  }

  getDescriptionValue(): string {
    return this.descriptionInput.nativeElement.value;
  }
}