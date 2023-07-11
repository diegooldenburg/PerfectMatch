import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogueComponent } from '../modals/confirm-dialogue/confirm-dialogue.component';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModalRef?: BsModalRef<ConfirmDialogueComponent>;

  constructor(private modalService: BsModalService) {}

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to leave this page? Unsaved changes will be lost.',
    btnOkText = 'Yes',
    btnCancelText = 'No'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
      },
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogueComponent, config);
    return this.bsModalRef.onHide!.pipe(
      map(() => {
        return this.bsModalRef!.content!.result;
      })
    );
  }
}
