import { Component, LOCALE_ID, Inject, ViewChild, HostListener } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ServicesServiceService } from 'src/app/service/services-service.service';
import { CustomersServiceService } from 'src/app/service/customers-service.service';

import { ActivatedRoute } from '@angular/router';
import itLocale from '@fullcalendar/core/locales/it';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogContentComponent } from 'src/app/event-dialog-content/event-dialog-content.component';
import moment from 'moment';
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

   //backendUrl: string = 'https://mrsmooth-9e8bb3d010e3.herokuapp.com/';
   apiUrl = `${environment.apiBaseUrl}/`;

  @ViewChild('fullcalendar', { static: false }) fullcalendar: FullCalendarComponent;

  // Mat Calendar 
  selectedDate: Date;
  activeDate: Date; 

  // Rimozione evento
  clickInfoDelete: any

  // Cazione evento 
  selectedEmployee: any;
  selectedService: any;
  description: string = '';
  employees: any= [];  
  services: any= []; 
  cliente: string = '';
  customers: { nomeCliente: string; cognomeCliente: string }[] = [];
  filteredSuggestions: { nomeCliente: string; cognomeCliente: string }[] = [];
  isOpen: boolean = false; // Variabile per gestire la visibilità della lista dei suggerimenti

  startDateCreateEvent : any;
  endDateCreateEvent : any;

  events :any = [];

  http: any;


  calendarOptions: CalendarOptions  = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    eventDisplay: 'block', // Imposta la visualizzazione degli eventi come blocchi
    slotMinTime: '07:00', // Imposta l'ora minima a 8:00 di mattina
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
      left: '',
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
  

  constructor(private route: ActivatedRoute,private httpClient: HttpClient,private productService: ProductServiceService,
    private dialog: MatDialog,private servicesService :ServicesServiceService,private customersService :CustomersServiceService) {
     this.selectedDate = new Date();
     this.activeDate = this.selectedDate; // Inizializza activeDate con selectedDate
    }
 

  


  ngOnInit(): void {

    // IMPORTO TUTTI I DIPENDENTI PER LA SELECT DEI DIPENDENTI
    this.productService.getAllEmployee().subscribe({
      next: (response: any) => {
        
        const responseData = response.body; // Accesso al corpo della risposta
        console.log("Response data:", responseData); // Logga i dati ricevuti
        
          for (const emp of responseData) {
            const employee = {
              idDipendente: emp.id,
              nomeDipendente: emp.nome,
              cognomeDipendente: emp.cognome
            };
            this.employees.push(employee);
          }
        
       
      },
      error: (error) => console.error(error),
      complete: () => {console.info('complete');console.log(this.employees)},
    });


    //IMPORTO TUTTI I SERVIZI PER LA SELECT DEI SERVIZI
    this.servicesService.getAllService().subscribe({
      next: (response: any) => {
        
        const responseData = response.body; // Accesso al corpo della risposta
        console.log("Response data:", responseData); // Logga i dati ricevuti
        
          for (const serv of responseData) {
            const service = {
              serviceName: serv.serviceName
            };
            this.services.push(service);
          }
        
       
      },
      error: (error) => console.error(error),
      complete: () => {console.info('complete');console.log(this.employees)},
    });

  //IMPORTO TUTTI I CLIENTI PER LA SELECT DEI CLIENTI
  this.customersService.getAllCustomer().subscribe({
    next: (response: any) => {
      
      const responseData = response.body; // Accesso al corpo della risposta
      console.log("Response data:", responseData); // Logga i dati ricevuti
      
        for (const cust of responseData) {
          const customer = {
            nomeCliente: cust.nome,
            cognomeCliente: cust.cognome
          };
          this.customers.push(customer);
        }
      
    
    },
    error: (error) => console.error(error),
    complete: () => {console.info('complete');console.log(this.employees)},
  });
    
   console.log("CUST",this.customers);
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      initialDate: this.selectedDate, // Imposta la data iniziale alla data selezionata
      eventDisplay: 'block', // Imposta la visualizzazione degli eventi come blocchi
      slotMinTime: '07:00', // Imposta l'ora minima a 8:00 di mattina
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
        left: '',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      locale: 'it', // Imposta la lingua italiana direttamente tramite l'opzione locale

      slotMinWidth: 50, // Puoi regolare questo valore in base alle tue esigenze

      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this), // Assegna la funzione handleEventClick all'azione eventClick
     // datesSet: this.handleViewChange.bind(this), // Assegna la funzione handleViewChange al cambio di date nel calendario
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



//handleViewChange(viewChangeInfo: any) {
  //this.activeDate = viewChangeInfo.start; // Aggiorna selectedDate con la data di inizio della nuova visualizzazione
//}

dateSelected(date: Date): void {
  this.selectedDate = date;
  this.activeDate = date; // Assicurati che activeDate venga aggiornato con la data selezionata

  const calendarApi = this.fullcalendar.getApi();
  calendarApi.gotoDate(date); // Vai alla data selezionata nel fullcalendar
}



 //AUTOCOMPLETE 
 onInputChange() {
  const filterValue = this.cliente.toLowerCase();
  this.filteredSuggestions = this.customers.filter(cliente =>
    `${cliente.nomeCliente} ${cliente.cognomeCliente}`.toLowerCase().includes(filterValue)
  );
  this.isOpen = this.filteredSuggestions.length > 0; // Mostra la lista solo se ci sono suggerimenti
}

selectSuggestion(suggestion: { nomeCliente: string; cognomeCliente: string }) {
  this.cliente = `${suggestion.nomeCliente} ${suggestion.cognomeCliente}`;
  this.filteredSuggestions = [];
  this.isOpen = false; // Chiude la lista dopo la selezione
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.autocomplete-container')) {
    this.isOpen = false; // Chiude la lista se il clic è fuori dal contenitore
  }
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
      console.log("Elese",event);

      // Altrimenti, procedi con l'autenticazione
      const authUrl = "http://localhost:8080/googleCalendar/login/google";
  
      // Apri una finestra popup per l'autenticazione
      const popup = window.open(authUrl, '_blank', 'width=600,height=600');
  
      // Attendi il risultato dell'autenticazione
      window.addEventListener('message', (event) => {
        console.log("E",event);
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

 


  //Click bottone crea evento
  creaEvento(){
    console.log(this.description +" " + this.cliente+ " "+this.selectedEmployee)
    const newEvent = {
      title:this.cliente,
      start: this.startDateCreateEvent,
      end: this.endDateCreateEvent,
      description : this.description,
    };

    this.productService.createEvent(this.cliente, this.description,this.selectedEmployee
      ,  new Date(this.startDateCreateEvent).toISOString(),  new Date(this.endDateCreateEvent).toISOString()).subscribe({
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
        const cardElement = document.getElementById('creaEvento');
        if (cardElement){
          cardElement.style.display = 'none';

        }
      },
      error: (error) => {
        alert('Si è verificato un errore durante la chiamata al backend. Riprova più tardi.');
        console.error("ERROE", error);
      },
      complete: () => console.info('Chiamata al backend completata'),
    });
  }


  closeCard(){
    const cardElement = document.getElementById('creaEvento');
    if (cardElement){
      cardElement.style.display = 'none';
    }
  }

// Creazione evento click sul calendario (NO click su eventi)
handleDateSelect(selectInfo: any) {
  this.cliente="";
  this.description="";
  this.selectedService="";
  this.selectedEmployee="";


  const cardElement = document.getElementById('creaEvento');
  const spanElement = document.getElementById('creaEventoTitolo');
  const creaEventoBtn = document.getElementById('creaEventoBtn');
  const cancellaEventoBtn = document.getElementById('cancellaEventoBtn');
  const eliminaEventoBtn = document.getElementById('eliminaEventoBtn');

  this.startDateCreateEvent = selectInfo.startStr;
  this.endDateCreateEvent =selectInfo.endStr;


  if (cardElement&&spanElement&&creaEventoBtn&&cancellaEventoBtn&&eliminaEventoBtn) {
    cardElement.style.display = 'block';
    creaEventoBtn.style.display = 'block';
    cancellaEventoBtn.style.display = 'none';
    eliminaEventoBtn.style.display = 'none';
    //Titolo card
    const startDate = new Date(selectInfo.start);
    const formattedDate = startDate.toLocaleString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    spanElement.innerText = formattedDate;


  } else {
    console.error('Elemento con id "creaEvento" non trovato');
  }


 
}

   // click bottone rimozione evento 
   cancellaEvento(){
    if (this.calendarOptions.events && Array.isArray(this.calendarOptions.events)) {
      if (confirm("Sei sicuro di voler eliminare questo evento?")) {


        console.log("xxxxxx",   this.calendarOptions.events.find(event => event.id === this.clickInfoDelete.event.id));
        // Rimuovi l'evento dal calendario
        this.calendarOptions.events = this.calendarOptions.events.filter((event: any) => {
          return event.id !== this.clickInfoDelete.event.id;
          

        });
        
        // Aggiorna il calendario
        this.clickInfoDelete.event.remove();
  
        // Effettua la chiamata per eliminare l'evento dal backend
        this.productService.deleteEvent(this.clickInfoDelete.event.id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.showAlert("Evento cancellato")
            const cardElement = document.getElementById('creaEvento');
            if (cardElement){
              cardElement.style.display = 'none';
    
            }
          },
          error: (error) => alert(error),
          complete: () => console.info('complete'),
        });
      }
    }
   }


  //rimozione evento 
  handleEventClick(clickInfo: any) {
    //const c : any = document.getElementById('a.fc-timeline-event.fc-h-event.fc-event.'+ clickInfo.calEvent.id);      



    const cardElement = document.getElementById('creaEvento');
    const spanElement = document.getElementById('creaEventoTitolo');
    const cancellaEventoBtn = document.getElementById('cancellaEventoBtn');
    const eliminaEventoBtn = document.getElementById('eliminaEventoBtn');
    const creaEventoBtn = document.getElementById('creaEventoBtn');

    this.clickInfoDelete = clickInfo;
    console.log("ID dell'evento cliccato:", clickInfo.event.id);

    let evento: any;

    if (this.calendarOptions.events && Array.isArray(this.calendarOptions.events)) {
        evento = this.calendarOptions.events.find(event => event.id === clickInfo.event.id);
    }

    if (cardElement && spanElement && creaEventoBtn && cancellaEventoBtn && eliminaEventoBtn) {
        cardElement.style.display = 'block';
        creaEventoBtn.style.display = 'none';
        cancellaEventoBtn.style.display = 'block';
        eliminaEventoBtn.style.display = 'block';

        // Titolo card
        const startDate = clickInfo.event.start;
        if (startDate) {
            const formattedDate = startDate.toLocaleString('it-IT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            spanElement.innerText = formattedDate;
        } else {
            console.error('Data di inizio evento non valida');
        }

        this.cliente = evento.title;
        this.description = evento.description;
    } else {
        console.error('Elemento con id "creaEvento" non trovato');
    }


    console.log("EVENTO", this.fullcalendar.getApi().getEventById(clickInfo.event.id));
    console.log("EVENTO", this.fullcalendar.getApi().getEventSourceById(clickInfo.event.id));
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