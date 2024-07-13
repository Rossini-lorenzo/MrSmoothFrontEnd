import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sc-modal',
  templateUrl: './sc-modal.component.html',
  styleUrl: './sc-modal.component.css'
})
export class ScModalComponent {
  @Input() title = '';
  @Input() isOpen = false; // Dichiarazione della proprietà isOpen
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onAdd() {
    this.add.emit();
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
