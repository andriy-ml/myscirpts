/**
 * Created by andrew.m on 24.09.2014.
 */
if (Array.indexOf === undefined) {
    // doens't exist in oldIE
    /* Finds the index of the first occurence of item in the array, or -1 if not found */
    Array.prototype.indexOf = function(v) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i] === v) {
                return i;
            }
        }
        return - 1;
    };
}
var heart_path = "M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z";
var diamond_path = "m13,12c-2.559999,0 -5.12,0 -7.679999,0c0.8747,0.039 1.619,0.605 2.322,1.0728c1.579,1.1912 3.058,2.557201 4.226,4.155201c0.545,0.803999 1.1176,1.708 1.132,2.712m-7.679999,-7.940001c1.109999,-0.035 2.058,-0.741301 2.903999,-1.393001c1.495,-1.254999 2.789001,-2.747999 3.881001,-4.363998c0.400999,-0.669001 0.872999,-1.378001 0.895,-2.183001c0,2.646999 0,5.293001 0,7.94m0,-7.94c0.038,1.182 0.757999,2.206 1.438,3.12c1.212001,1.51 2.648001,2.846 4.228001,3.962999c0.614,0.382999 1.266001,0.838501 2.014,0.857c-2.559999,0 -5.120001,0 -7.68,0m7.68,0c-1.110001,0.035 -2.058001,0.741 -2.904001,1.392c-1.494999,1.256001 -2.789,2.748999 -3.881,4.365c-0.401,0.669001 -0.872499,1.378 -0.895,2.183001c0,-2.646999 0,-5.292999 0,-7.940001";
var club_path = "m12.570649,24.286484c0.897714,-1.800413 1.552287,-3.647274 1.667617,-5.622543c0.10597,-0.726593 -0.336628,-0.739054 -0.402111,-0.226921c-1.271746,4.860107 -8.0295,3.54409 -7.798841,-1.0277c0.190136,-3.707735 3.871359,-4.505386 5.794596,-3.292857c0.757423,0.446365 0.713818,0.178921 0.299225,-0.284271c-2.852113,-3.183138 -1.125253,-7.282064 2.733664,-7.357184c4.170622,0.247496 5.252232,4.635059 2.69314,7.215667c-0.317945,0.309841 -1.022404,1.306361 0.037403,0.609694c2.584051,-1.835322 6.168665,0.138093 6.096941,2.967756c-0.137133,5.217634 -6.495934,5.606647 -7.858084,1.248688c-0.130892,-0.483454 -0.508081,-0.725956 -0.402113,0.094763c0.187054,1.485586 0.576685,3.725817 1.692577,5.67491l-4.554013,0z";


(function(){
    function Player(){
        this.cards = [];
        this.takeCards = function(a){

        };
        this.giveCard = function(a){

        };
        this.passCard = function(a){

        };
        this.turn = false;
    };

    var first_player = new Player();
    var second_player = new Player();

    var card_pack = {

    };
    var cards = [];

    var first_player_cards = first_player.cards;
    var second_player_cards = second_player.cards;

    var defaults = {
        "ranks": {
            "6": "Six",
            "7": "Seven",
            "8": "Eight",
            "9": "Nine",
            "10": "Ten",
            "J": "Jack",
            "Q": "Queen",
            "K": "King",
            "A": "Ace"
        },
        "suits": {
            "S": "Spades" /* пика */,
            "D": "Diamonds" /* бубны */,
            "C": "Clubs" /* трефа */,
            "H": "Hearts" /* чирва */
        }
    };
    function shuffle(o){ //v1.0
        for(var m = 0; m < 5; m++ ){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        }
        return o;
    };
    for(suit in defaults.suits){
        for(rank in defaults.ranks){
            var color = "red";
            if(suit == 'S' || suit == 'C') color = "black";
            cards.push({"suit":suit,"rank":rank, "color":color});
        }
    }

    var cd = shuffle(cards);
    var trump = setTrump();

    function setTrump(){
        return cd[cd.length-1].suit;
    };

    var getCardsFromPack = function(pack, cards_quantity){
        if(pack.length < cards_quantity) cards_quantity = pack.length;
        var cards  = [];
        for(var i = 0; i < cards_quantity; i++){
            if(pack.length > 0){
                var card = pack.shift();
                cards.push(card);
            }else{
                //console.log("Have no cards in a pack");
            };
        }
        console.log(cards);
        return cards;
    }

    var paper = Raphael("canvas", 900, 700);
    paper.rect(0, 0, 900, 500, 10).attr({fill: "#ccc", stroke: "none"});


    var step = 20;
    var card_width = 50;
    var distance_beetween_cards = 5;
    var card_height = 80;



    var play_btn = paper.rect(0, 510, 50, 30, 0).attr({fill: "#587594", stroke: "none"});
    var play_btn_text = paper.text(25, 526  , "Play").attr({
        "font-family": "Helvetica",
        "font-size": 18,
        "font-weight": "500",
        fill: "white"
    });
    var play = paper.set();
    play.push(play_btn);
    play.push(play_btn_text);
    play.click(function(){
        var cardsForFirstPlayer = getCardsFromPack(cd,6);
        var cardsForSecondPlayer = getCardsFromPack(cd,6);
        card_place(cardsForFirstPlayer, 0);
        card_place(cardsForSecondPlayer, 1);
        first_player_cards = cardsForFirstPlayer.concat(first_player_cards);
        second_player_cards = cardsForFirstPlayer.concat(second_player_cards);
    });
    function getPath(suit){
        switch (suit){
            case 'S':
                path = heart_path;
                break;
            case 'D':
                path = diamond_path;
                break;
            case 'C':
                path = club_path;
                break;
            case 'H':
                path = heart_path;
                break;
        }
        return path;
    }
    function card_place(cards, player){
        var card_number = cards.length;
        var from_top = player * 400;
        function from_left(i,player,card_begining){
            if(player == 0)
            {
                return 10+i*(card_width+distance_beetween_cards)+card_begining;
            }else{
                return 20+i*(card_width+distance_beetween_cards)+card_begining;
            }
        }
        if(player = 0){
            var card_begining = first_player_cards.length*(card_width+distance_beetween_cards);
        }else{
            var card_begining = second_player_cards.length*(card_width+distance_beetween_cards);
        }
        for(i=0; i < card_number; i++){
            var card_set = paper.set();
            //card_set.push()
            var f = from_left(i,player,card_begining);
            var cdd = paper.rect(f, 10 + from_top, card_width, card_height, 5)
                .attr({fill: "#fff", stroke: "none"});
            var ic = paper.path(getPath(cards[i].suit))
                .attr({fill: cards[i].color, stroke: "none"}).translate(f+20,60 + from_top);
            var txt = paper.text(from_left(i,player,card_begining)+10, 20 + from_top, ' ' + cards[i].rank)
                .attr({"font-size":14});
            var card = paper.set();
            card.push(cdd);
            card.push(ic);
            card.push(txt);
            card.click(function(){
                //alert(this.getBBox().x + " " + this.getBBox().y);
                bank.addCardToBank(cards[i]);
                this.animate({x: bank.setCardPlace(0).x, y:bank.setCardPlace(0).y}, 500); //

            });
        }
    }

    function getValue(a){
        var value;
        if(a.rank === "J" ){
            value = 11;
        }
        else if(a.rank === "Q" ){
            value = 12;
        }
        else if(a.rank === "K"){
            value = 14;
        }
        else if(a.rank === "A"){
            value = 15;
        }else{
            value = a.rank;
        }
        return value;
    }
    function compareCards(a, b) {
        if(a.trump === true || b.trump === true){
            if(a.trump === true && b.trump === true){
                if(getValue(a) > getValue(b)){
                    return true;
                }else{
                    return false;
                }
            }else if(a.trump === true && b.trump !== true){
                return true;
            }else{
                return false;
            }
        }else if(a.suit === b.suit){
            if(getValue(a) > getValue(b)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
        /* return true if a > b */
    }
    var bank = {
        cardsInBank:[],
        coordinate_x : 10,
        coordinate_y : 250,
        setCardPlace: function(player){
            x=this.coordinate_x + (this.cardsInBank.length)*(card_width + distance_beetween_cards);
            if(player === 0){
               y=this.coordinate_y;
            }else{
               y=this.coordinate_y+30;
            }
            var obj = {x:x,y:y};
            return obj;
        },
        addCardToBank: function(card){
            this.cardsInBank.push(card);
        },
        clearBank:function(){
            this.cardsInBank = [];
        }
    }
    function queue(){

    }
})();