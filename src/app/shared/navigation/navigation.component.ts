import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [IonicModule],
})
export class NavigationComponent  implements OnInit {
  isDrawerOpen = false;
  isUserMenuOpen = false;
  date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  liens = [
    {
      "url" : "",
      "lien" : "ABSENCES"
    },
    {
      "url" : "",
      "lien" : "COURS"
    },
    {
      "url" : "",
      "lien" : "CLASSES"
    },
    {
      "url" : "",
      "lien" : "ETUDIANTS"
    }
  ];

   user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12'
  };
  constructor( private router : Router) { }

  ngOnInit() {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.classList.add(saved);
    } else {
      // autodetection
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    }
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }


  logout() {
    this.closeUserMenu();
    console.log('Déconnexion...');
  }

  toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem("theme", 
    document.documentElement.classList.contains('dark') ? "dark" : "light"
  );
}

}
