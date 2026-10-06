<script>
  import LandscapeDisplay from '../plant-overview/LandscapeDisplay.svelte'
  import PortraitControls from '../care-controls/PortraitControls.svelte'

  /** @typedef {import('../../data/plants.js').PlantProfile} PlantProfile */
  /** @typedef {'up' | 'down' | 'select' | 'back'} HardwareButton */

  /** @type {{ plant: PlantProfile, selectedPreset: PlantProfile['presets'][number], targetMoisture: number, targetLight: number, waterEvery: number, autoCareEnabled: boolean, manualMoisture: number, manualLight: number, manualWaterEvery: number, controlRows: { label: string, value: string, detail: string }[], controlIndex: number, editing: boolean, statusMessage: string, simulationHours: number, simulationSecondsRemaining: number, simulationRunning: boolean, simulationCompleted: boolean, onSimulationHoursChange: (event: { currentTarget: HTMLInputElement }) => void, onRunSimulation: () => void, onButtonPress: (button: HardwareButton) => void }} */
  let { plant, selectedPreset, targetMoisture, targetLight, waterEvery, autoCareEnabled, manualMoisture, manualLight, manualWaterEvery, controlRows, controlIndex, editing, statusMessage, simulationHours, simulationSecondsRemaining, simulationRunning, simulationCompleted, onSimulationHoursChange, onRunSimulation, onButtonPress } = $props()

  const countdownText = $derived(
    `${Math.floor(simulationSecondsRemaining / 60).toString().padStart(2, '0')}:${(simulationSecondsRemaining % 60).toString().padStart(2, '0')}`,
  )
</script>

<section class="prototype-card" aria-labelledby="prototype-title">
  <header class="section-heading">
    <div>
      <p class="section-kicker">INTERACTIVE STUDY / 01</p>
      <h2 id="prototype-title">Plant care displays</h2>
      <p>Sensor readings and physical-button controls, designed for the pot itself.</p>
    </div>
  </header>

  <section class="simulation-control" aria-label="Plant care simulation">
    <div class="simulation-copy">
      <span class="simulation-icon" aria-hidden="true">01</span>
      <div>
        <h3>Run a care simulation</h3>
        <p>See how the selected care settings change the plant readings over time.</p>
      </div>
    </div>
    <label class="simulation-duration">
      <span>Duration <b>{simulationHours} {simulationHours === 1 ? 'hour' : 'hours'}</b></span>
      <input type="range" min="1" max="24" step="1" value={simulationHours} oninput={onSimulationHoursChange} disabled={simulationRunning} aria-label="Simulation duration in hours" />
      <span class="duration-limits"><span>1 hour</span><span>24 hours</span></span>
    </label>
    <div class="simulation-action">
      {#if simulationRunning}
        <div class="simulation-countdown" role="timer" aria-live="off"><span>TIME REMAINING</span><b>{countdownText}</b></div>
      {:else}
        <span class="simulation-ready">{simulationCompleted ? 'SIMULATION COMPLETE' : 'READY TO RUN'}</span>
      {/if}
      <button class="simulation-button" class:is-running={simulationRunning} type="button" onclick={onRunSimulation}>
        {simulationRunning ? 'Stop simulation' : 'Run simulation'}
        <span aria-hidden="true">{simulationRunning ? '×' : '↗'}</span>
      </button>
    </div>
  </section>

  <div class="preview-stage" aria-label="Plant pot hardware screen prototypes">
    <LandscapeDisplay {plant} {targetMoisture} {targetLight} {waterEvery} {autoCareEnabled} {selectedPreset} />
    <PortraitControls {plant} {selectedPreset} {controlRows} {autoCareEnabled} {manualMoisture} {manualLight} {manualWaterEvery} {controlIndex} {editing} {statusMessage} {onButtonPress} />
  </div>
</section>
