import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
    free: boolean = true;
	value: string = ""; // cross | tick
    symbol: string = ""; // done | close
    setValue(value) {
		this.value = value

		if( this.value == "tick" ) {
			this.symbol = "X";
		} else {
            setTimeout (() => {
                console.log("Hello from setTimeout ,1 second please ");
             
            this.symbol = "O";
        }, 1000)
		}
	}
  constructor() { }

  ngOnInit() {
  }

}

