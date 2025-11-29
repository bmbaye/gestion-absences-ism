import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResponse{
  data: UserData | null;
  message: string;
  status: string;
}

export interface UserData{
  nom: string;  
  prenom: string;
  token: string;
  imageUrl: string;
  roles: Role[];
  niveaux: string[];
  ecole: {
    idEcole: string;
    nomEcole: string;
  }
}

export interface Role{
  id: string;
  roleName: string;  
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/security';
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'AUTH_TOKEN';
  private readonly USER_KEY = 'USER_DATA';

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userJson = localStorage.getItem(this.USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (userJson && token) {
      try {
        const user = JSON.parse(userJson) as UserData;
        this.currentUserSubject.next({ ...user, token });
      } catch {
        this.logout();
      }
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.status === 'OK' && res.data) {
          const user = res.data;

          localStorage.setItem(this.TOKEN_KEY, user.token);

          const userWithoutToken = { ...user };
          delete (userWithoutToken as any).token;

          localStorage.setItem(this.USER_KEY, JSON.stringify(userWithoutToken));

          this.currentUserSubject.next(user);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    return user ? user.roles.map(r => r.roleName) : [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/security']);
  }
}
