import React from 'react';
import {auth} from '../../firebase';

const SignOutButton = () =>
  <div>
    <button type="button"
      onClick={auth.doSignOut}> SignOut </button>
  </div>

export default SignOutButton;
