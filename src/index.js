document.addEventListener("DOMContentLoaded", () => {
  const ulBreeds = document.getElementById("dog-breeds");

  function fetchData() {
    return fetch("https://dog.ceo/api/breeds/image/random/4")
      .then((res) => res.json())
      .then((data) => {
        data.message.forEach((image) => {
          const imagesContainer = document.getElementById(
            "dog-image-container"
          );
          const ul = document.createElement("ul");
          const card = document.createElement("li");
          const img = document.createElement("img");
          img.src = image;
          card.appendChild(img);
          ul.appendChild(card);
          imagesContainer.appendChild(ul);
        });
      });
  }
  fetchData();

  function fetchBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        for (const breed in data.message) {
          //forin because data.message is an object
          const li = document.createElement("li", (id = "li"));
          li.innerText = breed;
          ulBreeds.appendChild(li);
        }
      });
  }
  fetchBreeds();

  ulBreeds.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
      const liElements = ulBreeds.querySelectorAll("li");
      for (const li of liElements) {
        li.classList.remove("highlight");
      }
      e.target.classList.add("highlight");
    }
  });

  //filter breeds
  function filterBreeds() {
    //fetches all the dog breeds
    const selectedLetter = document.getElementById("breed-dropdown").value;
    console.log(`you selected ${selectedLetter}`);

    return fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        //we need data.message which is an object
        const filteredData = Object.keys(data.message).filter((breed) =>
          breed.startsWith(selectedLetter)
        );

        console.log(filteredData);
        //update the ulBreeds
        const li = document.getElementById("li");

        ulBreeds.innerHTML = "";
        for (const breed of filteredData) {
          const li = document.createElement("li");
          li.innerText = breed;
          ulBreeds.appendChild(li);
        }
      });
  }
  //using the drop down to filter;

  const dropDown = document.getElementById("breed-dropdown");
  dropDown.addEventListener("change", filterBreeds);
});
