/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";


const Home = () => {
  const [srcImage, setSrcImage] = useState<string|null>(null);
  const [zoomedImage, setZoomedImage] = useState<string|null>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setSrcImage(reader.result as string);
    };
  }

  const zoomImage = async (xRate: number, yRate: number) => {
    if (!srcImage) return;
    const image = new Image();
    image.src = srcImage;
    await image.decode();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = image.width  * xRate;
    canvas.height = image.height * yRate;
    ctx.scale(xRate, yRate);
    ctx.drawImage(image, 0, 0);

    const [, mimeType] = srcImage.match(/^data:(.*?);/) ?? ['', 'image/png'];
    setZoomedImage(canvas.toDataURL(mimeType));
  }

  return (
    <div>
      <input type="file" onChange={loadImage} />
      <hr />
      {srcImage && <img src={srcImage} alt="source image" style={{border: 'solid 1px blue'}} />}
      <hr />
      <button onClick={_ => zoomImage(0.5, 2.0)}>Zoom</button>
      <hr />
      {zoomedImage && <img src={zoomedImage} alt="zoomed image" style={{border: 'solid 1px blue'}}/>}
    </div>
  );
}

export default Home;
