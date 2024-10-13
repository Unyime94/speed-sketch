window.addEventListener("load", () => {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath(); // Ensures no continuous drawing when the mouse is lifted
  }

  function draw(e) {
    if (!painting) return;

    //Adjust for canvas offset
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});
