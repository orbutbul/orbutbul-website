import { useRef, useState } from 'react';
import { useGemsGenerator } from '../three/GemsCanvas.jsx';

function validateInput(value) {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export default function GemsSection() {
  const containerRef = useRef(null);
  const generate = useGemsGenerator(containerRef);
  const [seed, setSeed] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!seed) return;
    generate(seed);
  }

  return (
    <section className="page" id="gems-page">
      <div className="panel" id="gemsDisplay">
        <div id="gemsCanvas" ref={containerRef} />
        <form className="seedForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="seedId"
            maxLength={10}
            minLength={1}
            placeholder="Seed"
            value={seed}
            onChange={(e) => setSeed(validateInput(e.target.value))}
            required
          />
          <input type="submit" value="Generate" id="submitBtn" />
        </form>
      </div>
      <div className="panel gems-description-panel">
        <p className="gems-description">
          GEMS (Generative Expression of Modeled Shapes) turns any alphanumeric seed into
          a one-of-a-kind 3D object. Typing a seed decodes it into a number, which picks
          one of twelve base shapes — the same seed always produces the same shape.
          <br />
          <br />
          From there, the seed's digits drive everything else: they choose the three
          colors blended across the surface, and generate one to three procedural noise
          patterns (Perlin, value noise, or Voronoi) that get layered together in a custom
          GLSL shader to give the object its marbled, gem-like texture.
          <br />
          <br />
          Nothing here is random — every visual detail traces back to the characters you
          typed. Type a seed and hit Generate to see it take shape.
        </p>
      </div>
    </section>
  );
}
