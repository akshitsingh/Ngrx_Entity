 /**Validation message */
 export const validation_messages = {
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
      ]
}