import { Component, OnInit, ViewChild, ElementRef, Directive, HostListener } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { CreateUser } from 'src/app/store/actions/user.actions';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

@Directive({ selector: '[ng2FileDrop]' })

export class SignupComponent implements OnInit {

  @ViewChild('image') image: ElementRef;

  @ViewChild('drop') drop: ElementRef;

  public user: User;

  public allowedType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

  public uploader: FileUploader = new FileUploader({ url: '/api/user/upload', isHTML5: true, allowedMimeType: this.allowedType  });

  public imageUrl: string;

  public passwordType: string = 'password';

  public isShown: boolean = false;

  public subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      fileName: '',
      image: ''
    }
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

  create() {
    this.store.dispatch(new CreateUser(this.user))
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
