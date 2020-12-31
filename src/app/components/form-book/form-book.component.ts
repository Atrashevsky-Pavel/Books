import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetServiceService} from '../../services/get-service.service';

export interface StateBook {
  name: any;
  author: any;
  genre: any;
  year: any;
  img: any;
  buy_link: any;
  download_link: any;
  text: any;
  nameTouched: boolean;
  authorTouched: boolean;
  genreTouched: boolean;
  yearTouched: boolean;
  imgTouched: boolean;
  buy_linkTouched: boolean;
  download_linkTouched: boolean;
  textTouched: boolean;
}

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss']
})
export class FormBookComponent implements OnInit{
  form: FormGroup;
  stateForm: StateBook = {
    name: false,
    author: false,
    genre: false,
    year: false,
    img: false,
    buy_link: false,
    download_link: false,
    text: false,
    nameTouched: false,
    authorTouched: false,
    genreTouched: false,
    yearTouched: false,
    imgTouched: false,
    buy_linkTouched: false,
    download_linkTouched: false,
    textTouched: false
  };
  @Input() bookEdit: any;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private getService: GetServiceService) {
    this.form = new FormGroup({});
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      buy_link: new FormControl('', [Validators.required]),
      download_link: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    if (this.bookEdit) {
      this.form.setValue({
        name: this.bookEdit.name,
        author: this.bookEdit.author,
        genre: this.bookEdit.genre,
        year: this.bookEdit.year,
        img: this.bookEdit.img,
        buy_link: this.bookEdit.buy_link,
        download_link: this.bookEdit.download_link,
        text: this.bookEdit.text
      });
    }
  }
  focus(): void {
    const controls = this.form.controls;
    this.stateForm.name = {...controls.name.errors};
    this.stateForm.author = {...controls.author.errors};
    this.stateForm.genre = {...controls.genre.errors};
    this.stateForm.year = {...controls.year.errors};
    this.stateForm.img = {...controls.img.errors};
    this.stateForm.buy_link = {...controls.buy_link.errors};
    this.stateForm.download_link = {...controls.download_link.errors};
    this.stateForm.text = {...controls.text.errors};
    this.stateForm.nameTouched = controls.name.touched;
    this.stateForm.authorTouched = controls.author.touched;
    this.stateForm.genreTouched = controls.genre.touched;
    this.stateForm.yearTouched = controls.year.touched;
    this.stateForm.imgTouched = controls.img.touched;
    this.stateForm.buy_linkTouched = controls.buy_link.touched;
    this.stateForm.download_linkTouched = controls.download_link.touched;
    this.stateForm.text = controls.text.touched;
  }
  close(): void {
    this.onClose.emit(false);
  }
  submit(): void {
    if (this.form.valid) {
      if (this.bookEdit) {
        this.getService.putBook({id: this.bookEdit.id, ...this.form.value})
          .subscribe((data: any) => {
            this.onClose.emit(true);
            this.onClose.emit(false);
          }, () => {
            alert('error');
          });
      } else {
        this.getService.createBook({...this.form.value})
          .subscribe((data: any) => {
            this.onClose.emit(true);
            this.onClose.emit(false);
          }, () => {
            alert('error');
          });
      }
    } else {
      alert ('The form is not valid');
    }
  }
}
