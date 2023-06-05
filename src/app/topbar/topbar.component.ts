import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {


  constructor(
    public userService: UserService) {

  }
  ngOnInit(): void {
    

  }

}
