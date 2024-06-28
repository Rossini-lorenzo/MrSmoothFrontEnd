import { Component, LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ActivatedRoute } from '@angular/router';
import itLocale from '@fullcalendar/core/locales/it';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogContentComponent } from 'src/app/event-dialog-content/event-dialog-content.component';
import * as moment from 'moment';
import 'moment/locale/it'; // Importa il file di localizzazione italiano



interface Evento {
  id:string;
  description: string;
  summary: string;
  start: string;
  end: string;
  classNames: ['my-custom-event']; 
}

@Component({
  selector: 'app-ca-calendar',
  templateUrl: './ca-calendar.component.html',
  styleUrls: ['./ca-calendar.component.css']
})
export class CaCalendarComponent {

  selectedDate: Date;
  dateSelected(date: Date): void {
    this.selectedDate = date;
  }

  http: any;
   //backendUrl: string = 'https://mrsmooth-9e8bb3d010e3.herokuapp.com/';
   apiUrl = `${environment.apiBaseUrl}/`;
   loading: boolean = false;

  showModal: boolean = true;
  calendarOptions: CalendarOptions  = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    eventDisplay: 'block', // Imposta la visualizzazione degli eventi come blocchi
    slotMinTime: '06:00', // Imposta l'ora minima a 8:00 di mattina
    slotMaxTime: '21:00', // Imposta l'ora massima a 21:00 di sera
    slotDuration: '00:30:00', // Imposta la durata degli slot a 15 minuti
    allDaySlot: false, // Disabilita lo slot "All-day"
    titleFormat: { year: 'numeric', month: 'long' },
    dayHeaderContent: function (args) {
      return {
         html: '<div class="custom-day-header" style=" text-decoration: none!important; ">' +
        '<div class="day-number" style=" text-decoration: none; ">' + moment(args.date).format('D') + '</div>' +
        '<div class="day-name" style=" text-decoration: none; ">' + moment(args.date).format('ddd') + '</div>' +
      '</div>',       }},

    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    locale: 'it', // Imposta la lingua italiana direttamente tramite l'opzione locale

    slotMinWidth: 50, // Puoi regolare questo valore in base alle tue esigenze

    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this), // Assegna la funzione handleEventClick all'azione eventClick
    events: [] // Inizialmente senza eventi
  };
  events :any = [];
  employees: any= [];  // Definire l'array di oggetti come 'any[]'

  constructor(private route: ActivatedRoute,private httpClient: HttpClient,private productService: ProductServiceService,private dialog: MatDialog) {}
 
  ngOnInit(): void {
    this.selectedDate = new Date();
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      eventDisplay: 'block', // Imposta la visualizzazione degli eventi come blocchi
      slotMinTime: '06:00', // Imposta l'ora minima a 8:00 di mattina
      slotMaxTime: '21:00', // Imposta l'ora massima a 21:00 di sera
      slotDuration: '00:30:00', // Imposta la durata degli slot a 15 minuti
      allDaySlot: false, // Disabilita lo slot "All-day"
      titleFormat: { year: 'numeric', month: 'long' },
      dayHeaderContent: function (args) {
        return {
           html: '<div class="custom-day-header" style=" text-decoration: none!important; ">' +
          '<div class="day-number" style=" text-decoration: none; ">' + moment(args.date).format('D') + '</div>' +
          '<div class="day-name" style=" text-decoration: none; ">' + moment(args.date).format('ddd') + '</div>' +
        '</div>',       }},

      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      locale: 'it', // Imposta la lingua italiana direttamente tramite l'opzione locale

      slotMinWidth: 50, // Puoi regolare questo valore in base alle tue esigenze

      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this), // Assegna la funzione handleEventClick all'azione eventClick
      events: [] // Inizialmente senza eventi
    };
    

    //this.loadEvents(); // Carica gli eventi all'inizio

    // Ottieni il parametro "code" dall'URL dopo l'autenticazione
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        localStorage.setItem('googleAuthCode', code);
        

        this.productService.putCodeAuth(localStorage.getItem("googleAuthCode")!).subscribe({
          next: (response: any) => {
            const responseData = response.body;
            console.log(response);
          },
          error: (error) => console.error(error),
          complete: () => {console.info('complete');
            // Dopo l'autenticazione, carica di nuovo gli eventi
            
        },
        });

      }
      
    setTimeout(() => {
      // Il codice qui verrà eseguito dopo 1 secondo
      this.loadEvents();
    }, 500); // 1000 millisecondi = 1 secondo
    });
  }

  loadEvents(): void {
    const accessToken = localStorage.getItem("googleAuthCode");
    if (accessToken !== null && accessToken !== "") {
      this.productService.getAllEvent().subscribe({
        next: (response: any) => {
          const responseData = response.body;
          console.log('Response Data:', responseData);
          const events = responseData.map((item: any) => ({
            id: item.id,
            title: item.summary,
            start: item.start.dateTime,
            end: item.end.dateTime,
            description: item.description,
            classNames: ['my-custom-event']
          }));
          console.log('Formatted Events:', events);
          this.calendarOptions.events = events;
          this.events = events;
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }
  
  

  
  authenticateWithGoogleCalendar() {
    const accessToken = localStorage.getItem('googleAuthCode');
     console.log("AUT",accessToken);
    if (accessToken) {
      // Se l'utente è già autenticato, carica gli eventi
      this.loadEvents();
      window.location.reload();
    } else {
      // Altrimenti, procedi con l'autenticazione
      const authUrl = "http://localhost:8080/googleCalendar/login/google";
  
      // Apri una finestra popup per l'autenticazione
      const popup = window.open(authUrl, '_blank', 'width=600,height=600');
  
      // Attendi il risultato dell'autenticazione
      window.addEventListener('message', (event) => {
        if (event.data.type === 'authorization_response') {
          localStorage.setItem('googleAuthCode', event.data.code);
          this.loadEvents(); // Carica gli eventi dopo l'autenticazione
        }
      });
      window.location.reload();

    }
  }
  
  
 
  
  
  getItem(){
    return localStorage.getItem("googleAuthCode");
  }

 
 
  
 //modifica larghezza evento
 
 mostraDettagli: boolean = false;
  eventoSelezionato: any;

  // Quando il mouse entra nell'evento
  mostraDettagliEvento(evento: any) {
    this.mostraDettagli = true;
    this.eventoSelezionato = evento;
  }

  // Quando il mouse esce dall'evento
  nascondiDettagliEvento() {
    this.mostraDettagli = false;
    this.eventoSelezionato = null;
  }

 





// Creazione evento
handleDateSelect(selectInfo: any) {
  const dialogRef = this.dialog.open(
    // Contenuto del dialogo
    EventDialogContentComponent,
    {
      width: '400px',
      disableClose: true,
      autoFocus: true,
      position: { top: '0%', left: '55%' } // Imposta la posizione al centro

    }
  );
  dialogRef.afterOpened().subscribe(() => {
    const dialogContainer = document.querySelector('.mat-dialog-container');
    if (dialogContainer) {
      dialogContainer.setAttribute('style', 'margin-top: -2000px'); // Imposta il margine superiore per centrare il dialogo
    }
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      const title = dialogRef.componentInstance.getTitleValue();
      const description = dialogRef.componentInstance.getDescriptionValue();
     

      const startDate = new Date(selectInfo.startStr).toISOString();
      const endDate = new Date(selectInfo.endStr).toISOString();

      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        description,
      };
   
      
      
      this.productService.createEvent(title, description,      result.employee
        , startDate, endDate).subscribe({
        next: (response: any) => {
          const responseData = response.body;
          console.log("RESP", response);

          // Aggiungi l'evento al calendario solo se la chiamata al backend ha avuto successo
          if (this.calendarOptions.events && Array.isArray(this.calendarOptions.events)) {
            this.calendarOptions.events.push(newEvent);
            this.calendarOptions.events = [...this.calendarOptions.events];
          }
          this.showAlert("Evento creato")
          this.loadEvents();
        },
        error: (error) => {
          alert('Si è verificato un errore durante la chiamata al backend. Riprova più tardi.');
          console.error("ERROE", error);
        },
        complete: () => console.info('Chiamata al backend completata'),
      });
    }
  });
}

  //rimozione evento 
  handleEventClick(clickInfo: any) {
    console.log("ID dell'evento cliccato:", clickInfo.event);

    if (this.calendarOptions.events && Array.isArray(this.calendarOptions.events)) {
      if (confirm("Sei sicuro di voler eliminare questo evento?")) {
        // Rimuovi l'evento dal calendario
        this.calendarOptions.events = this.calendarOptions.events.filter((event: any) => {
          return event.id !== clickInfo.event.id;
        });
  
        // Aggiorna il calendario
        clickInfo.event.remove();
  
        // Effettua la chiamata per eliminare l'evento dal backend
        this.productService.deleteEvent(clickInfo.event.id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.showAlert("Evento cancellato")
          },
          error: (error) => alert(error),
          complete: () => console.info('complete'),
        });
      }
    }
  }
  
  
  deleteEvent(eventId: string) {
    return this.httpClient.delete(`${this.apiUrl}/events/${eventId}`);
  }
  
  
  showAlert(message :string) {
    var alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px'; // Posiziona l'avviso a 20px dal bordo superiore
    alertDiv.style.left = '57%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.background = '#add7f6';
    alertDiv.style.color = '#20282d'; 
    alertDiv.style.padding = '30px';
    alertDiv.style.borderRadius = '10px';
    alertDiv.style.zIndex = '9999'; // Imposta lo z-index su un valore elevato
    alertDiv.textContent = message;


    // Aggiungi il div al corpo del documento
    document.body.appendChild(alertDiv);

    // Rimuovi il div dopo un certo periodo di tempo (ad esempio, dopo 3 secondi)
    setTimeout(function() {
      document.body.removeChild(alertDiv);
  }, 3000); // Tempo in millisecondi (3 secondi)
}







}