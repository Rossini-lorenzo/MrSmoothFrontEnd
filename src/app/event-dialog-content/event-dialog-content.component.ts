import { Component, ElementRef } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-event-dialog-content',
  templateUrl: './event-dialog-content.component.html',
  styleUrls: ['./event-dialog-content.component.css']
})
export class EventDialogContentComponent {
  title: string = '';
  description: string = '';

  constructor(public dialogRef: MatDialogRef<EventDialogContentComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLTextAreaElement>;


  getTitleValue(): string {
    return this.titleInput.nativeElement.value;
  }

  getDescriptionValue(): string {
    return this.descriptionInput.nativeElement.value;
  }
}
