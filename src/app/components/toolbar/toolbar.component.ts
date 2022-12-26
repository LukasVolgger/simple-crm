import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUserDetailsComponent } from '../dialog-user-details/dialog-user-details.component';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.applyResponsiveNav();
  };

  mobileNav: boolean = false;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.applyResponsiveNav();
  }

  ngOnInit(): void {
  }

  /**
   * Toggle the MatDrawer in Mobile View
   */
  toggleNav() {
    if (this.mobileNav) {
      this.drawer.toggle();
      this.drawer.mode = 'over';
    }
  }

  /**
   * Checks the window.innerheight and enables/disables the responsive view accordingly 
   */
  applyResponsiveNav() {
    if (window.innerWidth < 768) {
      this.drawer.close();
      this.mobileNav = true;
      this.drawer.mode = 'over';
    } else {
      this.drawer.open();
      this.mobileNav = false;
      this.drawer.mode = 'side';
    }
  }

  /**
   * Opens the user details dialog
   */
  openUserDetailsDialog() {
    this.dialog.open(DialogUserDetailsComponent);
  }

  /**
   * Opens a dialog to edit the user
   */
  openEditUserDialog() {
    this.dialog.open(DialogEditUserComponent);
  }

}
