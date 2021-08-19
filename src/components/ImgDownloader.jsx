import { useRef } from "react";

const ImgDownloader = ({ cells, size, scale }) => {
  const canvasRef = useRef(null);

  const downloadImg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.canvas.height = size * scale;
    context.canvas.width = size * scale;

    cells.forEach((cell, i) => {
      context.fillStyle = cell;
      context.fillRect((i % size) * scale, Math.floor(i / size) * scale, scale, scale);
    });

    // stackoverflow.com/a/63965930
    canvas.toBlob((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "img.png");

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  return (
    <>
      <input className="generic-btn" type="button" value="download image" onClick={downloadImg} />
      <canvas ref={canvasRef} hidden={true}></canvas>
    </>
  );
};

export default ImgDownloader;
