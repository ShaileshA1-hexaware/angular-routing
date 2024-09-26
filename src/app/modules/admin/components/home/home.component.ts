import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor,RouterOutlet,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public empData:any=[];
  public empForm!:FormGroup;
  public empList:any=[];
  public isEdit:boolean=false;

  constructor(private dataservice:DataService){
    this.createForm();
    const oldData = localStorage.getItem('emplData');
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.empList = parseData;
    }
  }
  ngOnInit(): void {
    this.dataservice.getData().subscribe((response)=>{
      console.log('response ',response);
      this.empData = response;
    })    
  }
  createForm(){
    this.empForm = new FormGroup({
      empId:new FormControl(0),
      empName : new FormControl(),
      empLocation:new FormControl(),
      empContact:new FormControl()
    })
  }
  saveData(){
    console.log('Form Value ',this.empForm.value);
    /*
    if(this.empForm.valid) {
      this.dataservice.addData(this.empForm.value).subscribe((response)=>{
        console.log('reas ',response );
      },(error:Error)=>{
        alert('ERROR '+error.message);
      })
    }*/
    const oldData = localStorage.getItem('emplData');
    if(oldData!=null) {
      const parseData = JSON.parse(oldData);
      console.log('parseData.length ',parseData.length);
      this.empForm.controls['empId'].setValue(parseData.length +1);
      this.empList.unshift(this.empForm.value);
    } else {
      this.empList.unshift(this.empForm.value);
    }
    localStorage.setItem('emplData',JSON.stringify(this.empList));
    this.empForm.reset();
  }
  onEdit(_formData:any){
    this.createForm();
    this.empForm.patchValue(_formData);
    this.isEdit = true;
  }
  onUpdate(){
    const record = this.empList.find((m:any)=>m.empId==this.empForm.controls['empId'].value);
    console.log('record ',record);
    if(record!=undefined) {
      record.empName = this.empForm.controls['empName'];
      record.empLocation = this.empForm.controls['empLocation'];
      record.empContact = this.empForm.controls['empContact'];
      this.isEdit = false;
    }
    localStorage.setItem('emplData',JSON.stringify(this.empList));
    this.empForm.reset();
  }
  onDelete(formData:any){

  }
}
