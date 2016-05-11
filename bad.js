$(document).ready(function ()
{
    //Canvas
    var score = 0;
    var currentCell;
    var yellowHex = "#FFFF00";
    var yellowRGB = "rgb(255, 255, 0)";
    var endgameColor = "#218C8D"; 
    var decreaseTime;
    var winningStreak = 0;

    beginGame();
    decreaseTime();

    function beginGame()
    {
        var Box = (1 + Math.floor(Math.random() * 9));
        $("#" + Box).css("background-color", yellowHex);
        

    }
    ;

    function selectNewBox(block)
    {
        block.css("background-color", yellowHex);
        currentCell = block;
    }

    function increaseScore()
    {
        winningStreak++;
        score += 1 + Math.round((winningStreak * 1.1) * Math.pow(1.2, winningStreak));
        $("#score").text("Your score: " + score);
        
    }
    function decreaseScore()
    {
        if (score > 0)
        {
            if (winningStreak > 0)
            {
                score = Math.round(score / 2);
            } else
            {
                score -= 5;
            }
            $("#score").text("Your score: " + score);
        } 
        
        else //If the score falls below -2.
        { 
            $("#score").text("You Lose!");
            if (!$("#replay").is(":visible"))
            {
                gameOver();
            }
        }
        if (winningStreak > 10)
        {
            winningStreak -= 6;
        } else
        {
            winningStreak = 0;
        }

    }

    function Clear()
    {
        $(".block").each(function ()
        {
            $(this).css("background-color", "#000080");
        });
    }

    function resetCell(block)
    {
        block.css("background-color", "#000080");
    }

    function selectRandomBox()
    {
        return $("#" + (1 + Math.floor(Math.random() * 9)));
    }

    function gameOver()
    {
        playing = false;
        for (var i = 1; i < 10; i++)
        {
            $("#" + i).css("background-color", endgameColor);
        }
        $("#replay").toggle();
    }
    //if time runs out
    function gameEnd()
    {
        playing = false;
        for (var i = 1; i < 10; i++)
        {
            $("#" + i).css("background-color", "#3498db");
        }
        $("#replay").toggle();
        $("#replay h3").text("You Scored: " + score);
        $("#replay h3").toggle();
    }


    $(".block").on("click", function ()
    {
        if ($(this).css("background-color") === yellowRGB)
        {
            increaseScore();
            $(this).css("background-color", "#000080");
            

            
        } else
        {
            decreaseScore();
            currentCell.css("background-color", "#000080");

        }
        selectNewBox(selectRandomBox());
    });

    $("#rematch").on("click", function ()
    {
        location.reload();
    });

    //Clock
    var count = 600;
    var playing = true;

    function decreaseTime()
    {
        displayTime();
        if (count == 0)
        {
            playing = false;
        } else if (playing)
        {
            setTimeout(decreaseTime, 100);
            count--;
        } else
        {
            setTimeout(decreaseTime, 100);
        }
    }

    function displayTime()
    {
        var tenths = count;
        var sec = Math.floor(tenths / 10);
        document.getElementById('time_left').innerHTML = "Time left: " + LeadingZero(sec);
        if (sec < 1 && playing)
        {
            gameEnd();
        }
    }

    function LeadingZero(Time)
    {
        if(Time < 10)
        {
            return "0"+Time;
        }
        
        else
        {
            return +Time;
        }
        
    }

});
