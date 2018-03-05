import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {LangService} from "../services/lang.service";
import {rtSimple} from "../router.animations";
import {DeleteUserService} from "../services/delete-user.service";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  animations: [rtSimple()]
})
export class DeleteUserComponent implements OnInit {

  private token: string;
  private userId: string;

  message: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private deleteUserService: DeleteUserService,
              private lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.DeleteUser.title}`
    );

    this.route.params.map(p => p['user'])
      .subscribe((userId) => {
        this.userId = userId;
      });

    this.route.params.map(p => p['token'])
      .subscribe((token) => {
        this.token = token;
      });

    // send request
    this.deleteUserService.deleteUser(this.userId, this.token)
      .then(res => {
        if (res.message.includes('User does not exist')) {
          this.router.navigate(['/']);
        } else {
          this.message = this.lang.text.DeleteUser.userDeleted;
        }
      })
      .catch(e => {
        this.router.navigate(['/']);
      });
  }

}
