const { ipcRenderer } = require('electron');
const { mergePDFs } = require('./utils');

let selectedFiles = []; // Stocker les fichiers sélectionnés

// Ajouter des fichiers
document.getElementById('addFilesBtn').addEventListener('click', async () => {
  const pdfFiles = await ipcRenderer.invoke('select-pdfs');
  if (pdfFiles.length > 0) {
    selectedFiles.push(...pdfFiles); // Ajouter les fichiers sélectionnés
    updateFileList();
  } else {
    alert('Aucun fichier sélectionné.');
  }
});

// Mettre à jour l'affichage des fichiers
function updateFileList() {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = ''; // Effacer la liste actuelle
  selectedFiles.forEach((file, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${file}`;
    fileList.appendChild(li);
  });
}

// Fusionner les fichiers
document.getElementById('mergeBtn').addEventListener('click', async () => {
  if (selectedFiles.length < 2) {
    alert('Veuillez ajouter au moins deux fichiers pour les fusionner.');
    return;
  }
  await mergePDFs(selectedFiles);
  alert('Fusion terminée ! Le fichier "merged.pdf" a été créé.');
});

// Séparer les fichiers (placeholder, à implémenter)
document.getElementById('splitBtn').addEventListener('click', () => {
  alert('La fonctionnalité de séparation est en cours de développement.');
});

// Compresser les fichiers (placeholder, à implémenter)
document.getElementById('compressBtn').addEventListener('click', () => {
  alert('La fonctionnalité de compression est en cours de développement.');
});
