/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project
function loadProjects() {
  fetch("project_data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        // Create the main container div
        const mainContainer = document.createElement("div");
        mainContainer.className =
          "card overflow-hidden shadow rounded-4 border-0 mb-5";

        // Create the card body div
        const cardBody = document.createElement("div");
        cardBody.className = "card-body p-0";

        // Create the d-flex container div
        const flexContainer = document.createElement("div");
        flexContainer.className = "d-flex align-items-center";

        // Create the content div with project details
        const contentDiv = document.createElement("div");
        contentDiv.className = "p-5";
        const link = document.createElement("a");
        link.className = "text-decoration-none";
        const projectName = document.createElement("h2");
        projectName.className = "fw-bolder";
        link.setAttribute("href", element["link"]);
        const target = "_blank";
        const rel = "noopener noreferrer";
        link.setAttribute("target", target);
        link.setAttribute("rel", rel);
        link.appendChild(projectName);
        projectName.textContent = element["heading"];
        const projectDescription = document.createElement("p");
        projectDescription.innerHTML = element["content"];
        contentDiv.appendChild(link);
        contentDiv.appendChild(projectDescription);

        // Create the image element
        // const imgLink = document.createElement("a");
        // imgLink.setAttribute("href", element["link"]);
        // imgLink.setAttribute("target", target);
        // imgLink.setAttribute("rel", rel);
        // const image = document.createElement("img");
        // image.className = "img-fluid";
        // image.src = element["img"];
        // image.alt = "...";
        // imgLink.appendChild(image);

        // Append the elements in the right order to form the desired structure
        flexContainer.appendChild(contentDiv);
        // flexContainer.appendChild(imgLink);
        cardBody.appendChild(flexContainer);
        mainContainer.appendChild(cardBody);

        // Finally, append the main container to the parent element (e.g., body)
        if (element["section"].toLowerCase().includes("current")) {
          const section = document.getElementById("currentWork");
          section.appendChild(mainContainer);
        } else if (element["section"].toLowerCase().includes("analytics")) {
          const section = document.getElementById("analyticsSecurity");
          section.appendChild(mainContainer);
        } else if (element["section"].toLowerCase().includes("development")) {
          const section = document.getElementById("webdev");
          section.appendChild(mainContainer);
        }
      }); // JSON content as a JavaScript object or array
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}
