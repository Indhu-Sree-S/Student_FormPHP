/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';


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
  hint = null;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.ToGetAllData();
  }

  close(){
    this.showform=0;
    this.studentDetails.StudentName= null; this.studentDetails.StudentRegNo= null;this.studentDetails.English= null; this.studentDetails.Tamil= null; this.studentDetails.Maths= null; this.studentDetails.Science= null; this.studentDetails.Social= null;
  }

  ToGetAllData(){
    var message: any;
    //this.http.post(this.baseURL,{mode:'All'})
    ajax({url:this.baseURL,method:'POST',body:JSON.stringify({mode: 'All'})})
    .subscribe(data1 => {
      console.log(data1.response);
      message = data1;
      this.AllData = message.response.Data;}
    );
  }

  SubmitStudentDetails(submitform,choice){
    var message: any;
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
    //this.http.post(this.baseURL,file)
    ajax({url:this.baseURL,method:'POST',body:file})
    .subscribe(data1 => {
     message = data1;
     console.log(data1.response);
     if(message.response.status){
      this.AllData = message.response.Data;
      submitform.reset();
      this.showform=0;
     }
    },
    err => {
    console.log('ERROR!: ', err);
  });
  }

  /*showHint($event) {
    console.log($event);
    if ($event.length === 0) {
        this.hint = '';
        return;
    } else {
      var x: any;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              x = this.responseText;
            }
        };
        x = this.hint;
        xmlhttp.open('GET', 'http://localhost/get_data.php?q=' + $event, true);
        xmlhttp.send();
    }
  }*/

  addStudent(){
    this.showform=1;
  }

  changeOnData(student,choice){
    var message: any;
    if(choice==='Update'){
      //this.http.post(this.baseURL,{id:student.StudentRegNo, mode:'SingleData'})
      ajax({url:this.baseURL,method:'POST',body:JSON.stringify({id:student.StudentRegNo, mode:'SingleData'})})
      .subscribe(data1 => {
        message = data1;
        console.log(data1.response);
        if(message.response.status){
          this.studentDetails = message.response.Data[0];
          this.choice = choice;
          this.showform=1;
        }
      },
      err => {
      console.log('ERROR!: ', err);
      });
    }
    else{
      //this.http.post(this.baseURL,{id:student.StudentRegNo, mode:'Delete'})
      ajax({url:this.baseURL,method:'POST',body:JSON.stringify({id:student.StudentRegNo, mode:'Delete'})})
      .subscribe(data1 => {
        message = data1;
        console.log(data1.response);
        if(message.response.status){
          this.AllData = message.response.Data;
        }
      },
      err => {
      console.log('ERROR!: ', err);
      });
    }

  }



}

