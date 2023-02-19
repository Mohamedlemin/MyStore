import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  fullName:string ='';

  total:number=0;

  constructor(private route: ActivatedRoute) {
   
    this.route.queryParams
      .subscribe(params => {
        this.fullName = params['fullName'];
        this.total = params['total'];
      }
    );
  }

}
