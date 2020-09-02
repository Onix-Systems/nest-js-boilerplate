#Nest.js-jwt-starter

####Register
``` 
    curl --location --request POST '127.0.0.1:3000/auth/register' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'password=1234' \
    --data-urlencode 'email=yoy@gmail.com'
``` 

####Login
``` 
    curl --location --request POST '127.0.0.1:3000/auth/login' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'password=1234' \
    --data-urlencode 'email=yoy@gmail.com'
```

#### Get profile
``` 
    curl --location --request GET '127.0.0.1:3000/profile' \
    --header 'Authorization: Bearer <your_access_token>'
```

#### RefreshToken
``` 
    curl --location --request POST '127.0.0.1:3000/auth/refreshToken' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'refreshToken=<your_refresh_token>'
```
#### Logout User
``` 
    curl --location --request DELETE '127.0.0.1:3000/auth/logout/<your_refresh_token>'
```

#### Logout all users 
``` 
    curl --location --request DELETE '127.0.0.1:3000/auth/logoutAll'
```