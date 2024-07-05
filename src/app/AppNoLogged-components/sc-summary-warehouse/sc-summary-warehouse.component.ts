import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';


interface Product {
  id: string;
  prezzo: number;
  nomeProdotto: string;
  quantita: number;
}
@Component({
  selector: 'app-sc-summary-warehouse',
  templateUrl: './sc-summary-warehouse.component.html',
  styleUrl: './sc-summary-warehouse.component.css'
})

export class ScSummaryWarehouseComponent implements OnInit {
  itemsPerPage = 10; // Numero di elementi per pagina
  currentPage = 1; // Pagina corrente
  displayedColumns: string[] = ['id', 'prezzo', 'nomeProdotto', 'quantita'];
  dataSource: Product[] = [];
  selectedProduct: Product = {
    id: '',
    prezzo: 0,
    nomeProdotto: '',
    quantita: 0,
  };
  apiCalled = false;
  confirmDelete = false;
  productId = '';
  productName = '';
  productPrize = 0;
  quantity = 0;
  isEditing = false;

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  public deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        alert(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        console.info('complete');
        this.getAllProducts();
      },
    });
  }

  public updateProduct(): void {
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
          alert(response);

          this.apiCalled = false;
          //this.productIsPresent = false;
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllProducts();
        },
      });
  }

  selectProductForEdit(productId: string) {
    const product = this.dataSource.find((item) => item.id === productId);
    if (product) {
      this.isEditing = true; // Imposta isEditing su true quando si avvia l'azione di modifica
      this.selectedProduct = { ...product };
      this.productName = this.selectedProduct.nomeProdotto;
      this.productPrize = this.selectedProduct.prezzo;
      this.quantity = this.selectedProduct.quantita;
      this.confirmDelete = false;
    } else {
      this.selectedProduct = {
        id: '',
        prezzo: 0,
        nomeProdotto: '',
        quantita: 0,
      };
      this.isEditing = false; // Imposta isEditing su false se il prodotto non viene trovato
    }
  }

  confirmDeleteProduct(productId: string): void {
    this.selectedProduct = this.dataSource.find(
      (item) => item.id === productId
    ) || { id: '', prezzo: 0, nomeProdotto: '', quantita: 0 };
    this.confirmDelete = true;
  }

  /// Calcola il numero totale di pagine sulla base dei dati disponibili
  get totalPages(): number {
    return Math.ceil(this.dataSource.length / this.itemsPerPage);
  }

  // Calcola l'array di pagine da visualizzare nella paginazione
  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  // Ottieni i dati per la pagina corrente
  getPagesData(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  // Ottieni i dati della pagina precedente
  getPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Ottieni i dati della pagina successiva
  getNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Verifica se la pagina è attiva per applicare lo stile corretto
  isActive(pageNumber: number): string {
    return pageNumber === this.currentPage ? 'active' : '';
  }

  // Metodo per paginare i dati e ottenere solo quelli per la pagina corrente
  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.dataSource.length
    );
    return this.dataSource.slice(startIndex, endIndex);
  }
}
