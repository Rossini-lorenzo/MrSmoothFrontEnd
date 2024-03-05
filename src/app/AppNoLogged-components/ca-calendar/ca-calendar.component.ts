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
  http: any;
   //backendUrl: string = 'https://mrsmooth-9e8bb3d010e3.herokuapp.com/';
   apiUrl = `${environment.apiBaseUrl}/`;
   loading: boolean = false;

  showModal: boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin], // Assicurati di includere i plugin necessari
    initialView: 'timeGridWeek',
    eventClick: this.handleEventClick.bind(this),
    slotMinWidth: 50, // Puoi regolare questo valore in base alle tue esigenze
      locale: 'it', // Imposta la lingua italiana direttamente tramite l'opzione locale
      slotMinTime: '03:00', // Imposta l'ora minima a 8:00 di mattina
      slotMaxTime: '21:00', // Imposta l'ora massima a 21:00 di sera
      slotDuration: '00:30:00', // Imposta la durata degli slot a 15 minuti
      allDaySlot: false, // Disabilita lo slot "All-day"


    // altre opzioni del calendario...
  };
  events :any = [];

  constructor(private route: ActivatedRoute,private httpClient: HttpClient,private productService: ProductServiceService) {}
 
  ngOnInit(): void {

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      eventDisplay: 'block', // Imposta la visualizzazione degli eventi come blocchi
      slotMinTime: '03:00', // Imposta l'ora minima a 8:00 di mattina
      slotMaxTime: '21:00', // Imposta l'ora massima a 21:00 di sera
      slotDuration: '00:30:00', // Imposta la durata degli slot a 15 minuti
      allDaySlot: false, // Disabilita lo slot "All-day"


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
          const events = responseData.map((item: any) => ({
            id: item.id,
            title: item.summary,
            start: item.start.dateTime,
            end: item.end.dateTime,
            description: item.description,
            classNames: ['fc-timegrid-event-harness', 'my-custom-event'] // Aggiungi la classe personalizzata

          }));

          // Aggiorna gli eventi in calendarOptions
          this.calendarOptions.events = events;
          this.events = events; // Aggiorna anche la variabile locale per gli eventi
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  authenticateWithGoogleCalendar() {
    const url = "http://localhost:8080/googleCalendar/login/google";
    window.open(url);
  }

 
  
  
  getItem(){
    return localStorage.getItem("googleAuthCode");
  }

 
 
  
 //modifica larghezza evento
 



 


// creazione evento
handleDateSelect(selectInfo: any) {
  const title = prompt('Inserisci il titolo dell\'evento:');
  const description = prompt('Inserisci la descrizione dell\'evento:') || '';

  if (title) {
    const startDate = new Date(selectInfo.startStr).toISOString();
    const endDate = new Date(selectInfo.endStr).toISOString();

    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      description,
    };

    this.productService.createEvent(title, description, startDate, endDate).subscribe({
      next: (response: any) => {
        const responseData = response.body;
        console.log("RESP",response);

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
        console.error("ERROE",error);
      },
      complete: () => console.info('Chiamata al backend completata'),
    });
  }
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