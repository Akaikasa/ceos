var provaDiv = document.createElement("div");
provaDiv.id = "provaDiv";
provaDiv.className = "provaDiv";
document.body.appendChild(provaDiv);

var editorDiv = document.createElement("div");
editorDiv.id = "editorDiv";
editorDiv.className = "editorDiv";
document.body.appendChild(editorDiv);

md = new showdown.Converter({
    noHeaderId: true,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    strikethrough: true,
    tables: true,
    smoothLivePreview: true,
    simpleLineBreak: true,
});

fetch("json.json")
    .then((result) => result.json())
    .then((result) => result.content)
    .then(setup_editor);

function setup_editor(prova) {
    var provaTitulo = document.createElement("input");
    provaTitulo.value = prova.name;
    provaTitulo.className = "editor_provaTitle";
    provaTitulo.oninput = (e) => {
        prova.name = provaTitulo.value;
        render(prova);
    };
    editorDiv.appendChild(provaTitulo);

    var questIndex = 1;
    prova.questions.forEach((question) => {
        var questDiv = document.createElement("div");
        questDiv.className = "editor_questDiv";
        var optsDiv = document.createElement("div");
        optsDiv.className = "editor_optsDiv";

        var questNum = document.createElement("h2");
        questNum.className = "editor_questNum";
        questNum.textContent = "Questão " + questIndex;

        var questID = document.createElement("p");
        questID.className = "editor_questID";
        questID.textContent = "#" + question.id;

        var questTitle = document.createElement("p");
        questTitle.contentEditable = true;
        questTitle.className = "editor_questTitle";
        questTitle.textContent = md.makeMarkdown(question.body);
        questTitle.oninput = (e) => {
            question.body = md.makeHtml(questTitle.innerHTML);
            render(prova);
        };

        editorDiv.appendChild(questDiv);
        questDiv.appendChild(questNum);
        questNum.appendChild(questID);
        questDiv.appendChild(questTitle);
        questDiv.appendChild(optsDiv);

        questIndex++;

        question.options.forEach((option) => {
            var optDiv = document.createElement("div");
            optDiv.className = "editor_optDiv";

            var optValue = document.createElement("input");
            optValue.type = "number";
            optValue.className = "editor_optValue";
            optValue.value = option.value;

            var optText = document.createElement("p");
            optText.className = "editor_optText";
            optText.textContent = md.makeMarkdown(option.content);
            optText.contentEditable = true;
            optText.oninput = e => {
                option.content = md.makeHtml(optText.innerHTML);
                render(prova);
            }

            var optRemoveBtn = document.createElement("button");
            optRemoveBtn.className = "editor_optRemoveBtn";
            optRemoveBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
            optRemoveBtn.onclick = (e) => {
                optDiv.remove();
                var lowerHalf = question.options.slice(0, option.id);
                var upperHalf = question.options.slice(option.id+1);
                question.options = lowerHalf.concat(upperHalf);
                
                var newIndex = 0;
                question.options.forEach(opt => {
                    opt.id = newIndex;
                    newIndex++;
                });

                console.log(question.options);
                render(prova);
            };

            optsDiv.appendChild(optDiv);
            optDiv.appendChild(optValue);
            optDiv.appendChild(optText);
            optDiv.appendChild(optRemoveBtn);
        });
    });

    render(prova);
}
