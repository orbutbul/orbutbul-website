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
          The GEMS (Generative expression of modeled shapes) project is a custom shader
          generator that changes based on an alphanumeric seed value. Each seed value
          (entered in the text input box labeled seed) generates a 3d object with unique
          coloring based on the seed value.
          <br />
          <br />
          The seed value is converted into a number and its numerical properties (whether
          it is prime, if it is even or odd, how many digits it has, etc) decide the
          attributes of the shader (what the colors will be, what kind of noise textures
          are applied, etc.)
          <br />
          <br />
          To generate objects, type a value in the text box labeled seed.
        </p>
      </div>
    </section>
  );
}
