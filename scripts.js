const modal = document.getElementById("image-modal");
const footer = document.querySelector('footer');

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
        const weaponMatch = rareWeaponFilter === "" || weapon === rareWeaponFilter;

        if (chapterMatch && pathMatch && mapMatch && weaponMatch) {
            result.style.display = 'block';
        } else {
            result.style.display = 'none';
        }
    });
}

function openModal(imageSrc, captionText, objectivesList) {
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
    footer.classList.toggle('hidden');
    modal.style.display = "none";
}