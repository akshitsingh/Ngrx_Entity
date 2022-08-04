import { userListRequestAction } from './../reactive-form/state/reactive-form.action';
 import { getAllUsers, getUserDetail } from './../reactive-form/state/reactive-form.selecter';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserReducerState } from '../reactive-form/state/reactive-form.reducer';
import { User } from 'src/app/models/user.model';
import { UserDeleteAction } from '../reactive-form/state/reactive-form.action';
 
/** for Show the users profile data */
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit,OnDestroy {
  selectedUser : User  ;
  @Output() editEvent = new EventEmitter()
  userSubscription : Subscription;

  displayedColumns: string[] = ['position', 'name', 'email','dob','gender','address','action'];
  dataSource:User[] = [];

  constructor(
    private api : ApiService,
    private store : Store<UserReducerState>
    ) { }

  ngOnInit(): void {
  //  this.api.getAllUsers().subscribe((res)=>{
  //    console.log("Ress",res)
  //   //  this.dataSource = res;
  //  })
   this.store.dispatch(userListRequestAction());
   this.userSubscription = this.store.select(getAllUsers).subscribe(res=>{
      this.dataSource = res;
    })
  }


   //getUserDetail by id
   getUserDetails(id){
    this.store.select(getUserDetail,{id}).subscribe(user=>{
       this.selectedUser = user;
    })
    this.editEvent.emit(this.selectedUser)
  }


  /**
   * User delete by id
   * @param id user id 
   */
  userDelete(id){
    console.log(id)
    this.store.dispatch(UserDeleteAction({id}))
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
