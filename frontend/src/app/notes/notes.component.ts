import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from '../shared/models/note.model';
import { NotesService } from '../shared/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public dataSource: Note[] = []

  public displayedColumns: string[] = ['id', 'text'];

  constructor(private notesService: NotesService) { }

  public ngOnInit(): void {
    this.loadData()
  }

  public addNote(note: Note): void {
    this.dataSource = this.dataSource.concat([note]);
  }

  private loadData() {
    this.notesService.getNotes()
      .subscribe(
        (notes: Note[]) => {
          this.dataSource = this.dataSource.concat(notes);
        },
        (error) => console.log(error),
      );
  }
}
