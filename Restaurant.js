async function saveData(event) {
  event.preventDefault();

  const dishes = event.target.dishes.value;
  const price = event.target.price.value;
  const table = event.target.table.value;

  const BillObj = {
      dishes,
      price,
      table
  }
  if (dishes === '' || price === '' || table === '') {
      alert('empty field are not allowed');
  }
  try {
      let res = await axios.post('https://crudcrud.com/api/6705aeb093524a8e8790c7442517686d/REST', BillObj);
      display(res.data);
  } catch (err) {
      console.log(err);
  }
  event.target.dishes.value = '';
  event.target.price.value = '';
  event.target.table.value = '';

}
async function display(BillObj) {
  const { dishes, price, table } = BillObj;

  //  getting parent element 
  const parent = document.querySelector('#parent');

  //  creatinh child element
  const h2 = document.createElement('h2');
  const li = document.createElement('li');
  const hr = document.createElement('hr');
  li.className = 'style-li';

  li.textContent = 'Table' + table + " : " + price + " : " + dishes;
  h2.textContent = `Table ${table}`;


  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.className = 'btn btn-danger float-end';

  let id = BillObj.id;
  deleteButton.onclick = async () => {
      try {
          let res = await axios.delete('https://crudcrud.com/api/6705aeb093524a8e8790c7442517686d/REST', { id });
          console.log(res);
      }
      catch (err) {
          console.log(err);
      }
      parent.removeChild(h2);
      parent.removeChild(li);
  };

  //  parent element to append child
  li.appendChild(deleteButton);
  parent.appendChild(h2);
  parent.appendChild(li);
  parent.appendChild(hr);
}
window.addEventListener('DOMContentLoaded', async () => {
  try {
      let res = await axios.get('https://crudcrud.com/api/6705aeb093524a8e8790c7442517686d/REST')
      for (var i = 0; i < res.data.length; i++) {
          display(res.data[i]);
      }
  } catch (err) {
      console.log(err);
  }
});