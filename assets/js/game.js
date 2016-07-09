var myStory, $playArea, $choices;

$(function() {
    $playArea = $('#play-area');
    $choices = $('#choices');

    fetch('the-intercept.json') // replace with path to your game's .json
        .then(response => {
            return response.text();
        })
        .then(data => {
            startStory(data)
        });
});

function startStory(inkFile){
    $playArea.find('p').remove();
    myStory = new inkjs.Story(inkFile);
    continueToNextChoice();
}

    function continueToNextChoice(){
        while (myStory.canContinue){
            var grafs = myStory.Continue().split("\n");

            grafs.forEach(text => {
                if (text.length) {
                    $.scrollTo($('<p>').text(text).hide().fadeIn(1250).appendTo('#story-area'), 600, {offset:'192px'});
                    // $('<p>').text(text).hide().fadeIn(600).appendTo('#story-area');
                }
            });
        }
        if (myStory.currentChoices.length > 0){
            for (var i = 0; i < myStory.currentChoices.length; ++i) {
                var choice = myStory.currentChoices[i];
                var $li = $('<li class="choice">').text(choice.text).hide().fadeIn(2000).appendTo($choices);
                $li.on('click', onChoiceSelect);
            }
        }
    }

    function onChoiceSelect(){
        myStory.ChooseChoiceIndex($(this).index());
        $choices.empty();
        // $('p').detach();
        continueToNextChoice();
    }