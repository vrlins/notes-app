import { Component, ViewChild } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { Note } from './shared/models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(NotesComponent, { static: false })
  private notesComponent!: NotesComponent;

  public onAddedNote(note: Note): void {
    this.notesComponent.addNote(note)
  }
}
