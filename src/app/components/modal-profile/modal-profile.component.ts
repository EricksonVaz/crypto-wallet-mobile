import { Component, OnInit } from '@angular/core';
import Profile from 'src/app/models/profile';
import User from 'src/app/models/user';
import { SideMenuComponent } from 'src/app/side-menu/side-menu.component';
import { addFormFeedback, closeLoader, openLoader } from 'src/app/utils/functions';
import IProfile from 'src/app/utils/interfaces/iProfile';
import swal from 'src/app/utils/sweetalert';

@Component({
  selector: 'modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {
  currentModal:HTMLIonModalElement;
  emailUser?:string;

  constructor() {
  }

  ngOnInit() {
    this.emailUser = User.userLogged()?.email!;
  }

  dismissModal(){
    SideMenuComponent.component.dismissModalProfile();
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IProfile;

    let profile = new Profile(formData);

    if(profile.formError.length){
      addFormFeedback(formElement,profile.formError);
    }else{
      swal({
        title: "estas preste a atualizar seu password",
        text: "",
        icon: "warning",
        buttons: ["cancelar","continuar"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          openLoader();
          profile.update()
          .then((resp)=>{
            if(Array.isArray(resp)){
              addFormFeedback(formElement,resp);
            }else{
              formElement.reset();
              swal({
                title: "Pronto",
                text: "Password atualizado",
                icon: "success"
              });
            }
          }).finally(closeLoader);
        }
      });
    }
  }

}
