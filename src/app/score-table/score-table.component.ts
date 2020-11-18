import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { PlayerComponent } from '../player/player.component';
import { MatrixComponent } from '../matrix/matrix.component';
import { BlockComponent } from '../block/block.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-score-table',
    templateUrl: './score-table.component.html',
    styleUrls: ['./score-table.component.scss']
  })
@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      BlockComponent,
      MatrixComponent,
      PlayerComponent,
      ScoreTableComponent
    ],
    imports: [
      BrowserModule,
      FormsModule
    ],
    providers: [],
    exports: [ScoreTableComponent],    
    bootstrap: [AppComponent]
  })

  export class ScoreTableComponent implements OnInit {
    lock=false;
    playerScore :number=0;
    botScore :number=0;
    draw :number=0;
    constructor(public gs: MatrixComponent) {
        
     }
  
    ngOnInit() {
    }
    newGame()
    {
        this.gs.freeBlocksRemaining = 9;
		this.gs.initBlocks();
		this.lock = false;
		this.gs.turn = 0;
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
  




