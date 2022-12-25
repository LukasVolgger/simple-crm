import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {
  buttonVisible: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.buttonVisible = window.pageYOffset >= 100;
    });
  }

  /**
   * Scroll to the top
   */
  scrollToTop() {
    this.router.navigateByUrl('legal-notice');

    // The timeout is needed to prevent scrolling from stopping immediately after a few pixels
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
      });
    }, 250);
  }

}
