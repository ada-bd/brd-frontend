# Architechture

## Routes
- Login
- Homepage (Form)
- Dashboard for BA to see daily status

## Screens

#### Login Screen
- Login by username & password
- Successfull login will redirect user to Homepage

#### Form Screen - Multi step form

- Step 1:
  - Input phone number
  - Send OTP Button(Disable after first click)
  - Resend OTP Button(Visible after first click to send otp)
  - Input OTP(4 digit number input system to check otp)
  - 30 seconds timer to validate otp. It will start as long as OTP is sent or resend
  - Verify button to check OTP varified
  - Below two buttons logout and next
- Step 2:
  - Name
  - Age selection
    - 18-25
    - 26-30
    - 31-35
    - 36-40
    - 41-45
    - 46-50
    - 50+
  - Occupation(drop down)
  - Disclaimer(check to proceed)
- Step 3:
  - Outlet code [number: length (10,11) ]
  - Outlet name
  - Current brand
- Step 4:
  - Existing adult smoker watched?
  - Contact method
  - Review[It will take to a new activity where all the forms will show]
  - Submit