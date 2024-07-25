import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalesServiceService } from 'src/app/service/sales-service.service';
import { Product } from '../sc-summary-warehouse/sc-summary-warehouse.component';
import { Service } from '../sc-services-management/sc-services-management.component';

export interface Sale {
  id: number;
  date: string;
  operator: string;
  flValidity: string;
  soldProducts: Product[];
  soldServices: Service[];
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
    this.getAllSales();
  }

  public getAllSales(): void {
    this.isLoading = true;
    this.salesService.getAllSale().subscribe({
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

}
