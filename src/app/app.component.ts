import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogProject';

  constructor() {
    var config = {
      apiKey: "AIzaSyCm-a_U8mszsFNKZa48rBETdGuVi4rpp1c",
      authDomain: "blogproject-8fb09.firebaseapp.com",
      databaseURL: "https://blogproject-8fb09.firebaseio.com",
      projectId: "blogproject-8fb09",
      storageBucket: "blogproject-8fb09.appspot.com",
      messagingSenderId: "712795597088"
    };
    firebase.initializeApp(config);
  }
}
