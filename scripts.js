const footer = document.querySelector('footer');

fetch('./maps.json')
  .then(response => response.json())
  .then(mapsData => {
    generateMapHTML(mapsData);
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

function generateMapHTML(mapsData) {
  const container = document.getElementById("results");

  container.innerHTML = "";

  mapsData.forEach(map => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.setAttribute("data-chapter", map.chapter);
    resultItem.setAttribute("data-path", map.path);
    resultItem.setAttribute("data-map", map.map);
    resultItem.setAttribute("data-weapon", map.rareWeapon);

    resultItem.innerHTML = `
      <div class="thumbnail-container">
        <img src="${map.image}" alt="Mapa ${map.map}" class="map-thumbnail" onclick="openModal('${map.image}', '${map.map}', this.closest('.result-item').querySelector('.hidden-objectives'))">
      </div>
      <h5>Chapter: ${map.chapter}</h5>
      <p>Path: ${map.path}</p>
      <p>Map: ${map.map}</p>
      <div class="recommended-characters">
        <h6>Recommended character:</h6>
        <ul>
          <li>${map.recommendedCharacter}</li>
        </ul>
      </div>
      <p>Rare Weapon: ${map.rareWeapon}</p>
      <ul class="hidden-objectives">
        ${map.objectives.map(obj => `
          <li>
            <span class="number">${obj.number}.</span>
            <span class="name">${obj.name}:</span>
            <span class="description">${obj.description}</span>
          </li>
        `).join('')}
      </ul>
    `;

    container.appendChild(resultItem);
  });
}

function toggleFilters() {
    const filterSection = document.querySelector('.filter-section');
    footer.classList.toggle('hidden');
    filterSection.style.display = filterSection.style.display === 'block' ? 'none' : 'block';
}

function filterResults() {
    const chapterFilter = document.getElementById('chapter-filter').value;
    const pathFilter = document.getElementById('path-filter').value;
    const mapFilter = document.getElementById('map-filter').value;
    const rareWeaponFilter = document.getElementById('rare-weapon-filter').value;

    const results = document.querySelectorAll('.result-item');

    results.forEach(result => {
        const chapter = result.getAttribute('data-chapter');
        const path = result.getAttribute('data-path');
        const map = result.getAttribute('data-map');
        const weapon = result.getAttribute('data-weapon');

        const chapterMatch = chapterFilter === "" || chapter === chapterFilter;
        const pathMatch = pathFilter === "" || path === pathFilter;
        const mapMatch = mapFilter === "" || map === mapFilter;
        //const weaponMatch = rareWeaponFilter === "" || weapon === rareWeaponFilter;

        if (chapterMatch && pathMatch && mapMatch) {
            result.style.display = 'block';
        } else {
            result.style.display = 'none';
        }
    });
}

function openModal(imageSrc, captionText, objectivesList) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const caption = document.getElementById("caption");
    const objectives = document.getElementById("objectives");

    footer.classList.toggle('hidden');
    modal.style.display = "block";
    modalImage.src = imageSrc;
    caption.innerHTML = captionText;

    if (objectivesList) {
        objectives.innerHTML = '<h3>Objectives:</h3>' + objectivesList.innerHTML;
    } else {
        objectives.innerHTML = '<h3>Objectives:</h3><p>Nenhum objetivo disponível.</p>';
    }
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    footer.classList.toggle('hidden');
    modal.style.display = "none";
}