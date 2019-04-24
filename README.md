# Angular-Module-AdAuthmin

This module lets you handle the authentication of user. Any request that received 401 status code will cause to force user login. 

**Required Packages**
*--no required packages--*

**Required Modules**
1. fmblog-frontend-navigation
2. fmblog-frontend-shared
3. Angular-Module-Core

**Functionalities**
1. Login
2. Logout
3. Register

**Installation**
1. Add the module to Angular Project as a submodule. 
`git submodule add https://github.com/bwqr/Angular-Module-Auth src/app/auth`
2. Import `AuthModule` from inside `AppModule`.
3. Add following routes to `src/app/routes.ts`  
`   
auth: {
      url: 'auth/',
      register: { url: 'register/' },
      'reset-password': { url: 'reset-password/'},
      'is-authenticated': { url: 'is-authenticated/' },
      login: { url: 'login/' },
      logout: { url: 'logout/' }
    }
`