import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.css'
})
export class RoleSelectionComponent {
  @Input() isVisible: boolean = false;
  @Output() emitRole = new EventEmitter<string>();

  setRole(role: string) {
    this.emitRole.emit(role)
    this.closeOverlay();
  }

  closeOverlay() {
    this.isVisible = false;
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  closeOverlayOnOutsideClick(event: MouseEvent) {
    this.closeOverlay();
  }
}
