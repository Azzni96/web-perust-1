async function fetchData() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchData();
async function postData() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: 'John Doe', job: 'Developer'}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error posting data:', error.message);
  }
}

postData();
async function updateData() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: 'John Doe', job: 'Developer'}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error updating data:', error.message);
  }
}

updateData();
async function deleteData() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error.message);
  }
}

deleteData();
