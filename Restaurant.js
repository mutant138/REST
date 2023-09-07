function saveToNetwork(event) {
  event.preventDefault(); // Prevent the form from submitting normally.

  // Get user inputs
  const dish = document.getElementById("inputDish").value;
  const price = document.getElementById("inputPrice").value;
  const table = document.getElementById("table").value;

  // Append the order to the respective table
  const ul = document.getElementById(`List${table.slice(-1)}`); //It will extract number from table
  const li = document.createElement("li");
  li.textContent = `${dish} - ₹${price}`;

  const obj={
    dish,
    price,
    table
  }
  axios.post("https://crudcrud.com/api/9bde217bc3fc46ea8fd2e4c470a35a61/restaurant",obj)
  .then((response)=>{
    console.log(response)
  })
  .catch((err)=>{
    console.log(err)
  })

  window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/9bde217bc3fc46ea8fd2e4c470a35a61/restaurant")
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";

    // Add event listeners for delete and edit buttons
    deleteButton.addEventListener("click", () => {
        // Handle the delete action here
        ul.removeChild(li); // Remove the list item when the delete button is clicked
    });

    editButton.addEventListener("click", () => {
        // Handle the edit action here
        const listItemText = li.textContent;
    const [editedDish, editedPrice] = listItemText.split("- ₹");


    // Populate the input fields with the extracted values
    document.getElementById("inputDish").value = editedDish;
    document.getElementById("inputPrice").value = editedPrice;

    // Remove the edited order from the list
    ul.removeChild(li);
    });

    // Append the buttons to the list item
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    ul.appendChild(li);
    document.getElementById("inputDish").value=''
    document.getElementById("inputPrice").value=''

  // Send the data to your backend (Postman)
  const data = {
      dish,
      price,
      table
  }
}