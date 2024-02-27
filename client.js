const render = (prova) => {
    var provaDiv = document.getElementById("provaDiv");
    provaDiv.innerHTML = "";
    
    var title = document.createElement("h1");
    title.className = "title";
    title.textContent = prova.name;

    provaDiv.appendChild(title);

    var questIndex = 1;
    prova.questions.forEach((question) => {
        var questDiv = document.createElement("div");
        questDiv.className = "questDiv";

        var optsDiv = document.createElement("div");
        optsDiv.className = "optsDiv";

        var questNum = document.createElement("h3");
        questNum.className = "questNum";
        questNum.textContent = "Questão " + questIndex;

        var questID = document.createElement("p");
        questID.className = "questID";
        questID.textContent = "#" + question.id;

        var questTitle = document.createElement("span");
        questTitle.className = "questTitle";
        questTitle.innerHTML = question.body;

        provaDiv.appendChild(questDiv);
        questDiv.appendChild(questNum);
        questNum.appendChild(questID);
        questDiv.appendChild(questTitle);
        questDiv.appendChild(optsDiv);

        questIndex++;

        question.options.forEach((option) => {
            var optDiv = document.createElement("div");
            optDiv.className = "optDiv";

            var optLbl = document.createElement("label");
            optLbl.className = "optLbl";
            optLbl.htmlFor = question.id + "_radiogroup_" + option.id;

            var lblDiv = document.createElement("div");
            lblDiv.className = "lblDiv";

            var optInput = document.createElement("input");
            optInput.className = "optInput";
            optInput.type = "radio";
            optInput.name = question.id;
            optInput.id = question.id + "_radiogroup_" + option.id;

            var optText = document.createElement("p");
            optText.className = "optText";
            optText.innerHTML = option.content;

            optsDiv.appendChild(optDiv);
            optDiv.appendChild(optLbl);
            optLbl.appendChild(lblDiv);
            lblDiv.appendChild(optInput);
            lblDiv.appendChild(optText);
        });
    });
}
