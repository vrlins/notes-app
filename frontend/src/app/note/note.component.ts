import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../shared/models/note.model';
import { NotesService } from '../shared/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public note: String | null = null

  @Output()
  public addedNoteEvent: EventEmitter<Note> = new EventEmitter();

  constructor(private notesService: NotesService) { }

  public ngOnInit(): void {
  }

  public sendNote(): void {
    if (this.note && this.note.trim().length > 0) {
      const data = {
        text: this.note
      }

      this.notesService.addNote(data)
        .subscribe(
          (note: Note) => {
            this.addedNoteEvent.emit(
              note
            )
          },
          (error) => console.log(error),
        );
    }

    this.note = null
  }
}
