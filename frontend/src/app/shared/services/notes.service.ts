import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) { }

  private notesApiURL = '/api/notes';

  public getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesApiURL);
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesApiURL, note);
  }

}