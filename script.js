const userInput = document.querySelector("#userinput");
const headingFour = document.querySelector("h4");
let counter = 1;

// add
userInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let userTask = userInput.value;
    // putin local storage

    let keyName = `Task ${counter}`;
    counter++;
    localStorage.setItem(keyName, userTask);
    let taskValue = localStorage.getItem(keyName);

    // append element

    const taskList = document.createElement("div");
    const newInnerHtml = `
    <div class="task">
    <div class="taskname">
    <span>${taskValue}</span>
    </div>
    <div class="check-cross">
    <input type="checkbox" name="" class="check">
    <span class="pencil">✎</span>
    <span class="cross">X</span>
    </div>
    </div>
    <hr>`;
    taskList.innerHTML = newInnerHtml;
    headingFour.append(taskList);
    userInput.value = "";
  }
});

// delete

const cross = document.querySelector("h4");
cross.addEventListener("click", (e) => {
  if (e.target.classList.contains("cross")) {
    const remove = e.target;

    // remove from local storage

    const removedSpan =
      remove.parentNode.parentNode.children[0].children[0].innerHTML;
    for (key in window.localStorage) {
      if (window.localStorage[key] === removedSpan) {
        localStorage.removeItem(key);
      }
    }

    const removeItem = remove.parentNode.parentNode.parentNode;
    removeItem.remove();
  }
  if (e.target.classList.contains("check")) {
    e.target.parentNode.previousElementSibling.style.textDecoration =
      "line-through";
  }

  if (e.target.classList.contains("pencil")) {
    let pencilget = document.querySelector(".container2");
    let updatedHtml = document.createElement("span");
    let updatedText = `
    <input type="text" name="" id="update" placeholder="Update Please... " />
    `;
    updatedHtml.innerHTML = updatedText;
    pencilget.append(updatedHtml);

    let updatedTask = document.querySelector("#update");
    updatedTask.addEventListener("keypress", function (f) {
      if (f.key == "Enter") {
        let updatedValue = updatedTask.value;
        let deletee = updatedTask.parentNode;
        deletee.remove();

        let getInnerTag = e.target;
        let getInnerHtml =
          getInnerTag.parentNode.parentNode.children[0].children[0].innerHTML;
        console.log(getInnerHtml);
        for (key in window.localStorage) {
          if (window.localStorage[key] === getInnerHtml) {
            localStorage.setItem(key, updatedValue);
            let changeElement =
              getInnerTag.parentNode.parentNode.children[0].children[0];
            changeElement.innerHTML = updatedValue;
          }
        }
      }
    });
  }
});
