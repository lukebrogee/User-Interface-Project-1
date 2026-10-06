<script>
  /** @typedef {import('../../data/plants.js').PlantProfile} PlantProfile */

  /** @type {{ plant: PlantProfile, targetMoisture: number, targetLight: number, waterEvery: number, autoCareEnabled: boolean, selectedPreset: PlantProfile['presets'][number] }} */
  let { plant, targetMoisture, targetLight, waterEvery, autoCareEnabled, selectedPreset } = $props()

  const overviewMetrics = $derived([
    { label: 'Health', value: `${plant.health}`, unit: '/ 100' },
    { label: 'Soil moisture', value: `${plant.soilMoisture}`, unit: '%' },
    { label: 'Reservoir', value: `${plant.reservoir}`, unit: '%' },
    { label: 'Light today', value: `${plant.currentLight}`, unit: 'h' },
    { label: 'Humidity', value: `${plant.humidity}`, unit: '%' },
  ])
</script>

<div class="hardware-wrap hardware-wrap--landscape">
  <div class="dimension-label"><span>ACTIVE DISPLAY</span><b>8 x 2 IN</b></div>
  <div class="hardware-frame hardware-frame--landscape">
    <article class="display display--landscape" aria-label="Eight by two inch landscape plant overview display">
      <header class="display-header">
        <div class="display-brand"><span class="display-leaf" aria-hidden="true"></span><b>VERDANT</b><span> / POT 01</span></div>
        <div class="display-connect"><i></i> CONNECTED</div>
        <time>09:41</time>
      </header>

      <div class="overview-title">
        <div><span class="display-kicker">PLANT STATUS</span><h2>{plant.name}</h2></div>
        <div class="health-indicator"><i></i> HEALTH {plant.health}</div>
      </div>

      <div class="sensor-strip" aria-live="polite">
        {#each overviewMetrics as metric, index (metric.label)}
          <div class="sensor">
            <span class="sensor-label">{metric.label}</span>
            <span class="sensor-reading">{metric.value}<small>{metric.unit}</small></span>
            {#if index === 1}
              <div class="sensor-meter"><span style={`--fill: ${plant.soilMoisture}%`}></span></div>
              <span class="sensor-detail">Target {targetMoisture}%</span>
            {:else if index === 2}
              <div class="sensor-meter"><span style={`--fill: ${plant.reservoir}%`}></span></div>
              <span class="sensor-detail">Water reserve</span>
            {:else if index === 3}
              <span class="sensor-detail">Target {targetLight} h</span>
            {:else if index === 0}
              <span class="sensor-detail">Plant health</span>
            {:else}
              <span class="sensor-detail">Room air</span>
            {/if}
          </div>
        {/each}
      </div>

      <footer class="overview-footer" aria-live="polite">
        <span>NEXT WATER / {waterEvery} DAYS</span>
        <span>{autoCareEnabled ? `AUTO / ${selectedPreset.name}` : 'MANUAL CARE'}</span>
      </footer>
    </article>
  </div>
  <p class="hardware-caption">Landscape status display <span>Read-only / sample sensor values</span></p>
</div>
