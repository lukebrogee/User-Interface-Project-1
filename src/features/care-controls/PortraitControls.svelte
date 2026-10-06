<script>
  /** @typedef {import('../../data/plants.js').PlantProfile} PlantProfile */
  /** @typedef {'up' | 'down' | 'select' | 'back'} HardwareButton */

  /** @type {{ plant: PlantProfile, selectedPreset: PlantProfile['presets'][number], controlRows: { label: string, value: string, detail: string }[], autoCareEnabled: boolean, manualMoisture: number, manualLight: number, manualWaterEvery: number, controlIndex: number, editing: boolean, statusMessage: string, onButtonPress: (button: HardwareButton) => void }} */
  let { plant, selectedPreset, controlRows, autoCareEnabled, manualMoisture, manualLight, manualWaterEvery, controlIndex, editing, statusMessage, onButtonPress } = $props()
</script>

<div class="hardware-wrap hardware-wrap--portrait">
  <div class="dimension-label"><span>ACTIVE DISPLAY</span><b>3.5 x 8 IN</b></div>
  <div class="hardware-frame hardware-frame--portrait">
    <article class="display display--portrait" aria-label="Three point five by eight inch portrait care controls display">
      <header class="display-header display-header--portrait">
        <div class="display-brand"><span class="display-leaf" aria-hidden="true"></span><b>VERDANT</b></div>
        <div class="display-pot-id"><i></i> POT 01</div>
      </header>

      <div class="controls-title"><span class="display-kicker">CARE SETTINGS / {plant.name.toUpperCase()}</span><h2>Care controls</h2></div>

      <div class="control-list" aria-live="polite">
        {#each controlRows as row, index (row.label)}
          <div class="control-row" class:row-focused={controlIndex === index} class:row-editing={controlIndex === index && editing} class:row-locked={autoCareEnabled && index >= 3} aria-current={controlIndex === index ? 'true' : undefined}>
            <div class="row-copy"><span class="row-index">0{index + 1}</span><span class="row-label">{row.label}<small>{row.detail}</small></span></div>
            <span class="row-value">{row.value}</span>
          </div>
        {/each}
      </div>

      <div class="care-summary">
        <span class="summary-mark">{autoCareEnabled ? 'A' : 'M'}</span>
        <span><b>{autoCareEnabled ? `${plant.name} / ${selectedPreset.name}` : 'Manual care'}</b><small>{autoCareEnabled ? `${selectedPreset.moisture}% moisture · ${selectedPreset.light} h light · every ${selectedPreset.waterEvery} days` : `Water every ${manualWaterEvery} days · soil ${manualMoisture}% · light ${manualLight} h`}</small></span>
      </div>

      <footer class="control-footer" aria-live="polite">{statusMessage || (editing ? 'EDITING SELECTED VALUE' : 'CARE PROFILE READY')}</footer>
    </article>
    <div class="physical-keys" aria-label="Physical device buttons">
      <button type="button" aria-label="Up button" onclick={() => onButtonPress('up')}><span>UP</span><i>+</i></button>
      <button type="button" aria-label="Down button" onclick={() => onButtonPress('down')}><span>DOWN</span><i>-</i></button>
      <button type="button" aria-label="Select button" onclick={() => onButtonPress('select')}><span>SELECT</span><i>OK</i></button>
      <button type="button" aria-label="Back button" onclick={() => onButtonPress('back')}><span>BACK</span><i>↶</i></button>
    </div>
  </div>
  <p class="hardware-caption">Portrait care display <span>Physical keys / Up, Down, Select, Back</span></p>
</div>
