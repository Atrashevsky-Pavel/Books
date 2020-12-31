import { Component} from '@angular/core';
import {Book, GetServiceService} from '../../services/get-service.service';
import {UserServiceService} from '../../services/user-service.service';
import {LikesServiceService} from '../../services/likes-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  books: Book[] = [];
  booksSearch: Book[] = [];
  searchValue = '';
  accessAdmin = false;
  accessUsual = false;
  showForm = false;
  bookIndexEdit: any;
  email = '';
  constructor(private getServiceService: GetServiceService,
              private userService: UserServiceService,
              private likesService: LikesServiceService
              ) {
    this.mainCallBooks();
  }
  mainCallBooks(): void {
      this.getServiceService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.booksSearch = data;
      this.accessAdmin = this.userService.userAdmin;
      this.accessUsual = this.userService.userUsual;
      if (this.userService.user) {
        this.email = this.userService.user.email;
        this.likesService.getLikes(this.userService.user.id).subscribe((likes: any) => {
          this.books.forEach((valueBook: any, idx: number, arr: any) => {
            likes.forEach((valueLike: any) => {
              if (valueLike.book_id === valueBook.id) {
                arr[idx].like = true;
                arr[idx].likeId = valueLike.id;
              }
            });
          });
          this.booksSearch = this.books;
        }, () => {
          alert('error');
        });
      }
    });
  }
  edit(index: number): void {
    this.bookIndexEdit = +index;
    this.showForm = true;
  }
  closeForm(value: boolean): void {
    if (value) {
      this.mainCallBooks();
    } else {
      this.showForm = value;
    }
  }
  search(): void {
    if (this.searchValue) {
      this.booksSearch = [];
      this.books.forEach((value: any) => {
        if (value.name === this.searchValue) {
          this.booksSearch.push(value);
        } else if (value.genre === this.searchValue) {
          this.booksSearch.push(value);
        }
      });
    } else {
      this.booksSearch = this.books;
    }
  }
  addBook(): void {
    this.showForm = true;
  }
}
