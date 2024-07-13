import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ca-overwiew',
  templateUrl: './ca-overwiew.component.html',
  styleUrls: ['./ca-overwiew.component.css'],
})
export class CaOverwiewComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1', { static: false }) canvas1: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2', { static: false }) canvas2: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3', { static: false }) canvas3: ElementRef<HTMLCanvasElement>;

  isLoading = false;

  employeesCounter = 0;
  productsCounter = 0;
  customersCounter = 0;
  eventsCounter = 0;

  labelConteggioProdotti: any[] = [];
  valuesConteggioProdotti: any[] = [];

  labelConteggioTagli: any[] = [];
  valuesConteggioTagli: any[] = [];

  labelGuadagniMensili: any[] = [];
  valuesGuadagniMensili: any[] = [];

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getAllCounters();
    this.getTagliPerDipendente();
    this.getProdottiVenduti();
    this.getGuadagniMensili();
  }

  ngAfterViewInit() {
    setTimeout(() => this.tryRenderChart(), 0);
    setTimeout(() => this.tryRenderProdottiVendutiChart(), 0);
    setTimeout(() => this.tryRenderGuadagniMensiliChart(), 0);
  }

  getAllCounters() {
    this.isLoading = true;
    this.productService.getAllCounters().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.employeesCounter = responseData.employeesCounter;
        this.productsCounter = responseData.productsCounter;
        this.customersCounter = responseData.customersCounter;
        this.eventsCounter = responseData.eventsCounter;
      },
      error: (error) => console.error(error),
      complete: () => { this.isLoading = false; },
    });
  }

  getTagliPerDipendente() {
    this.isLoading = true;
    this.productService.getTagliPerDipendente().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        responseData.forEach((item: any) => {
          this.labelConteggioTagli.push(item[0]);
          this.valuesConteggioTagli.push(item[1]);
        });
      },
      error: (error) => {
        console.error('getTagliPerDipendente: Error', error);
        this.isLoading = false;
        alert('Si è verificato un errore durante il recupero dei dati. Riprova più tardi.');
      },
      complete: () => {
        this.isLoading = false;
        setTimeout(() => this.tryRenderChart(), 0);
      },
    });
  }

  getProdottiVenduti() {
    this.productService.getProdottiVenduti().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        responseData.forEach((item: any) => {
          this.labelConteggioProdotti.push(item[0]);
          this.valuesConteggioProdotti.push(item[1]);
        });
      },
      error: (error) => console.error('getProdottiVenduti: Error', error),
      complete: () => {
        this.isLoading = false;
        setTimeout(() => this.tryRenderProdottiVendutiChart(), 0);
      },
    });
  }

  getGuadagniMensili() {
    this.productService.getGuadagniMensili().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        responseData.forEach((item: any) => {
          this.labelGuadagniMensili.push(item[0]);
          this.valuesGuadagniMensili.push(item[1]);
        });
      },
      error: (error) => console.error('getGuadagniMensili: Error', error),
      complete: () => {
        this.isLoading = false;
        setTimeout(() => this.tryRenderGuadagniMensiliChart(), 0);
      },
    });
  }

  tryRenderChart() {
    if (this.canvas1 && this.labelConteggioTagli.length) {
      this.renderChart();
    }
  }

  renderChart() {
    const ctx = this.canvas1.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labelConteggioTagli,
          datasets: [{
            label: 'Tagli',
            data: this.valuesConteggioTagli,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'bottom' } },
        },
      });
    }
  }

  tryRenderProdottiVendutiChart() {
    if (this.canvas2 && this.labelConteggioProdotti.length) {
      this.renderProdottiVendutiChart();
    }
  }

  renderProdottiVendutiChart() {
    const ctx = this.canvas2.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.labelConteggioProdotti,
          datasets: [{
            label: 'Prodotti',
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            data: this.valuesConteggioProdotti,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    }
  }

  tryRenderGuadagniMensiliChart() {
    if (this.canvas3 && this.labelGuadagniMensili.length) {
      this.renderGuadagniMensiliChart();
    }
  }

  renderGuadagniMensiliChart() {
    const ctx = this.canvas3.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labelGuadagniMensili,
          datasets: [{
            label: 'Guadagni',
            data: this.valuesGuadagniMensili,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'bottom' } },
        },
      });
    }
  }
}
