import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import quizQuestions from "../../../assets/data/quizz_questions.json"

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

    title: string = "";
    questions: any;
    selectedQuestion: any;
    answers: string[] = [];
    selectedAnswer: string = "";
    questionIndex: number = 0;
    questionMaxIndex: number = 0;
    finished: boolean = false;

    constructor() { }

    ngOnInit(): void {
        if (quizQuestions) {
            this.title = quizQuestions.title;
            this.questions = quizQuestions.questions;
            this.selectedQuestion = this.questions[this.questionIndex];
            this.questionMaxIndex = this.questions.length;
        }
    }

    playerChoice(value: string): void {
        this.answers.push(value);
        this.nextStep();
    }

    async nextStep() {
        this.questionIndex += 1;
        if (this.questionMaxIndex > this.questionIndex) {
            this.selectedQuestion = this.questions[this.questionIndex];
        } else {
            const finalAnswer: string = await this.checkResult(this.answers);
            this.finished = true;
            this.selectedAnswer = quizQuestions.results[finalAnswer as keyof typeof quizQuestions.results];
        }
    }

    async checkResult(answers: string[]) {
        const result = answers.reduce((previous, current, i, arr) => {
            if (
                arr.filter(item => item === previous).length >
                arr.filter(item => item === current).length
            ) {
                return previous;
            } else {
                return current;
            }
        })
        return result;
    }



}
