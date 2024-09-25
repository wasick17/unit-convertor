import { html, render } from 'lit-html';

class UnitConverter {
  constructor() {
    this.value = 0;
    this.fromUnit = 'meters';
    this.toUnit = 'kilometers';
    this.convertedValue = 0;
    this.#render();
  }

  // Conversion logic
  #convertValue = () => {
    const conversions = {
      meters: {
        meters: 1,
        kilometers: 0.001,
        miles: 0.000621371,
        feet: 3.28084,
      },
      kilometers: {
        meters: 1000,
        kilometers: 1,
        miles: 0.621371,
        feet: 3280.84,
      },
      miles: {
        meters: 1609.34,
        kilometers: 1.60934,
        miles: 1,
        feet: 5280,
      },
      feet: {
        meters: 0.3048,
        kilometers: 0.0003048,
        miles: 0.000189394,
        feet: 1,
      },
    };

    this.convertedValue =
      this.value * conversions[this.fromUnit][this.toUnit];
    this.#render();
  };

  // Handle value input change
  #handleValueInput = (e) => {
    this.value = parseFloat(e.target.value) || 0;
    this.#convertValue();
  };

  // Handle unit selection change
  #handleFromUnitChange = (e) => {
    this.fromUnit = e.target.value;
    this.#convertValue();
  };

  #handleToUnitChange = (e) => {
    this.toUnit = e.target.value;
    this.#convertValue();
  };

  // Render the UI
  #render() {
    let template = html`
      <main>
        <h2>Unit Converter</h2>
        <div class="converter">
          <input
            id="value"
            type="number"
            .value=${this.value || ''}
            @input=${this.#handleValueInput}
            placeholder="Enter value"
          />
          <br />
          <label for="from-unit">From:</label>
          <select
            id="from-unit"
            @change=${this.#handleFromUnitChange}
            .value=${this.fromUnit}
          >
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
            <option value="miles">Miles</option>
            <option value="feet">Feet</option>
          </select>
          <br />
          <label for="to-unit">To:</label>
          <select
            id="to-unit"
            @change=${this.#handleToUnitChange}
            .value=${this.toUnit}
          >
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
            <option value="miles">Miles</option>
            <option value="feet">Feet</option>
          </select>
          <br />
          <section id="result">
            <p>Converted Value: <span>${this.convertedValue.toFixed(4)}</span></p>
          </section>
        </div>
      </main>
    `;
    render(template, document.getElementById('root'));
  }
}

// Initialize the Unit Converter
new UnitConverter();

export default UnitConverter;
