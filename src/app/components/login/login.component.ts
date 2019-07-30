import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Login } from 'src/app/store/actions/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;

  public passwordType: string = 'password';

  public isShown: boolean = false;

  public subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      fileName: '',
      image: ''
    }
  }

  login() {
    this.store.dispatch(new Login(this.user))
  }

  showPassword () {
    if(this.isShown === true) {
      this.passwordType = 'password';
      this.isShown = false;
    } else {
      this.passwordType = 'text';
      this.isShown = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
