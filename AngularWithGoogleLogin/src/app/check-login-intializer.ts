import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from './account.service';


export function checkIfUserIsAuthenticated(accountService: AccountService) {
    return () => {
        return accountService.updateUserAuthenticationStatus().pipe(catchError(_ => {
            console.error('Error trying to validate if the user is authenticated. The most probable cause is that the ASP.NET Core project isn\'t running');
            return of(null);
        })).toPromise();                    
    };
}