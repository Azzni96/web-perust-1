async function fetchdata(url, Options) {
  const response = await fetch(url, (options = {}));
  if (!response.ok) {
    throw new Error('HTTP error! Status:' + response.status);
  }
  const json = await response.json();
  return json;
  /* sama pystyy kirjoittaa (return await response.json();)*/
}
