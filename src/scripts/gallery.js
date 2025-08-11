import justifiedLayout from "./justified-layout.js";

// Configuration
const boxSpacing = 8;
const targetRowHeight = 288;
const targetRowHeightTolerance = 0.25;

const gallery = document.getElementById("gallery");

if (gallery) {
  let containerWidth = 0;
  const items = gallery.querySelectorAll(".gallery-item");

  const aspectRatios = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    img.style.width = "100%";
    img.style.height = "auto";
    return (
      parseFloat(img.getAttribute("width")) /
      parseFloat(img.getAttribute("height"))
    );
  });

  function updateGallery() {
    if (containerWidth === gallery.getBoundingClientRect().width) return;
    containerWidth = gallery.getBoundingClientRect().width;

    const layout = justifiedLayout(aspectRatios, {
      rowWidth: containerWidth,
      spacing: boxSpacing,
      rowHeight: targetRowHeight,
      heightTolerance: targetRowHeightTolerance,
    });

    items.forEach((item, i) => {
      const { width, height, top, left } = layout.boxes[i];
      item.style.position = "absolute";
      item.style.width = width + "px";
      item.style.height = height + "px";
      item.style.top = top + "px";
      item.style.left = left + "px";
      item.style.overflow = "hidden";
    });

    gallery.style.position = "relative";
    gallery.style.height = layout.containerHeight + "px";
    gallery.style.visibility = "";
  }

  window.addEventListener("resize", updateGallery);
  window.addEventListener("orientationchange", updateGallery);

  // Call twice to adjust for scrollbars appearing after first call
  updateGallery();
  updateGallery();
}
