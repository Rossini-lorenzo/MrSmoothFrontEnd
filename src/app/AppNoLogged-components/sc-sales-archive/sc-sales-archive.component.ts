import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalesServiceService } from 'src/app/service/sales-service.service';

export interface SoldProducts {
  id: number;
  saleProductId: number;
  saleProductName: string;
  saleProductPrice: number;
  saleProductQuantity: number;
}

export interface SoldServices {
  id: number;
  saleServiceId: number;
  saleServiceName: string;
  saleServicePrice: number;
  saleServiceQuantity: number;
}
export interface Sale {
  id: number;
  date: string;
  operator: string;
  customer: string;
  flValidity: string;
  soldProducts: SoldProducts[];
  soldServices: SoldServices[];
  total: number;
  notes: string;
}

@Component({
  selector: 'app-sc-sales-archive',
  templateUrl: './sc-sales-archive.component.html',
  styleUrl: './sc-sales-archive.component.css',
})
export class ScSalesArchiveComponent implements OnInit {
  saleList: Sale[] = [];
  isLoading = false;
  expandedItem: number | null = null;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  pages: number[] = [];

  toggleDetails(index: number): void {
    this.expandedItem = this.expandedItem === index ? null : index;
  }

  constructor(
    private salesService: SalesServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPaginatedSalesArchive();
  }

  public getPaginatedSalesArchive(): void {
    this.isLoading = true;
    this.salesService
      .getPaginatedSalesArchive(this.currentPage - 1, this.pageSize)
      .subscribe({
        next: (response: any) => {
          const responseData = response.body; // Se 'observe: response' è impostato nel servizio
          if (responseData) {
            this.saleList = responseData.content;
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

  convertDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  getPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedSalesArchive();
    }
  }

  getNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedSalesArchive();
    }
  }

  getPagesData(page: number): void {
    this.currentPage = page;
    this.getPaginatedSalesArchive();
  }
}
