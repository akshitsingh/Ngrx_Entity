import { getUserDetail, getAllUsers } from './state/reactive-form.selecter';
import { UserAddAction, UserUpdateAction } from './state/reactive-form.action';
import { UserReducerState } from './state/reactive-form.reducer';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom.validator';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
 
/** Reactive form with all validation */
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;
  update : boolean = false;
  totalUsers : number;

  GradeArray: any = [
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
  ];

  constructor(
    public fb: FormBuilder,
    private api:ApiService,
    private router: Router,
    private store : Store<UserReducerState>
    ) {}
   
  ngOnInit(): void {
    this.reactiveForm();
    this.addRoleControl();
    this.getAllUsers();   //get all users 
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      id : [''],
      gender: ['Male'],
      address : ['',[Validators.required]],
      dob: ['', [Validators.required]],
      grade: [''],
      roles : this.fb.array([]),
      profile : ['']
    },
  )}



  /**Get roles fields as form array */
  get rolesFieldAsFormArray(): FormArray {
    return this.myForm.get('roles') as FormArray;
  }

  /**Make a form group of roles input field */
  role(): any {
    return this.fb.group({
      role: [''],
    });
  }


  //getAllUsers
  getAllUsers(){
    this.store.select(getAllUsers).subscribe(res=>{
      this.totalUsers = res.length
    })
  }

  /**Add role new control in our roles formcontrol */
  addRoleControl():void{
     this.rolesFieldAsFormArray.push(this.role())
  }

  
  /**
   * Dynamically removing controls from a FormArray
   * @param i Index of the roles form control array in the form
   */
   removeRoleControl(i:number):void{
    this.rolesFieldAsFormArray.removeAt(i);
   }

   /* Date */
   /**
    * 
    * @param e date picker event
    */
   date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true,
    });
  }

  // submit the reactive form 
  submitForm(){
    if(!this.update){
      let data = {...this.myForm.value,id : this.totalUsers + 1}
      this.store.dispatch(UserAddAction({user : data}))  //call useraddaction 
      this.myForm.reset();
    }
    else{
      this.updateUser();
    }
   
  }

  //Update user detail 
  updateUser(){
    this.store.dispatch(UserUpdateAction({update : this.myForm.value}))
  }

  /**
   * patch value into form
   * @param user get selected user value from event from child on edit event
   */
  setUserValueForm(user){
    this.update = true
    this.myForm.patchValue({
       id : user.id,
       profile : {
        name : user.profile.name,
        email : user.profile.email,
       password : user.profile.password,
       confirmPassword : 'Akshit@12',
       } ,
       dob : new Date(user.dob).toISOString().substring(0, 10),
       gender : user.gender,
       address : user.address,
       grade : user.grade
    })
  }

   
  

  /**Validation message */
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      {type : 'minlength',message : 'Password must be atleast 8 character'},
       { type: 'passwordStrength', message: 'Password must contain at least two of the following: numbers, lowercase letters, uppercase letters, or special characters.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'mustMatch', message: 'Password mismatch' }
    ],
    'address': [
      { type: 'required', message: 'Address is required' }
    ],

    
    }
}
