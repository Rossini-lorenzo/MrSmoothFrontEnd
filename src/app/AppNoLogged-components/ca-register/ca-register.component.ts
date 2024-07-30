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
  selector: 'app-ca-register',
  templateUrl: './ca-register.component.html',
  styleUrls: ['./ca-register.component.css']
})
export class CaRegisterComponent implements OnInit {

  saleList: Sale[] = [];
  isLoading = false;
  expandedItem: number | null = null;

  toggleDetails(index: number): void {
    this.expandedItem = this.expandedItem === index ? null : index;
  }

  constructor(
    private salesService: SalesServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTodaySales();
  }

  public getTodaySales(): void {
    this.isLoading = true;
    this.salesService.getTodaySales().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.saleList = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public getPaginatedSalesArchive(): void {
    this.isLoading = true;
    this.salesService.getTodaySales().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.saleList = responseData;
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

}
