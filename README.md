# Angular MSAL

This is a little project implementing the MSAL (Microsoft Authentication Library) with Angular 19 and Standalone components.

## Preparation
Execute the next command to install all:
```bash
npm i
#If you have problem with this, use the flag --force (npm i --force)
```
After this you must complete the configuration in ```auth-config.ts``` replacing the next parameters:
```text
<CLIENT ID>
<TENANT ID>
```
This IDs is provided by Microsoft in ```Entra ID```, for this, you can follow the next steps:
- Go to [portal.azure.com](https://portal.azure.com)
- Go to the **Microsoft Entra ID** option in the sidenav
- Create a new app in **Manage > App Registration**
- Go to **Manage > Authentication** into your registered app
- Add the new platform and set the type as: **Single Page Aplication (SPA)**
- Add redirect URI as: http://localhost:4200 (for local environment)
- Into the API Permissions' option add: **Microsoft > Delegated > user.read** (if it hasn't been added automatically)
- The ```client ID``` and the ```Tenant ID``` is in the **Overview**

Now you can run the program with the next command:
```bash
ng serve -o
```

**Note:** Use environment variables to set the ```Client ID``` and ```Tenant ID```, don't commit this variables to your repo.

```bash
ng g environments
```
