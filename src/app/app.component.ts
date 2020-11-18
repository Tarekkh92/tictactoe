import { Component } from '@angular/core';
import { MatrixComponent } from './matrix/matrix.component';
import {ScoreTableComponent} from './score-table/score-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MatrixComponent]
})
export class AppComponent {
   
  title = 'app';
  lock=false;
  playerScore :number=0;
  botScore :number=0;
  draw :number=0;

    constructor(public gs: MatrixComponent )
    {

    }
   
    newGame()
    {
        console.log("Wait 3 seconds to view who wins");
        setTimeout (() => {
            
        this.gs.freeBlocksRemaining = 9;
		this.gs.initBlocks();
		this.lock = false;
        this.gs.turn = 0;
    }, 3000)
    }
    resetGame(event) 
    {
		location.reload();
		event.preventDefault();
	}


    playerClick(i) {
		if( this.gs.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
			return;
		}

		this.gs.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

		if( this.gs.freeBlocksRemaining <= 0 ) {

			this.gs.draw += 1;
			this.lock = true;
            this.draw=this.gs.draw;
            
			this.newGame();
			return;
		}


		this.gs.blocks[i].free = false;

		if( this.gs.turn == 0 ) { // Player1 Turn
			this.gs.blocks[i].setValue("tick");
		
		} else { // Bot Turn
			this.gs.blocks[i].setValue("cross");	
		}

		var complete = this.gs.blockSetComplete();

		if( complete == false ) {
			this.changeTurn();	
			return;
			
		} else {
            this.lock = true;
            
			this.gs.players[this.gs.turn].score += 1;
            
         
            
          
            if(this.gs.players[this.gs.turn].bot==false)
            {
                this.playerScore=this.gs.players[this.gs.turn].score;
                this.changeTurn();
                this.botScore==this.gs.players[this.gs.turn].score;
                
                
            }
            else if(this.gs.players[this.gs.turn].bot==true)
            {
                
                this.botScore =this.gs.players[this.gs.turn].score;
                this.changeTurn();
                this.playerScore=this.gs.players[this.gs.turn].score;
                
            }

		    this.newGame();
		    return;
		}
		
	}


botTurn()
    {
        if( this.gs.freeBlocksRemaining <= 0 ) {
			return;
		}

		var bot_selected = this.gs.figureBotMove()-1;
		
		if( this.gs.blocks[bot_selected].free == true ) {
			this.playerClick(bot_selected);	
		} else {
			this.botTurn();
			return;
		}
    }

   
changeTurn()
    {
        this.gs.changeTurn();
        if(this.gs.turn == 1)
        {
            this.botTurn();
        }
    }
}