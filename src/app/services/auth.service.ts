import { Injectable, NgZone } from '@angular/core';
import { User } from './../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthErrorsComponent } from 'src/app/dialog-auth-errors/dialog-auth-errors.component';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  authErrorIcon: string = 'info';
  authErrorHeadline: string = '';
  authErrorUserMessage: string = '';
  authErrorMessage: string = '';
  authErrorCode: any = '';

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {

    // Saving user data in localStorage when logged in and setting up null when logged out
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.firestoreService.getAllUsers();
  }

  /**
   * Sign in with email/password
   * @param email 
   * @param password 
   * @returns 
   */
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {

          // If user has verified his email, but the page is not reloaded, the login does not work
          if (user && user.emailVerified && this.router.url == '/login') {
            this.router.navigate(['main']).then(() => {
              window.location.reload();
            });
          }

          if (user && user.emailVerified) {
            this.router.navigate(['main']);
          } else {
            this.displayAuthErrorDialog('warning', 'Attention', 'Please verify your email!', 'null', 'null');
          }

        });
      })
      .catch((error) => {
        this.displayAuthErrorDialog('warning', 'Attention', 'An error has occurred.', error.message, error.code);
      });
  }

  /**
   * Sign up with email/password
   * @param email 
   * @param password 
   * @returns 
   */
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail(); // Call the SendVerificationMail() function when new user sign up and returns promise
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.displayAuthErrorDialog('warning', 'Attention', 'An error has occurred.', error.message, error.code);
      });
  }

  /**
   * Send email verification when new user sign up
   * @returns 
   */
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  /**
   * Reset forgot password
   * @param passwordResetEmail 
   * @returns 
   */
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.displayAuthErrorDialog('info', 'Info', 'Password reset email sent, check your inbox.', 'null', 'null');
      })
      .catch((error) => {
        this.displayAuthErrorDialog('warning', 'Attention', 'An error has occurred.', error.message, error.code);
      });
  }

  /**
   * Returns true when user is logged in and email is verified
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /**
   * Sign in with Google
   * @returns 
   */
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {

      // Cannot be forwarded immediately after authentication
      setTimeout(() => {
        this.router.navigate(['main']);
      }, 1000);
    });
  }

  /**
   * Auth logic to run auth providers
   * @param provider 
   * @returns 
   */
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['main']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.displayAuthErrorDialog('warning', 'Attention', 'An error has occurred.', error.message, error.code);
      });
  }

  /**
   * Setting up user data when sign in with username/password
   * sign up with username/password and sign in with social auth
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   * @param user 
   * @returns 
   */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  /**
   * Log out
   * @returns
   */
  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  /**
   * Opens the authentication error dialog and shows the user the corresponding errors
   */
  openAuthErrorDialog() {
    this.dialog.open(DialogAuthErrorsComponent);
  }

  /**
   * Opens the error dialog with passed icon and messages
   * @param errorIcon info || warning
   * @param authErrorHeadline Info || Attention
   * @param errorUserMessage A message readable by the user
   * @param errorMessage The message from the error
   * @param errorCode The error code
   */
  displayAuthErrorDialog(errorIcon: string, authErrorHeadline: string, errorUserMessage: string, errorMessage: string, errorCode: string) {
    this.authErrorIcon = errorIcon;
    this.authErrorHeadline = authErrorHeadline;
    this.authErrorUserMessage = errorUserMessage;
    this.authErrorMessage = errorMessage;
    this.authErrorCode = errorCode;

    this.openAuthErrorDialog();
  }
}