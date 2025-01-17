const galleryLinks = document.querySelectorAll('.gallery__link');
const detailsPanel = document.getElementById('details-panel');
const detailsImage = document.getElementById('details-image');
const detailsTitle = document.getElementById('details-title');
const detailsDesc = document.getElementById('details-desc');
const closePanel = document.getElementById('close-panel');
const body = document.body;

// Muestra el panel de detalles
galleryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    detailsImage.src = link.dataset.img;
    detailsTitle.textContent = link.dataset.title;
    detailsDesc.textContent = link.dataset.desc;
    detailsPanel.style.display = 'block';
    body.style.overflow = 'hidden'; // Evita el scroll
    document.querySelectorAll('.gallery__link').forEach(link => {
      link.style.pointerEvents = 'none'; // Desactiva clics en otros enlaces
    });
  });
});

// Cierra el panel
const closeDetailsPanel = () => {
  detailsPanel.style.display = 'none';
  body.style.overflow = ''; // Habilita el scroll
  document.querySelectorAll('.gallery__link').forEach(link => {
    link.style.pointerEvents = ''; // Reactiva los clics en otros enlaces
  });
};

closePanel.addEventListener('click', closeDetailsPanel);

// Cierra el panel al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === detailsPanel) {
    closeDetailsPanel();
  }
});

// Cierra el panel con la tecla Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDetailsPanel();
  }
});
