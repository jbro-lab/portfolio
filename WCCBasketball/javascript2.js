class Team {
    sTeamName;
    iWins = 0;
    iLosses = 0;
    dWinLossPct = 0;
    aoGames = [];

    getTeam(){//will be used to get team name when putting to ptag
        return this.sTeamName;
    }
    setTeam(teamName){//sets team name
        this.sTeamName = teamName;
    }
    setWinsLosses(wins, losses){//sets wins and losses, basically just increments
        this.iLosses += losses;
        this.iWins += wins;
    }
    getWins(){//returns wins
        return this.iWins;
    }
    getLosses(){//returns losses
        return this.iLosses;
    }
    calcWinLossPct(){//calculates win pct
        this.dWinLossPct = (this.iWins / (this.iWins + this.iLosses)).toFixed(2);
    }

}
class BasketballTeam extends Team {
    //this class inherits all attributes and methods of Team class
    iTotalPointsFor = 0;
    iTotalPointsAgainst = 0;
    addPointsFor(myScore){//adds points for to total points for; will be used for tiebreakers if wins are =
        this.iTotalPointsFor += myScore;
    }
    addPointsAgainst(TheirScore){//adds points against to total points against; may be used to break ties if wins and TPF are =
        this.iTotalPointsAgainst += TheirScore;
    }
    getAllPoints(){//will be used for putting it out to the ptag
        return ("Points for " + this.iTotalPointsFor + " and Points Against " + this.iTotalPointsAgainst)
    }
}

class Game {//lots of games will be put into an array in Team class
    iMyScore;
    iTheirScore;
    sWinOrLoss;
    sOpponent;
    constructor (myScore, TheirScore, WinOrLoss, Opponent){
        this.iMyScore = myScore;
        this.iTheirScore = TheirScore;
        this.sWinOrLoss = WinOrLoss;
        this.sOpponent = Opponent;
    }
}

function playGame(){//function that actually runs the season
    let aoTeams = [];// array of Basketball team objects
    let output = [];//will be used at bottom of the function
    document.getElementById("hideGames").hidden = true;
     
    for(let i = 0; i < 10; i++){// puts Basketball team objects into an array and sets team name
        aoTeams[i] = new BasketballTeam();
        aoTeams[i].setTeam(document.getElementById("t" + (i+1)).innerHTML);
    }

    for (let iCount = 0; iCount < 2; iCount++){//everyone plays everyone twice
        for(let i = 0; i < aoTeams.length; i++){// first team then second team plays everyone
            for(let j = i + 1; j < aoTeams.length; j++){
                let W = "W";// w and l will be used in the Game constructor
                let L = "L";
                let iScore1 = Math.floor(Math.random() * 101);//generates random scores
                let iScore2 = Math.floor(Math.random() * 101);
                if (iCount == 0){//determines home and away teams 
                    iScore1 += 5;//adds 5 points to home team
                }
                else {
                    iScore2+=5;
                }

                if (iScore1 > iScore2){//builds new Game objects
                    aoTeams[i].aoGames.push(new Game(iScore1, iScore2, W, aoTeams[j]));
                    aoTeams[j].aoGames.push(new Game(iScore2, iScore1, L, aoTeams[i]));

                    aoTeams[i].addPointsFor(iScore1);
                    aoTeams[i].addPointsAgainst(iScore2);

                    aoTeams[j].addPointsFor(iScore2);
                    aoTeams[j].addPointsAgainst(iScore1);

                    aoTeams[i].setWinsLosses(1, 0);
                    aoTeams[j].setWinsLosses(0, 1);

                    aoTeams[i].calcWinLossPct();
                    aoTeams[j].calcWinLossPct();
                }
                else if (iScore2 > iScore1) {
                    aoTeams[i].aoGames.push(new Game(iScore1, iScore2, L, aoTeams[j]));
                    aoTeams[j].aoGames.push(new Game(iScore2, iScore1, W, aoTeams[i]));

                    aoTeams[i].addPointsFor(iScore1);
                    aoTeams[i].addPointsAgainst(iScore2);

                    aoTeams[j].addPointsFor(iScore2);
                    aoTeams[j].addPointsAgainst(iScore1);

                    aoTeams[j].setWinsLosses(1, 0);
                    aoTeams[i].setWinsLosses(0, 1);

                    aoTeams[i].calcWinLossPct();
                    aoTeams[j].calcWinLossPct();
                }
                else {
                    while (iScore1 == iScore2){//overtime scenario
                    iScore1 += Math.floor(Math.random() * 16);
                    iScore2 += Math.floor(Math.random() * 16);
                    }
                    if (iScore1 > iScore2){
                        aoTeams[i].aoGames.push(new Game(iScore1, iScore2, W + " OT", aoTeams[j]));
                        aoTeams[j].aoGames.push(new Game(iScore2, iScore1, L + " OT", aoTeams[i]));

                        aoTeams[i].addPointsFor(iScore1);
                        aoTeams[i].addPointsAgainst(iScore2);

                        aoTeams[j].addPointsFor(iScore2);
                        aoTeams[j].addPointsAgainst(iScore1);

                        aoTeams[i].setWinsLosses(1, 0);
                        aoTeams[j].setWinsLosses(0, 1);

                        aoTeams[i].calcWinLossPct();
                        aoTeams[j].calcWinLossPct();
                    }
                    else {
                        aoTeams[i].aoGames.push(new Game(iScore1, iScore2, L + " OT", aoTeams[j]));
                        aoTeams[j].aoGames.push(new Game(iScore2, iScore1, W + " OT", aoTeams[i]));

                        aoTeams[i].addPointsFor(iScore1);
                        aoTeams[i].addPointsAgainst(iScore2);

                        aoTeams[j].addPointsFor(iScore2);
                        aoTeams[j].addPointsAgainst(iScore1);

                        aoTeams[j].setWinsLosses(1, 0);
                        aoTeams[i].setWinsLosses(0, 1);

                        aoTeams[i].calcWinLossPct();
                        aoTeams[j].calcWinLossPct();
                    }
                }
            }
        }
    } 
    for (let i = 0; i < aoTeams.length - 1; i++){//sorts teams by wins
        for(let j = i + 1; j < aoTeams.length; j++){
            if (aoTeams[i].iWins < aoTeams[j].iWins){
                let temp = aoTeams[j];
                aoTeams[j] = aoTeams[i];
                aoTeams[i] = temp;
            } 
            else if (aoTeams[i].iWins == aoTeams[j].iWins){//if they have the same number of wins the team with more TPF is placed ahead
                if (aoTeams[i].iTotalPointsFor < aoTeams[j].iTotalPointsFor){
                    let temp = aoTeams[j];
                    aoTeams[j] = aoTeams[i];
                    aoTeams[i] = temp;
                }//if they have the same number of wins and TPF then the team with the least TPA is placed ahead
                else if (aoTeams[i].iTotalPointsFor == aoTeams[j].iTotalPointsAgainst){
                    if (aoTeams[i].iTotalPointsAgainst > aoTeams[j].iTotalPointsAgainst){
                        let temp = aoTeams[j];
                        aoTeams[j] = aoTeams[i];
                        aoTeams[i] = temp;
                    }
                }
            }
        }
    }   
    for(let i = 0; i < aoTeams.length; i++){//teams and their records are concatenated
        let teamName = aoTeams[i].getTeam();
        let wins = aoTeams[i].getWins();
        let losses = aoTeams[i].getLosses();
        let winPct = aoTeams[i].dWinLossPct
        let PfPa = aoTeams[i].getAllPoints();
        output[i] = teamName + " " + wins + " - " + losses + "<br>" +
        "WP% = " + winPct + "<br>" +
        PfPa;
        if (i == 0) {
            let champion = teamName + " wins the WCC championship!";
            if (teamName == "BYU" ){
                document.getElementById("champPic").src = "images/BYU.png";
            }
            else if (teamName == "Gonzaga") {
                document.getElementById("champPic").src = 'images/index.png';
            }
            else if (teamName == "Loyola"){
                document.getElementById("champPic").src = "images/Loyola Marymount.png";
            }
            else if (teamName == "Pepperdine") {
                document.getElementById("champPic").src = "images/pepperdine2.png";
            }
            else if ( teamName == "Pacific") {
                document.getElementById("champPic").src ="images/Pacific.png";
            }
            else if ( teamName == "Portland") {
                document.getElementById("champPic").src = "images/Portla d.png";
            }
            else if ( teamName == "San Diego") {
                document.getElementById("champPic").src = "images/San Diego.png";
            }
            else if ( teamName == "San Francisco"){
                document.getElementById("champPic").src =  "images/San Francisco.png";
            }
            else if ( teamName == "Santa Clara") {
                document.getElementById("champPic").src =  "images/Santa Clara.png";
            }
            else {
                document.getElementById("champPic").src =  "images/St. Mary's.png"
            }
            document.getElementById("champion").innerHTML = champion;
        }
    }
    for(let i = 0; i < output.length; i++){//puts all the the teams games and opponents into an array
        let games = [];
        let teamName = aoTeams[i].getTeam();
        for (let j = 0; j < aoTeams[i].aoGames.length; j++){
            games[j] = ("<li>" + teamName + " " + aoTeams[i].aoGames[j].iMyScore +
            " - " + aoTeams[i].aoGames[j].iTheirScore + " " +
            aoTeams[i].aoGames[j].sOpponent.sTeamName + " " + aoTeams[i].aoGames[j].sWinOrLoss + "</li>");
            document.getElementById("games" + (i+1)).innerHTML = "<ol>" + games.join("") + "</ol";
        }
        document.getElementById(i + 1).innerHTML= output[i]; //puts those values from the array into the HTML
        
    }
    for(let i = 0; i < output.length; i++){
        document.getElementById("games" + (i + 1)).hidden = true;
    }


    document.getElementById("playAgain").hidden = false;//shows play again button
    document.getElementById("showGames").hidden = false;//shows show games button
    document.getElementById("playGame").hidden = true;//hides play game button
    document.getElementById("directions").hidden = true;
}
function showGames() {//used to expand results and show indi games
    for(let i = 0; i < 10; i++){
        document.getElementById("games" + (i + 1)).hidden = false;
    }
    document.getElementById("hideGames").hidden = false;//shows hide games button
    document.getElementById("showGames").hidden = true;//hides show games button
}
function hideGames(){//used to hide the individual games
    for(let i = 0; i < 10; i++){
        document.getElementById("games" + (i + 1)).hidden = true;
    }
    document.getElementById("hideGames").hidden = true;//hides hide games button
    document.getElementById("showGames").hidden = false;//reveals show games button
}
