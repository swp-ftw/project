document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  const fields = ['title', 'time', 'price', 'description', 'image'];


  fields.forEach(field => {
    const savedValue = localStorage.getItem(`addRecipe_${field}`);
    if (savedValue) {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) input.value = savedValue;
    }
  });


  form.addEventListener('input', e => {
    if (fields.includes(e.target.name)) {
      localStorage.setItem(`addRecipe_${e.target.name}`, e.target.value);
    }
  });


  form.addEventListener('submit', () => {
    fields.forEach(field => {
      localStorage.removeItem(`addRecipe_${field}`);
    });
  });
});

  const dropZone = document.getElementById('drop-zone');
  const inputFile = document.getElementById('imageInput');
  const previewContainer = document.getElementById('preview-container');
  const hiddenField = document.getElementById('imagesBase64');

  dropZone.addEventListener('click', () => inputFile.click());

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#fff3e0';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = '#fffaf3';
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#fffaf3';
    if (e.dataTransfer.files.length) {
      inputFile.files = e.dataTransfer.files;
      handleFiles([...e.dataTransfer.files]);
    }
  });

  inputFile.addEventListener('change', () => {
    if (inputFile.files.length) {
      handleFiles([...inputFile.files]);
    }
  });

  function handleFiles(files) {
    previewContainer.innerHTML = '';
    const base64Images = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        previewContainer.appendChild(img);
        base64Images.push(e.target.result);

        if (base64Images.length === files.length) {
          hiddenField.value = JSON.stringify(base64Images);
        }
      };
      reader.readAsDataURL(file);
    });
  }