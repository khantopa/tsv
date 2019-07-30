import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from 'src/app/store/app.state';
import { CurrentUser, UpdateUser, Logout } from 'src/app/store/actions/user.actions';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('image') image:ElementRef;

  public user: any;

  public uploader: FileUploader = new FileUploader({url: '/api/user/upload', isHTML5: true, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'] });
  
  public imageUrl: string;

  public passwordType: string = 'password';

  public isShown: boolean = false;
  
  public subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>) {
    this.store.dispatch(new CurrentUser());
   }

  ngOnInit() {
    let usersState: Observable<any> = this.store.select(selectUser);
    let userSubscription = usersState.subscribe(user => {
      this.user = user; 
      if(this.user) {
        this.imageUrl = `api/user/image/${this.user.fileName}`;
        this.user.password = '';
        this.user.confirmPassword = ''; 
      }     
    });
    this.subscriptions.push(userSubscription);
  }

  uploadImage() {
    let el: HTMLElement = this.image.nativeElement as HTMLElement;      
    el.click();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let result = JSON.parse(response)
      this.imageUrl = `api/user/temp/${result.fileName}`
      this.user.image = result.path
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      alert('Accept only images')
    }
  }

  fileOverBase(e) {
    this.uploadImage();
    this.uploader.uploadAll();
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


  update() {
    this.store.dispatch(new UpdateUser(this.user));
  }

  logout() {
    this.store.dispatch(new Logout())
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
