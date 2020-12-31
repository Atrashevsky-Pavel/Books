import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserServiceService} from '../../services/user-service.service';
import {LikesServiceService} from '../../services/likes-service.service';
import {Book, GetServiceService} from '../../services/get-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book: any;
  @Input() idx: any;
  @Input() admin: any;
  @Input() usual: any;
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() onBooksUpdate: EventEmitter<any> = new EventEmitter<any>();
  description = false;
  constructor(
    private userService: UserServiceService,
    private likesService: LikesServiceService,
    private getService: GetServiceService
    ) { }
  descriptionShow(): void {
    this.description = !this.description;
  }
  edit(): void {
   this.onEdit.emit(+this.idx);
  }
  delete(): void {
    this.getService.deleteBook(this.book.id).subscribe(() => {
      this.onBooksUpdate.emit();
    });
  }
  like(): void {
    if (this.userService.user) {
           if (!this.book.like) {
            this.likesService.createLike({
              user_id: this.userService.user.id,
              book_id: this.book.id
            }).subscribe(() => {
              this.onBooksUpdate.emit();
            }, () => {
              alert('error');
            });
          } else {
            this.likesService.deleteLike(this.book.likeId)
              .subscribe(() => {
                this.onBooksUpdate.emit();
              }, () => {
                alert('error');
              });
          }
    } else {
      alert('sign in or register');
    }
  }
}
