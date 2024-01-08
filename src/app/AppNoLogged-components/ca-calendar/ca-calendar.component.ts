import { Component, LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
  selector: 'app-ca-calendar',
  templateUrl: './ca-calendar.component.html',
  styleUrls: ['./ca-calendar.component.css']
})
export class CaCalendarComponent {
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


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin], // Assicurati di includere interactionPlugin
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridWeek,dayGridDay'
    },
    selectable: true, // Abilita la selezione di una data
    select: this.handleDateSelect.bind(this), // Gestisci la selezione di una data
    events: this.events
  };

  handleDateSelect(selectInfo: any) {
    const title = prompt('Inserisci il titolo dell\'evento:');
    const description = prompt('Inserisci la descrizione dell\'evento:') || ''; // Usa '' se la descrizione è null
  
    if (title) {
      const newEvent = { title, description, date: selectInfo.startStr };
      //this.events.push(newEvent);
      this.calendarOptions.events = this.events;
    }
  
    
  }
}