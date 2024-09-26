import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { Employee } from '../../../../models/Employee'

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

  public empObject:Employee = new Employee();

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
      empId:new FormControl(this.empObject.empId),
      empName : new FormControl(this.empObject.empName),
      empLocation:new FormControl(this.empObject.empLocation),
      empContact:new FormControl(this.empObject.empContact)
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
     
      let id = parseData.length+1;
      console.log("parseData.length ",parseData.length , ' id ',id);
      this.empForm.controls['empId'].setValue(id);
      this.empList.unshift(this.empForm.value);
    } else {
      this.empList.unshift(this.empForm.value);
    }
    localStorage.setItem('emplData',JSON.stringify(this.empList));
    this.empForm.reset();
  }
  onEdit(item:Employee){
    
    //this.empForm.patchValue(_formData);
    this.empObject = item;
    this.isEdit = true;
    this.createForm();
  }
  onUpdate(){
    //const record = this.empList.find((m:any)=>m.empId==this.empForm.controls['empId'].value);
    const record = this.empList.find((m:Employee)=>m.empId == this.empForm.controls['empId'].value);
    console.log('record ',record);
    if(record!=undefined) {
      record.empName = this.empForm.controls['empName'].value;
      record.empLocation = this.empForm.controls['empLocation'].value;
      record.empContact = this.empForm.controls['empContact'].value;
      this.isEdit = false;
    }
    console.log('this.empList ',this.empList);
    localStorage.setItem('emplData',JSON.stringify(this.empList));
    this.empObject = new Employee();
    this.empForm.reset();
  }
  onDelete(id:number){
    const isdelete = confirm('are you sure delete ?');
    if(isdelete){
      const index = this.empList.findIndex((m:any)=>m.empId ==id);
      this.empList.splice(index,1);
      localStorage.setItem('emplData',JSON.stringify(this.empList));
    }
  }
}
