function toggleFilters() {
    const filterSection = document.querySelector('.filter-section');
    const footer = document.querySelector('footer');
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

        const chapterMatch = chapterFilter === "" || chapter === chapterFilter;
        const pathMatch = pathFilter === "" || path === pathFilter;
        const mapMatch = mapFilter === "" || map === mapFilter;

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

    modal.style.display = "block";
    modalImage.src = imageSrc;
    caption.innerHTML = captionText;

    if (objectivesList) {
        objectives.innerHTML = '<h3>Objectives:</h3>' + objectivesList.innerHTML;
    } else {
        objectives.innerHTML = '<h5>Objectives:</h5><p>Nenhum objetivo disponível.</p>';
    }
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}