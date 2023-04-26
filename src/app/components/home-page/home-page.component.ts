import { Component, OnInit } from '@angular/core';
import { QuestionService } from '@services/question.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.get().subscribe();
  }

}
