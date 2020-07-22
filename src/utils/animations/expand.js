export default function morph(time) {
  return {
    enter({
      overElRef,
      overBoundingBox,
      targetBoundingBox,
      curve = 'var(--weightedEase)',
    }) {
      if (!overElRef.current) {
        return;
      }
      overElRef.current.style.opacity = 0;
      overElRef.current.style.transition = 'none';
      overElRef.current.style.transformOrigin = 'center';

      overElRef.current.style.transform = [
        // TODO: make this smarter (based on bb)
        `scale(0.7)`,
      ].join(' ');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!overElRef.current) {
            return;
          }

          const opacityCurve = 'var(--weightedEase)';
          overElRef.current.style.transition = `opacity ${time}ms ${opacityCurve}, transform ${time}ms ${curve}`;
          overElRef.current.style.opacity = 1;
          overElRef.current.style.transform = 'none';
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
        overElRef.current.style.transformOrigin = 'center';

        overElRef.current.style.transform = [`scale(0.7)`].join(' ');
      });
    },
  };
}
