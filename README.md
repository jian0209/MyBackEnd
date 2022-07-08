# RPC Backend Connect with My-Project

## Introduction
### Framework - nodejs(express)
### Database - mongodb
### Cache - redis

## Install
``` 
git clone ...
npm install
npm run start
```

## How to use
### First Method
#### Required
#### On Windows - (Android Studio - emulator - android 11)
#### On Mac - (xcode - emulator - iphone13)
#### On both - (nodejs: 16 above, sdk, java11 above, jdk, react-native-cli)
If not sure how to install, can visit: https://reactnative.dev/docs/getting-started

``` 
git clone my-project(my repo)
npm install
npm run start (to start the metro server)
npm run ios (if using mac xcode)
npm run android (if using windows android studio)
// start viewing
``` 

### Second Method
#### Required
#### On both - (Postman - to make http request)
```
/* 
http://127.0.0.1/api/user/info
method: post
request in json format
header: 
{
  token: string
}
body:
{
  userId: string
}
response in json format
{
  success:     bool
  message:     string
  messageJson: object
}
*/
/* 
http://127.0.0.1/api/user/create
method: post
request in json format
body:
{
  username:  string
  password:  string (hash by md5)
  firstName: string
  lastName:  string
  email:     string
}
response in json format
{
  success: bool
  message: string
}
*/
/* 
http://127.0.0.1/api/user/login
method: post
request in json format
body:
{
  username: string
  password: string (hash by md5)
}
response in json format
{
  success: bool
  message: string
}
*/
/* 
http://127.0.0.1/api/user/logout
method: post
request in json format
body:
{
  userId: string
}
response in json format
{
  success: bool
  message: string
}
*/
