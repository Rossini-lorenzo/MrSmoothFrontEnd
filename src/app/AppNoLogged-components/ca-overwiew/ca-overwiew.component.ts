import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import * as CanvasJS from 'canvasjs';
import { ProductServiceService } from 'src/app/service/product-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ca-overwiew',
  templateUrl: './ca-overwiew.component.html',
  styleUrls: ['./ca-overwiew.component.css'],
})
export class CaOverwiewComponent implements OnInit {
  constructor(private productService: ProductServiceService) {}

  isLoading = false;

  employeesCounter = 0;
  productsCounter = 0;
  customersCounter = 0;
  eventsCounter = 0;

  labelConteggioProdotti: any = [];
  valuesConteggioProdotti: any = [];

  labelConteggioTagli: any = [];
  valuesConteggioTagli: any = [];

  labelGuadagniMensili: any = [];
  valuesGuadagniMensili: any = [];

  chart3: any = [];
  chart2: any = [];
  chart1: any = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllCounters().subscribe({
      next: (response: any) => {
        const responseData = response.body; // Accesso al corpo della risposta
        console.log('Response data getAllCounters:', responseData); // Logga i dati ricevuti

        this.employeesCounter = responseData.employeesCounter;
        this.productsCounter = responseData.productsCounter;
        this.customersCounter = responseData.customersCounter;
        this.eventsCounter = responseData.eventsCounter;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });

    // ---------------------------------- START GRAFICO CONTEGGIO TAGLI ----------------------------------

    this.productService.getTagliPerDipendente().subscribe({
      next: (response: any) => {
        const responseData = response.body; // Accesso al corpo della risposta
        responseData.map((item: any) => {
          this.labelConteggioTagli.push(item[0]);
          this.valuesConteggioTagli.push(item[1]);
        });
        this.chart1 = new Chart('canvas1', {
          type: 'doughnut',
          data: {
            labels: this.labelConteggioTagli,
            datasets: [
              {
                label: 'Tagli',
                data: this.valuesConteggioTagli,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom', // Posizione della legenda in basso
              },
            },
          },
        });
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('Complete');
      },
    });
    // ---------------------------------- END GRAFICO CONTEGGIO TAGLI ----------------------------------
    // ---------------------------------- START GRAFICO CONTEGGIO PRODOTTI VENDUTI ----------------------------------
    this.productService.getProdottiVenduti().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        responseData.map((item: any) => {
          this.labelConteggioProdotti.push(item[0]);
          this.valuesConteggioProdotti.push(item[1]);
        });

        this.chart2 = new Chart('canvas2', {
          type: 'bar',

          data: {
            labels: this.labelConteggioProdotti,

            datasets: [
              {
                label: 'Prodotti',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)', // Colore per la prima barra
                  'rgba(54, 162, 235, 0.8)', // Colore per la seconda barra
                  'rgba(255, 206, 86, 0.8)', // Colore per la terza barra
                  'rgba(75, 192, 192, 0.8)', // Colore per la quarta barra
                  'rgba(153, 102, 255, 0.8)', // Colore per la quinta barra
                  'rgba(255, 159, 64, 0.8)', // Colore per la sesta barra
                  // Puoi aggiungere ulteriori colori per altre barre se necessario
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)', // Colore del bordo per la prima barra
                  'rgba(54, 162, 235, 1)', // Colore del bordo per la seconda barra
                  'rgba(255, 206, 86, 1)', // Colore del bordo per la terza barra
                  'rgba(75, 192, 192, 1)', // Colore del bordo per la quarta barra
                  'rgba(153, 102, 255, 1)', // Colore del bordo per la quinta barra
                  'rgba(255, 159, 64, 1)', // Colore del bordo per la sesta barra
                  // Puoi aggiungere ulteriori colori del bordo per altre barre se necessario
                ],
                data: this.valuesConteggioProdotti,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('Complete');
      },
    });
    // ---------------------------------- END GRAFICO CONTEGGIO PRODOTTI VENDUTI ----------------------------------
    // ---------------------------------- START GRAFICO GUADAGNI MENSILI ----------------------------------

    this.productService.getGuadagniMensili().subscribe({
      next: (response: any) => {
        const responseData = response.body; // Accesso al corpo della risposta
        responseData.map((item: any) => {
          this.labelGuadagniMensili.push(item[0]);
          this.valuesGuadagniMensili.push(item[1]);
        });
        this.chart3 = new Chart('canvas3', {
          type: 'line',
          data: {
            labels: this.labelGuadagniMensili,
            datasets: [
              {
                label: 'Gadagni',
                data: this.valuesGuadagniMensili,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom', // Posizione della legenda in basso
              },
            },
          },
        });
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
    // ---------------------------------- END GRAFICO GUADAGNI MENSILI  ----------------------------------
  }
}
