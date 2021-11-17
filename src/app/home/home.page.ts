/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studentDetails = { StudentName: null, StudentRegNo: null, English: null, Tamil: null, Maths: null, Science: null, Social: null};
  baseURL = 'http://localhost/testDB/formdemo.php';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController) {}

  SubmitStudentDetails(submitform){
    var message: any;
    console.log(this.studentDetails);
    var sum = (this.studentDetails.English*1)+(this.studentDetails.Tamil*1)+(this.studentDetails.Maths*1)+(this.studentDetails.Science*1)+(this.studentDetails.Social*1);
    var avg = sum/5;
    const file =JSON.stringify({
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
     this.successalert(message, submitform);
    },
    err => {
    console.log('ERROR!: ', err);
  });
  }

  successalert(message, form){
    this.alertCtrl.create({
      header: 'Your Results',
      message: 'Total : '+message.Total+' & Average : '+message.Average,
      buttons: [
        {
        text: 'Okay',
        handler: () => {
          form.resetForm();
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }


}
