import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PeopleService, Person } from '../services/people.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeopleService]
})
export class HomeComponent implements OnInit {

  people: Person[] = [];
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.updatePeople();

    this.createForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }, {});
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      return;
    }
    this.peopleService.addPerson(this.createForm.value).subscribe(() => {
      this.updatePeople();
    });
    this.createForm.reset();
  }

  save(person: any) {
    this.peopleService.updatePerson(person).subscribe(() => {
      person.edit = false;
    })
  }

  delete(person: Person) {
    this.peopleService.deletePerson(person._id).subscribe(() => {
      this.updatePeople();
    });
  }

  setEdit(person: any) {
    person.original = Object.assign({}, person);
    person.edit = true;
  }

  cancelEdit(person: any) {
    this.people = this.people.map(p => p._id === person._id ? person.original : p);
  }

  private updatePeople() {
    this.peopleService.getPeople().subscribe(data => {
      this.people = data;
    });
  }
}
