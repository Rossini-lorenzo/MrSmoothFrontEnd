import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessagesServiceService } from 'src/app/service/messages-service.service';
export interface Message {
  id: number;
  messageName: string;
  messageText: string;
}

@Component({
  selector: 'app-sc-manage-automatic-message',
  templateUrl: './sc-manage-automatic-message.component.html',
  styleUrl: './sc-manage-automatic-message.component.css'
})
export class ScManageAutomaticMessageComponent implements OnInit {
  dataSource: Message[] = [];
  isLoading = false;

  selectedMessage: Message = {
    id: 0,
    messageName: '',
    messageText: '',
  };

  employeeToDelete = 0;

  modalTitle = '';
  modalActionType = '';
  isOpen = false;

  form: FormGroup;
  submitted = false;

  // Variabili per l'alert di successo
  showSuccessAlert = false;
  successMessage = '';

  constructor(
    private messagesService: MessagesServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllMessages();
    this.form = this.formBuilder.group({
      messageName: ['', Validators.required],
      messageText: ['', Validators.required],
    });
    // Se è stata selezionata una riga per la modifica, prepopola il form
  }

  public getAllMessages(): void {
    this.isLoading = true;
    this.messagesService.getAllMessage().subscribe({
      next: (response: Message[]) => {
        const responseData = response;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public addNewMessage(): void {
    this.isLoading = true;
    const newCustomer: Message = this.form.value;
    this.messagesService
      .addMessage(
        newCustomer.messageName,
        newCustomer.messageText,
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllMessages();
        },
      });
  }

  public updateMessage(): void {
    this.isLoading = true;
    this.selectedMessage = {
      ...this.selectedMessage,
      ...this.form.value,
    };
    if (!this.selectedMessage) return;

    this.messagesService
      .updateMessage(
        this.selectedMessage.id,
        this.selectedMessage.messageName,
        encodeURIComponent(this.selectedMessage.messageText),
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllMessages();
        },
      });
  }

  public deleteMessage(id: number): void {
    this.isLoading = true;
    this.messagesService.deleteMessage(id).subscribe({
      next: (response: any) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getAllMessages();
      },
    });
  }

  openModal(actionType: string, selectedMessage?: Message) {
    this.modalActionType = actionType;
    if (selectedMessage) this.employeeToDelete = selectedMessage.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedMessage);
  }

  initializeForm(selectedMessage?: Message) {
    switch (this.modalActionType) {
      case 'EDIT':
        if (selectedMessage) this.selectedMessage = { ...selectedMessage };
        this.form.patchValue({
          messageName: this.selectedMessage.messageName,
          messageText: this.selectedMessage.messageText,
        });
        break;
      case 'ADD':
        break;
      case 'DELETE':
        break;
      default:
        console.error('Azione non supportata');
    }
  }

  setModalTitle() {
    switch (this.modalActionType) {
      case 'EDIT':
        this.modalTitle = 'Modifica Messaggio';
        break;
      case 'ADD':
        this.modalTitle = 'Aggiungi Messaggio';
        break;
      case 'DELETE':
        this.modalTitle = 'Conferma Eliminazione';
        break;
      default:
        this.modalTitle = '';
    }
  }

  performAction() {
    // Esegui azioni in base al tipo di azione
    switch (this.modalActionType) {
      case 'EDIT':
        this.updateMessage();
        break;
      case 'ADD':
        this.addNewMessage();
        break;
      case 'DELETE':
        this.deleteMessage(this.employeeToDelete);
        break;
      default:
        console.error('Azione non supportata');
    }
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
    this.onReset();
  }

  onSubmit() {
    this.submitted = true;

    if (this.modalActionType === 'EDIT' || this.modalActionType === 'ADD') {
      if (this.form.invalid) {
        return;
      }
    }
    this.performAction();
  }

  convertDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 2500);
  }

  closeSuccessAlert(): void {
    this.showSuccessAlert = false;
  }
}
