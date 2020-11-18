import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    bot: boolean = true;
	score: number = 0;

	updateScore(total: number) {
		this.score += total;
		return this.score;
	}
  constructor() { }

  ngOnInit() {
  }

}
