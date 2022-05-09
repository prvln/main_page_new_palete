window.onload = function(){
    let result = {};
    let step = 0;


    document.getElementById('test').innerHTML = `<div class="btn btn-outline-secondary my-2">Поехали</div>`
    document.getElementById('test').onclick = function() {
        document.querySelector(".startTest").remove();
        showQuestion(step);
        } 

    function showQuestion(questionNumber){
        document.querySelector(".page").innerHTML = (step + 1) + " / " + quiz.length;
        document.querySelector(".question").innerHTML = quiz[step]['q'];
        let answer = '';
        for(let key in quiz[step]['a']){
            answer += `<div data-v="${key}" class="answer-variant btn btn-outline-secondary mb-2 px-0 py-3">${quiz[step]['a'][key]}</div>`
        }
        document.querySelector(".answer").innerHTML = answer; 
        
    }

    document.onclick = function(event){
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length){
            //event.target.data
            if (result[event.target.dataset.v] != undefined){
                result[event.target.dataset.v]++;
                
            }
            else {
                result[event.target.dataset.v] = 0;
            }
            step++;
            if (step == quiz.length){
                document.querySelector(".question").remove();
                document.querySelector(".answer").remove();
                document.querySelector(".page").remove();
                showResult();
            }
            else {
                showQuestion(step);
            }
        }
        //console.log(result);
        //showQuestion(step);
    }
    function showResult(){
        let key = Object.keys(result).reduce(function(a, b){
            return result[a] > result[b] ? a : b;
        });
        console.log(key);

        let div = document.createElement('p');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        document.getElementById("again").className = "btn btn-outline-secondary my-2";
        document.getElementById("again").innerHTML = 'Еще раз?';
        document.getElementById('again').onclick = function() {
            location.reload(); 
          }
    }

    //showQuestion(step);
}