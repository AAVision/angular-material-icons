import { Component, OnInit } from '@angular/core';
import { Icons } from '../models/icon.model';
import { IconService } from '../services/icon.service';
import { ToastrService } from 'ngx-toastr';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  date = new Date().getFullYear();
  isLoading = false;
  iconsCollection : Icons[] = [];
  iconCollectionMain: Icons[] = [];
  totalIcon = 0;

  constructor(private iconService: IconService,private toastr: ToastrService,
    private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.iconService.getIcons().subscribe(
      {
        next: (data:Icons[]) => {
            if(data){
              this.iconsCollection = data;
              this.iconCollectionMain=data;
              this.totalIcon = data.length;
              this.isLoading = false;
            }
        },
        error: err => console.error('An error occurred', err)
      })
  }

  copy(message:string){
    this.clipboard.copy(message);
    this.toastr.success('Copied Successfully');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filterValueLower = filterValue.toLowerCase();
    if(!filterValueLower){
      this.iconCollectionMain = this.iconsCollection
    }else{
      this.iconCollectionMain = this.iconsCollection.filter((x)=>{
        return x.iconName.includes(filterValueLower);
      });
      this.totalIcon = this.iconCollectionMain.length;
    }
  }
}
