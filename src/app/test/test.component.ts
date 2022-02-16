import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Recruitments} from "../recruitments";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  indexPagination: number = 1;
  totalPagination?: number;
  recruitments: Recruitments[] = [];
  listRecruitmentsNotPagination: Recruitments[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllRecruitment(0).subscribe(data => {
      // @ts-ignore
      this.recruitments = data.content;
    });
    this.userService.getAll().subscribe(data => {
      this.listRecruitmentsNotPagination = data;

      // @ts-ignore
      if ((this.listRecruitmentsNotPagination.length % 5) != 0) {
        // @ts-ignore
        this.totalPagination = (Math.round(this.listRecruitmentsNotPagination.length / 5)) + 1;
      }
    })
  }

  indexPaginationChage(value: any) {
    this.indexPagination = value;
  }

  firstPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  nextPage() {
    let totalPage = this.indexPagination;
    totalPage += 1;
    let b = this.listRecruitmentsNotPagination.length
    let max = 0
    for (let i = 0; i < b; i++) {
      if (i % 5 == 0) {
        if (i > max) {
          max = i;
        }
      }
    }
    if (totalPage > max / 5) {
      totalPage = this.indexPagination - 1;
    } else {
      this.userService.getAllRecruitment(this.indexPagination++).subscribe(data => {
        // @ts-ignore
        this.recruitments = data.content;
      })
    }
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
    } else {
      this.userService.getAllRecruitment(this.indexPagination - 1).subscribe((data: Recruitments[]) => {
        // @ts-ignore
        this.recruitments = data.content;
      })
    }
  }
  lastPage() {
    let b = this.listRecruitmentsNotPagination.length
    let max = 0
    for (let i = 0; i < b; i++) {
      if (i % 5 == 0) {
        if (i > max) {
          max = i;
        }
      }
    }
    this.userService.getAllRecruitment(max/5-1).subscribe(data => {
      // @ts-ignore
      this.recruitments = data.content;
      // @ts-ignore
      console.log( data.content)
    })
  }
}
