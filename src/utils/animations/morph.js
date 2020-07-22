export default function morph(time) {
  return {
    enter({
      overElRef,
      overBoundingBox,
      targetBoundingBox,
      curve = "var(--weightedEase)",
    }) {
      if (!overElRef.current) {
        return;
      }
      overElRef.current.style.opacity = 0;
      overElRef.current.style.transition = "none";
      overElRef.current.style.transformOrigin = "top left";

      overElRef.current.style.transform = [
        `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
          targetBoundingBox.y - overBoundingBox.y
        }px, 0)`,
        `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
          targetBoundingBox.height / overBoundingBox.height
        })`,
      ].join(" ");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!overElRef.current) {
            return;
          }

          const opacityCurve = "var(--weightedEase)";
          overElRef.current.style.transition = `opacity ${time}ms ${opacityCurve}, transform ${time}ms ${curve}`;
          overElRef.current.style.opacity = 1;
          overElRef.current.style.transform = "none";
        });
      });
    },

    exit({ overElRef, overBoundingBox, targetBoundingBox }) {
      if (!overElRef.current) {
        return;
      }

      overElRef.current.style.transition = `opacity ${time}ms ease-out, transform ${time}ms var(--weightedEase)`;

      requestAnimationFrame(() => {
        if (!overElRef.current) {
          return;
        }
        overElRef.current.style.opacity = 0;
        overElRef.current.style.transformOrigin = "top left";

        overElRef.current.style.transform = [
          `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
            targetBoundingBox.y - overBoundingBox.y
          }px, 0)`,
          `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
            targetBoundingBox.height / overBoundingBox.height
          })`,
        ].join(" ");
      });
    },
  };
}
