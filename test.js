const files = [
    { "action": "delete", "created_at": "2025-02-23 10:39:17", "id": "84d618d3-b9ef-45c2-be44-240413d2f39f", "title": "FK.pdf" },
  ];
  
  const actionLabels = {
    delete: "dihapus",
    add: "ditambahkan",
    update: "diperbarui"
  };
  
  const formattedFiles = files.map(file => `${file.title} (${actionLabels[file.action] || 'diproses'})`);
  
  const output = formattedFiles.length > 1
    ? formattedFiles.slice(0, -1).join(', ') + ' dan ' + formattedFiles.slice(-1)
    : formattedFiles[0] || '';
  
  console.log(output);
  // Output: "FK.pdf (dihapus), FOK.pdf (dihapus), NewFile.pdf (ditambahkan) dan UpdatedFile.pdf (diperbarui)"
  