import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  downloadURL: string = '';

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService) { }

  /**
   * Loads the new profile picture into the storage
   * Updates the profile picture in auth service
   * @param event The img file
   */
  uploadImage(event: any) {
    const file = event.target.files[0];
    const filePath = this.authService.userData.uid + '_' + 'profile-picture'; // = uid_profile-picture
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.then(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.downloadURL = url;
        this.authService.changeProfilePicture(this.downloadURL); // Update photoURL
      })
    })

  }

  /**
   * Deletes an image from the fire storage when the user changes it or deletes the profile
   * @param downloadURL The URL of the img
   */
  deleteImage(downloadURL: string) {
    this.storage.refFromURL(downloadURL).delete();
  }
}
