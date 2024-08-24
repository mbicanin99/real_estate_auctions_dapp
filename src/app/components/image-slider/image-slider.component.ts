import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent {
  @Input() images: any;
  activeIndex = 0;

  prevSlide(event: Event) {
    event.stopPropagation();
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.images.length - 1;
  }

  nextSlide(event: Event) {
    event.stopPropagation();
    this.activeIndex = (this.activeIndex < this.images.length - 1) ? this.activeIndex + 1 : 0;
  }
}
