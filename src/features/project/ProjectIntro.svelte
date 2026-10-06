<script>
  /** @type {{ onReset: () => void }} */
  let { onReset } = $props()
</script>

<section class="project-card" aria-labelledby="project-title">
  <header class="project-heading">
    <div class="project-mark" aria-hidden="true"><i></i><i></i><i></i></div>
    <div>
      <p class="brand-kicker">FIELDWORK / PROJECT 01</p>
      <h1 id="project-title">Smart Plant Pot</h1>
    </div>
    <div class="project-actions">
      <span class="sample-status"><i></i> Prototype / sample data</span>
      <button class="reset-button" type="button" onclick={onReset}>Reset prototype</button>
    </div>
  </header>

  <div class="project-content">
    <div class="project-story">
      <h2>Why it's needed</h2>
      <p>Many people struggle to take care of their plants as time goes on. Whether they have too many plants to take care of or life just gets in the way.</p>
      <p>The Smart Plant Pot takes control of the plant while you have other things going on. By using the controls on the pot itself, you are able to automate soil moisture targets, a water timer, and light target. Don't know how to take care of your specific plant? Let the pot take over! By selecting auto-care, your plant, and the care preset you can let the pot work on its own for you.</p>
      <p class="try-prompt">Try out the features below!</p>
    </div>

    <div class="control-overview">
      <h2>The Controls</h2>
      <p>The Smart Plant Pot has 6 easy to use controls to make sure your plant stays healthy.</p>
      <ul>
        <li><b>Plant Profile</b><span>Choose the type of plant</span></li>
        <li><b>Auto-care</b><span>Activates preset settings dependent on the type of plant</span></li>
        <li><b>Care preset</b><span>Controls the aggressiveness of plant growth</span></li>
        <li><b>Soil target</b><span>Configures the moisture of the soil</span></li>
        <li><b>Light target</b><span>Adjust the lighting and heat to the plant</span></li>
        <li><b>Water timer</b><span>Adjust the frequency of water the plant receives</span></li>
      </ul>
    </div>
  </div>
</section>
