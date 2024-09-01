async function postData() {
  const user = {
    name: 'Nihad',
    job: 'Web Developer',
  };

  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log(data);
}

postData();
