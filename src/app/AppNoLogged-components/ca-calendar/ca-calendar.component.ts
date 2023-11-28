// ca-calendar.component.ts
import { Component } from '@angular/core';



@Component({
  selector: 'app-ca-calendar',
  templateUrl: './ca-calendar.component.html',
  styleUrls: ['./ca-calendar.component.css']
})
export class CaCalendarComponent {
  dataCorrente: Date = new Date();
  giorniAdiacenti: Date[] = [];
  ore: number[] = Array.from({ length: 13 }, (_, i) => i + 8);

  ngOnInit() {
    this.aggiornaGiorniAdiacenti();
  }

  cambiaGiorno(delta: number) {
    this.dataCorrente.setDate(this.dataCorrente.getDate() + delta);
    this.aggiornaGiorniAdiacenti();
  }

  aggiornaGiorniAdiacenti() {
    this.giorniAdiacenti = Array.from({ length: 7 }, (_, i) => {
      const giorno = new Date(this.dataCorrente);
      giorno.setDate(this.dataCorrente.getDate() + i);
      return giorno;
    });
  }
}
