window.addEventListener("load", () => {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  let drawing = false;
  let drawColor = "#000000";
  let lineWidth = 3;
  let history = [];
  let historyStep = -1;

  // Set up canvas
  ctx.lineCap = "round";

  // Start drawing
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Undo/Redo buttons
  document.getElementById("undoBtn").addEventListener("click", undo);
  document.getElementById("redoBtn").addEventListener("click", redo);

  // Color and thickness controls
  document
    .getElementById("colorPicker")
    .addEventListener("change", function () {
      drawColor = this.value;
    });

  document
    .getElementById("thicknessSlider")
    .addEventListener("input", function () {
      lineWidth = this.value;
    });

  // Start drawing
  function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  }

  // Drawing
  function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  // Stop drawing
  function stopDrawing() {
    if (drawing) {
      drawing = false;
      ctx.closePath();
      saveState(); // Save the canvas state after each line (mouseup)
    }
  }

  // Save canvas state for undo/redo (only after finishing a line)
  function saveState() {
    if (historyStep < history.length - 1) {
      history = history.slice(0, historyStep + 1);
    }
    history.push(canvas.toDataURL()); // Save current state as image
    historyStep++;
  }

  // Undo
  function undo() {
    if (historyStep > 0) {
      historyStep--;
      restoreCanvas();
    }
  }

  // Redo
  function redo() {
    if (historyStep < history.length - 1) {
      historyStep++;
      restoreCanvas();
    }
  }

  // Restore canvas state from history
  function restoreCanvas() {
    const img = new Image();
    img.src = history[historyStep];
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
});
