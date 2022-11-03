import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from './core/services/http.service';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myControl = new FormControl();
  form!: FormGroup;
  filterRegions: Observable<any> | undefined;
  data: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpService: HttpService) {
    this.filterRegions = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((name: string) => {
        return this.httpService.getStates(name)
      })
    )
  }
}