import { Component, LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import itLocale from '@fullcalendar/core/locales/it';


@Component({
  selector: 'app-ca-calendar',
  templateUrl: './ca-calendar.component.html',
  styleUrls: ['./ca-calendar.component.css']
})
export class CaCalendarComponent {
  showModal = false;
  modalTitle = '';
  action = ''; // add, edit, delete
  event: any = {}; // Oggetto per memorizzare i dettagli dell'evento
  events = [
    {
      title: 'event 1',
      description: 'descrizione evento 1',
      start: '2023-12-12T10:00:00',
      end: '2023-12-12T10:30:00'  // Fine evento a 12:00 (durata di 2 ore)
    },
    {
      title: 'event 3',
      description: 'descrizione evento 1',
      start: '2023-12-12T10:00:00',
      end: '2023-12-12T10:30:00'  // Fine evento a 12:00 (durata di 2 ore)
    },
    {
      title: 'event 2',
      description: 'descrizione evento 2',
      start: '2023-12-13T15:30:00',
      end: '2023-12-13T17:30:00'  // Fine evento a 17:30 (durata di 2 ore)
    }
  ];

  calendarOptions: CalendarOptions;

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin,bootstrap5Plugin], // Assicurati di includere interactionPlugin
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,dayGridMonth'
    },
    selectable: true, // Abilita la selezione di una data
    select: this.handleDateSelect.bind(this), // Gestisci la selezione di una data
    events: this.events,
    themeSystem: 'bootstrap5',
    locale: itLocale,
    nowIndicator: true,
    };
  }


  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin,bootstrap5Plugin], // Assicurati di includere interactionPlugin
  //   initialView: 'timeGridWeek',
  //   headerToolbar: {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: 'timeGridWeek,timeGridDay,dayGridMonth'
  //   },
  //   selectable: true, // Abilita la selezione di una data
  //   select: this.handleDateSelect.bind(this), // Gestisci la selezione di una data
  //   events: this.events,
  //   themeSystem: 'bootstrap5',
  //   locale: itLocale,
  //   nowIndicator: true,
  // };

  openEventModal(action: string, eventData?: any) {
    console.log('Chiamata openEventModal con azione:', action); // Verifica se la funzione viene chiamata correttamente
    this.showModal = true;
    this.action = action;
    if (action === 'add') {
      this.modalTitle = 'Aggiungi evento';
      this.event = {};
    } else if (action === 'edit') {
      this.modalTitle = 'Modifica evento';
      this.event = { ...eventData };
    } else if (action === 'delete') {
      this.modalTitle = 'Elimina evento';
      this.event = { ...eventData };
    }
  }

  closeEventModal() {
    this.showModal = false;
  }

  performAction() {
    if (this.action === 'delete') {
      // Qui puoi inserire la logica per eliminare l'evento
      console.log('Elimina evento:', this.event);
      // Rimuovi l'evento dalla lista degli eventi
      this.events = this.events.filter(event => event !== this.event);
    } else {
      // Qui puoi inserire la logica per aggiungere/modificare l'evento
      console.log(this.action === 'add' ? 'Aggiungi evento:' : 'Modifica evento:', this.event);
      // Aggiungi o modifica l'evento nella lista degli eventi
      if (this.action === 'add') {
        this.events.push(this.event);
      }
    }
    // Aggiorna gli eventi nel calendario
    this.closeEventModal();
  }

  handleDateSelect(selectInfo: any) {
    console.log('Data selezionata:', selectInfo); // Controlla se la funzione viene chiamata
    // Imposta la data dell'evento sulla data selezionata
    this.event.start = selectInfo.startStr;
    this.event.end = selectInfo.endStr;
  
    // Apri la modale per aggiungere un nuovo evento
    this.openEventModal('add');
  }
}