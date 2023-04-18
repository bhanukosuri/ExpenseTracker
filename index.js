const submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener("click", saveToLocalStorage)

function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseAmount = document.getElementById("expenseAmount").value;
    const chooseDescription = document.getElementById("chooseDescription").value;
    const chooseACategory = document.getElementById("chooseACategory").value;

    if (expenseAmount === "" && chooseDescription === "" && chooseACategory === "") {
        alert("Enter valid details.")
    } else {
        const expense = {
            expenseAmount,
            chooseDescription,
            chooseACategory
        }
    
        localStorage.setItem(chooseDescription, JSON.stringify(expense));
        showExpenseOnScreen(expense)
    }

    document.getElementById("expenseAmount").value = ""
    document.getElementById("chooseDescription").value = ""
    document.getElementById("chooseACategory").value = ""
}

function showExpenseOnScreen(expense) {
    const parentElement = document.getElementById("listOfExpenses");
    const childElement = document.createElement("li");
    childElement.textContent = expense.expenseAmount + " - " + expense.chooseDescription + " - " + expense.chooseACategory;

    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    
    deleteButton.onclick = () => {
        localStorage.removeItem(expense.chooseDescription);
        parentElement.removeChild(childElement)
    };
    childElement.appendChild(deleteButton);
    parentElement.appendChild(childElement)

    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "Edit";

    editButton.onclick = () => {
        document.getElementById("expenseAmount").value = expense.expenseAmount;
        document.getElementById("chooseDescription").value = expense.chooseDescription;
        document.getElementById("chooseACategory").value = expense.chooseACategory;
        localStorage.removeItem(expense.chooseDescription);
        parentElement.removeChild(childElement)
    }
    childElement.appendChild(editButton)
    parentElement.appendChild(childElement)
}