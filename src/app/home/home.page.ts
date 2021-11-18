/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  studentDetails = { StudentName: null, StudentRegNo: null, English: null, Tamil: null, Maths: null, Science: null, Social: null};
  baseURL = 'http://localhost/testDB/formdemo.php';
  AllData: any = null;
  choice: any = null;
  showform = 0;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.ToGetAllData();
  }

  close(){
    this.showform=0;
  }

  ToGetAllData(){
    var message: any;
    this.http.post(this.baseURL,{mode:'All'})
    .subscribe(data1 => {
     console.log(data1);
     message = data1;
     this.AllData = message.Data;}
    );
  }

  SubmitStudentDetails(submitform,choice){
    var message: any;
    console.log(this.studentDetails);
    var sum = (this.studentDetails.English*1)+(this.studentDetails.Tamil*1)+(this.studentDetails.Maths*1)+(this.studentDetails.Science*1)+(this.studentDetails.Social*1);
    var avg = sum/5;
    var mode = (choice==='Update')?'Update':'Add';
    const file =JSON.stringify({
      mode: mode,
      StudentName: this.studentDetails.StudentName,
      StudentRegNo: this.studentDetails.StudentRegNo,
      English: this.studentDetails.English,
      Tamil: this.studentDetails.Tamil,
      Maths: this.studentDetails.Maths,
      Science: this.studentDetails.Science,
      Social: this.studentDetails.Social,
	    Total: sum,
	    Average: avg
    });
    console.log(file);
    this.http.post(this.baseURL,file)
    .subscribe(data1 => {
     console.log(data1);
     message = data1;
     this.AllData = message.Data;
     submitform.reset();
     this.showform=0;
    },
    err => {
    console.log('ERROR!: ', err);
  });
  }

  addStudent(){
    this.showform=1;
  }

  changeOnData(student,choice){
    var message: any;
    if(choice==='Update'){
      this.http.post(this.baseURL,{id:student.StudentRegNo, mode:'SingleData'})
      .subscribe(data1 => {
        console.log(data1);
        message = data1;
        this.studentDetails = message.Data[0];
        this.choice = choice;
        this.showform=1;
      });
    }
    else{
      this.http.post(this.baseURL,{id:student.StudentRegNo, mode:'Delete'})
      .subscribe(data1 => {
        console.log(data1);
        message = data1;
        this.AllData = message.Data;
      });
    }

  }



}
