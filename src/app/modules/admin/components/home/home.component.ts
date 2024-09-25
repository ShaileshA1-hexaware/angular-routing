import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public empData:any=[];
  constructor(private dataservice:DataService){

  }
  ngOnInit(): void {
    this.dataservice.getData().subscribe((response)=>{
      console.log('response ',response);
      this.empData = response;
    })    
  }
}
