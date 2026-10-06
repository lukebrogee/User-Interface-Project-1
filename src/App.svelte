<script>
  import { onDestroy } from 'svelte'
  import { plants, waterIntervals } from './data/plants.js'
  import ProjectIntro from './features/project/ProjectIntro.svelte'
  import ProjectMaterials from './features/project/ProjectMaterials.svelte'
  import PrototypeSection from './features/prototype/PrototypeSection.svelte'

  let selectedPlantId = $state('monstera')
  let selectedPresetId = $state('lush')
  let autoCareEnabled = $state(false)
  let manualMoisture = $state(55)
  let manualLight = $state(7)
  let manualWaterEvery = $state(4)
  let controlIndex = $state(0)
  let editing = $state(false)
  let statusMessage = $state('')
  let simulationHours = $state(4)
  let simulationSecondsRemaining = $state(0)
  let simulatedHoursElapsed = $state(0)
  let simulationRunning = $state(false)
  let simulationCompleted = $state(false)
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let simulationInterval

  const selectedPlant = $derived(plants.find((plant) => plant.id === selectedPlantId) ?? plants[0])
  const selectedPreset = $derived(
    selectedPlant.presets.find((preset) => preset.id === selectedPresetId) ?? selectedPlant.presets[0],
  )
  const targetMoisture = $derived(autoCareEnabled ? selectedPreset.moisture : manualMoisture)
  const targetLight = $derived(autoCareEnabled ? selectedPreset.light : manualLight)
  const waterEvery = $derived(autoCareEnabled ? selectedPreset.waterEvery : manualWaterEvery)
  const displayPlant = $derived({
    ...selectedPlant,
    soilMoisture: Math.round(
      selectedPlant.soilMoisture +
      Math.sign(targetMoisture - selectedPlant.soilMoisture) *
      Math.min(Math.abs(targetMoisture - selectedPlant.soilMoisture), simulatedHoursElapsed * 2),
    ),
    reservoir: Math.max(0, selectedPlant.reservoir - Math.floor(simulatedHoursElapsed / 3)),
    currentLight: Math.min(targetLight, Number((selectedPlant.currentLight + simulatedHoursElapsed * 0.5).toFixed(1))),
    health: Math.min(100, selectedPlant.health + Math.floor(simulatedHoursElapsed / 6)),
  })
  const controlRows = $derived([
    { label: 'Plant profile', value: selectedPlant.name, detail: selectedPlant.scientificName },
    { label: 'Auto-care', value: autoCareEnabled ? 'ON' : 'OFF', detail: autoCareEnabled ? 'Plant preset active' : 'Manual targets active' },
    { label: 'Care preset', value: selectedPreset.name, detail: autoCareEnabled ? `${selectedPreset.moisture}% soil / ${selectedPreset.light} h light` : 'Ready for auto-care' },
    { label: 'Soil target', value: `${targetMoisture}%`, detail: autoCareEnabled ? 'Set by auto-care' : 'Manual moisture target' },
    { label: 'Light target', value: `${targetLight} h`, detail: autoCareEnabled ? 'Set by auto-care' : 'Hours per day' },
    { label: 'Water timer', value: `Every ${waterEvery} days`, detail: 'Recurring water reminder' },
  ])

  /** @param {number} direction */
  function changePlant(direction) {
    const currentIndex = plants.findIndex((plant) => plant.id === selectedPlantId)
    const nextPlant = plants[(currentIndex + direction + plants.length) % plants.length]
    if (!nextPlant) return
    const [firstPreset] = nextPlant.presets
    if (!firstPreset) return
    selectedPlantId = nextPlant.id
    selectedPresetId = firstPreset.id
  }

  /** @param {number} direction */
  function changePreset(direction) {
    const currentIndex = selectedPlant.presets.findIndex((preset) => preset.id === selectedPresetId)
    const nextIndex = (currentIndex + direction + selectedPlant.presets.length) % selectedPlant.presets.length
    const nextPreset = selectedPlant.presets[nextIndex]
    if (nextPreset) selectedPresetId = nextPreset.id
  }

  /** @param {number} direction */
  function adjustControl(direction) {
    if (controlIndex === 1) {
      changePlant(-direction)
    } else if (controlIndex === 2) {
      changePreset(-direction)
    } else if (controlIndex === 3 && !autoCareEnabled) {
      manualMoisture = Math.min(85, Math.max(10, manualMoisture + direction * 5))
    } else if (controlIndex === 4 && !autoCareEnabled) {
      manualLight = Math.min(14, Math.max(1, manualLight + direction))
    } else if (controlIndex === 5 && !autoCareEnabled) {
      const currentIndex = waterIntervals.indexOf(manualWaterEvery)
      const nextIndex = (currentIndex + direction + waterIntervals.length) % waterIntervals.length
      manualWaterEvery = waterIntervals[nextIndex] ?? manualWaterEvery
    }
  }

  /** @param {'up' | 'down' | 'select' | 'back'} button */
  function pressHardwareButton(button) {
    statusMessage = ''

    if (button === 'back') {
      if (editing) {
        editing = false
      } else {
        controlIndex = 0
      }
      return
    }

    if (button === 'up' || button === 'down') {
      if (editing) {
        adjustControl(button === 'up' ? 1 : -1)
      } else {
        const direction = button === 'up' ? -1 : 1
        controlIndex = (controlIndex + direction + controlRows.length) % controlRows.length
      }
      return
    }

    if (controlIndex === 0) {
      autoCareEnabled = !autoCareEnabled
      editing = false
      return
    }

    if (autoCareEnabled && controlIndex >= 3) {
      statusMessage = 'Auto-care is setting these targets.'
      return
    }

    editing = !editing
    if (!editing) statusMessage = 'Setting updated.'
  }

  function resetPrototype() {
    stopSimulation()
    simulationHours = 4
    simulatedHoursElapsed = 0
    selectedPlantId = 'monstera'
    selectedPresetId = 'lush'
    autoCareEnabled = false
    manualMoisture = 55
    manualLight = 7
    manualWaterEvery = 4
    controlIndex = 0
    editing = false
    statusMessage = ''
  }

  /** @param {{ currentTarget: HTMLInputElement }} event */
  function setSimulationHours(event) {
    simulationHours = Number(event.currentTarget.value)
  }

  function startSimulation() {
    stopSimulation()
    simulatedHoursElapsed = 0
    simulationCompleted = false
    simulationSecondsRemaining = simulationHours * 4
    simulationRunning = true
    simulationInterval = setInterval(() => {
      simulationSecondsRemaining -= 1
      if (simulationSecondsRemaining % 4 === 0) simulatedHoursElapsed += 1
      if (simulationSecondsRemaining <= 0) {
        simulationSecondsRemaining = 0
        simulationRunning = false
        simulationCompleted = true
        clearInterval(simulationInterval)
      }
    }, 1000)
  }

  function stopSimulation() {
    if (simulationInterval) clearInterval(simulationInterval)
    simulationRunning = false
    simulationSecondsRemaining = 0
    simulationCompleted = false
  }

  onDestroy(stopSimulation)
</script>

<main class="studio">
  <ProjectIntro onReset={resetPrototype} />
  <PrototypeSection
    plant={displayPlant}
    selectedPreset={selectedPreset}
    targetMoisture={targetMoisture}
    targetLight={targetLight}
    waterEvery={waterEvery}
    autoCareEnabled={autoCareEnabled}
    manualMoisture={manualMoisture}
    manualLight={manualLight}
    manualWaterEvery={manualWaterEvery}
    controlRows={controlRows}
    controlIndex={controlIndex}
    editing={editing}
    statusMessage={statusMessage}
    {simulationHours}
    {simulationSecondsRemaining}
    {simulationRunning}
    {simulationCompleted}
    onSimulationHoursChange={setSimulationHours}
    onRunSimulation={simulationRunning ? stopSimulation : startSimulation}
    onButtonPress={pressHardwareButton}
  />
  <ProjectMaterials />
</main>
