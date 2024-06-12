import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ProductServiceService } from 'src/app/service/product-service.service';


@Component({
  selector: 'app-ca-overwiew',
  templateUrl: './ca-overwiew.component.html',
  styleUrls: ['./ca-overwiew.component.css'],

})
export class CaOverwiewComponent {

	constructor(
		private productService: ProductServiceService
	  ){}

	employeesCounter : number = 0;
    productsCounter : number = 0;
    customersCounter : number = 0;
    eventsCounter : number = 0;

	ngOnInit(): void {
		this.productService.getAllCounters().subscribe({
		  next: (response: any) => {
			
			const responseData = response.body; // Accesso al corpo della risposta
			console.log("Response data:", responseData); // Logga i dati ricevuti
			
			this.employeesCounter = responseData.employeesCounter;
			this.productsCounter =responseData.productsCounter;
			this.customersCounter = responseData.customersCounter;
			this.eventsCounter = responseData.eventsCounter;
			
		   
		  },
		  error: (error) => console.error(error),
		  complete: () => {console.info('complete')},
		});
	  }

  chartOptions = {
    animationEnabled: true,
    height: 270,
    exportEnabled: false,  // Disattiva l'opzione di esportazione
    creditText: "",  // Rimuovi il testo del credito
    data: [{
        type: "column",
        dataPoints: [
            { label: "Balsamo Silver", y: 10 },
            { label: "Balsamo Legni", y: 15 },
            { label: "Cera", y: 25 },
            { label: "Gel", y: 30 }
        ]
    }]                
};
   

  chartOptions1= {
    height:300,
    creditHref: null, // Disattiva il link di credito
	  animationEnabled: true,
	 legend: {
      horizontalAlign: "center", // "left", "right", "center"
      verticalAlign: "bottom",   // "top", "bottom"
      fontSize: 12
  },
	  data: [{
      showInLegend : true,
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 28, name: "Il più pazzo" },
		  { y: 10, name: "Flavio" },
		  { y: 20, name: "Matteo" },
      { y: 20, name: "Mattia" },
      { y: 20, name: "Emanuele" },

		]
	  }]
	};

  chartOptions2 = {
    height: 300,
	  animationEnabled: true,
	  exportEnabled: true,
    creditHref: false, // Disattiva il link di credito
	  axisY: {
		title: "Guadagni",
		valueFormatString: "#,###.##''"
	  },
	  data: [{
		type: "spline",
		xValueFormatString: "YYYY",
		yValueFormatString: "#,###.##''",
		dataPoints: [
		  
		  { x: new Date(2009, 0, 1), y: 0 },
		  { x: new Date(2010, 0, 1), y: 300064 },
		  { x: new Date(2011, 0, 1), y: 500065 },
		  { x: new Date(2012, 0, 1), y: 200048 },
		  { x: new Date(2013, 0, 1), y: 200019 },
		  { x: new Date(2014, 0, 1), y: 200047 },
		  { x: new Date(2015, 0, 1), y: 400077 },
		  { x: new Date(2016, 0, 1), y: 500032 },
		  { x: new Date(2017, 0, 1), y: 500009 },
		  { x: new Date(2018, 0, 1), y: 500042 },
		  { x: new Date(2019, 0, 1), y: 500013 },
		  { x: new Date(2020, 0, 1), y: 300098 }
		]
	  }]
	};
}
