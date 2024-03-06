import { useState } from "react";
import classes from "./ProductImages.module.css";
export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <div className={classes.activeImage}>
        <img src={activeImage} />
      </div>
      <div className={classes.imageButtons}>
        {images.map((img) => (
          <div
            className={img == activeImage ? classes.active : classes.notActive}
            onClick={() => setActiveImage(img)}
            active={img === activeImage}
            key={img}
          >
            <img src={img} />
          </div>
        ))}
      </div>
    </>
  );
}
