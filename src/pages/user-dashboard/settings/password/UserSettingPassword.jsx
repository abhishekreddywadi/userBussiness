import React from 'react'
import './userSettingPasswors.scss'

function userSettingPassword() {
  return (
    <div className='setting-tab change-pass mt-5 mt-md-0'>
      <h2 className='mb-4'>Change Password</h2>
      <form action="">
        <input type="password" placeholder='Current Password' />
        <input type="password" placeholder='New Password' />
        <input type="password" placeholder='Confirm New Password' />
      </form>
      <h5>Password Requirements</h5>
      <p className='mb-2'>Please follow this guide for a strong password</p>
      <ul>
        <li>One special characters</li>
        <li>Min 6 characters</li>
        <li>One number (2 are recommended)</li>
        <li>Change it often</li>
      </ul>

      <button type="button">Update Password</button>
    </div>
  )
}

export default userSettingPassword
