import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';

export interface Product {
  id: string;
  prezzo: number;
  nomeProdotto: string;
  quantita: number;
}
@Component({
  selector: 'app-sc-summary-warehouse',
  templateUrl: './sc-summary-warehouse.component.html',
  styleUrl: './sc-summary-warehouse.component.css',
})
export class ScSummaryWarehouseComponent implements OnInit {
  dataSource: Product[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  pages: number[] = [];

  selectedProduct: Product = {
    id: '',
    prezzo: 0,
    nomeProdotto: '',
    quantita: 0,
  };

  productToDelete = '';

  modalTitle = '';
  modalActionType = '';
  isOpen = false;

  form: FormGroup;
  submitted = false;

  // Variabili per l'alert di successo
  showSuccessAlert = false;
  successMessage = '';

  constructor(
    private productService: ProductServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPaginatedSummaryWarehouse();
    this.form = this.formBuilder.group({
      prezzo: ['', Validators.required],
      nomeProdotto: ['', Validators.required],
      quantita: ['', Validators.required],
    });
  }

  public getPaginatedSummaryWarehouse(): void {
    this.isLoading = true;
    this.productService.getPaginatedSummaryWarehouse(this.currentPage - 1, this.pageSize).subscribe({
      next: (response: any) => {
        const responseData = response.body; // Se 'observe: response' è impostato nel servizio
          if (responseData) {
            this.dataSource = responseData.content;
            this.totalPages = responseData.totalPages;
            this.totalElements = responseData.totalElements;
            this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          } else {
            console.error(
              "Formato della risposta non corretto o 'content' non presente."
            );
          }
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public deleteProduct(id: string): void {
    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getPaginatedSummaryWarehouse();
      },
    });
  }

  public updateProduct(): void {
    this.isLoading = true;
    this.selectedProduct = {
      ...this.selectedProduct,
      ...this.form.value,
    };
    if (!this.selectedProduct) return;

    this.productService
      .updateProduct(
        this.selectedProduct.id,
        this.selectedProduct.prezzo,
        this.selectedProduct.quantita,
        this.selectedProduct.nomeProdotto
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getPaginatedSummaryWarehouse();
        },
      });
  }

  openModal(actionType: string, selectedProduct?: Product) {
    this.modalActionType = actionType;
    if (selectedProduct) this.productToDelete = selectedProduct.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedProduct);
  }

  initializeForm(selectedProduct?: Product) {
    switch (this.modalActionType) {
      case 'EDIT':
        if (selectedProduct) this.selectedProduct = { ...selectedProduct };
        this.form.patchValue({
          prezzo: this.selectedProduct.prezzo,
          nomeProdotto: this.selectedProduct.nomeProdotto,
          quantita: this.selectedProduct.quantita,
        });
        break;
      case 'ADD':
        break;
      case 'DELETE':
        break;
      default:
        console.error('Azione non supportata');
    }
  }

  setModalTitle() {
    switch (this.modalActionType) {
      case 'EDIT':
        this.modalTitle = 'Modifica Prodotto';
        break;
      case 'ADD':
        this.modalTitle = 'Aggiungi Prodotto';
        break;
      case 'DELETE':
        this.modalTitle = 'Conferma Eliminazione';
        break;
      default:
        this.modalTitle = '';
    }
  }

  performAction() {
    // Esegui azioni in base al tipo di azione
    switch (this.modalActionType) {
      case 'EDIT':
        this.updateProduct();
        break;
      case 'DELETE':
        this.deleteProduct(this.productToDelete);
        break;
      default:
        console.error('Azione non supportata');
    }
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
    this.onReset();
  }

  onSubmit() {
    this.submitted = true;

    if (this.modalActionType === 'EDIT' || this.modalActionType === 'ADD') {
      if (this.form.invalid) {
        return;
      }
    }
    this.performAction();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }

  closeSuccessAlert(): void {
    this.showSuccessAlert = false;
  }

  getPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedSummaryWarehouse();
    }
  }

  getNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedSummaryWarehouse();
    }
  }

  getPagesData(page: number): void {
    this.currentPage = page;
    this.getPaginatedSummaryWarehouse();
  }
}
