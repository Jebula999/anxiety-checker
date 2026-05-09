const STORAGE_KEY = "anxiety-checker-entries-v1";
const OPTIONS_KEY = "anxiety-checker-options-v7";
const LEGACY_OPTIONS_KEYS = [];
const SCHEMA_VERSION = 1;

const formSections = [
  {
    title: "Episode Details",
    fields: [
      { id: "date", label: "Date", type: "date", required: true },
      { id: "severity", label: "Severity", type: "range", min: 0, max: 10, hint: "0 = None, 10 = Unbearable" },
      { id: "rampUpTime", label: "Ramp-Up Time", type: "checkbox", options: ["Built Up Slowly", "Instant", "Not Sure"] },
      { id: "duration", label: "Approximate Duration", type: "checkbox", preserveOrder: true, options: ["Less Than 5 Minutes", "5-10 Minutes", "10-20 Minutes", "20-30 Minutes", "30-60 Minutes", "More Than 1 Hour", "Not Sure"] }
    ]
  },
  {
    title: "Location",
    fields: [
      { id: "beforeLocation", label: "Where Were You Before?", type: "checkbox", options: ["Driving", "Home", "Passenger", "Shop", "Social Setting", "Other"] },
      { id: "duringLocation", label: "Where Were You During?", type: "checkbox", options: ["Driving", "Home", "Passenger", "Shop", "Social Setting", "Other"] },
      { id: "afterLocation", label: "Where Were You After?", type: "checkbox", options: ["Driving", "Home", "Passenger", "Shop", "Social Setting", "Other"] }
    ]
  },
  {
    title: "Activity",
    fields: [
      { id: "beforeActivity", label: "What Were You Doing Before?", type: "checkbox", options: ["Asked for Reassurance", "Avoided Talking", "Called or Texted Someone", "Checked My Body", "Cleaning", "Cried", "Distracted Myself", "Drank Water", "Driving", "Eating", "Froze", "Gaming", "Getting Ready", "Googled Symptoms", "In the Bathroom", "Left the Situation", "Relaxing", "Shopping", "Showering", "Sitting or Lying Down", "Sleeping", "Socialising", "Stayed but Wanted to Leave", "Talked a Lot", "Took Prescribed Medication", "Travelling", "Tried Breathing Exercises", "Tried to Hide It", "Used Grounding Techniques", "Walking", "Went Outside", "Working", "Other"] },
      { id: "duringActivity", label: "What Were You Doing During?", type: "checkbox", options: ["Asked for Reassurance", "Avoided Talking", "Called or Texted Someone", "Checked My Body", "Cleaning", "Cried", "Distracted Myself", "Drank Water", "Driving", "Eating", "Froze", "Gaming", "Getting Ready", "Googled Symptoms", "In the Bathroom", "Left the Situation", "Relaxing", "Shopping", "Showering", "Sitting or Lying Down", "Sleeping", "Socialising", "Stayed but Wanted to Leave", "Talked a Lot", "Took Prescribed Medication", "Travelling", "Tried Breathing Exercises", "Tried to Hide It", "Used Grounding Techniques", "Walking", "Went Outside", "Working", "Other"] },
      { id: "afterActivity", label: "What Were You Doing After?", type: "checkbox", options: ["Asked for Reassurance", "Avoided Talking", "Called or Texted Someone", "Checked My Body", "Cleaning", "Cried", "Distracted Myself", "Drank Water", "Driving", "Eating", "Froze", "Gaming", "Getting Ready", "Googled Symptoms", "In the Bathroom", "Left the Situation", "Relaxing", "Shopping", "Showering", "Sitting or Lying Down", "Sleeping", "Socialising", "Stayed but Wanted to Leave", "Talked a Lot", "Took Prescribed Medication", "Travelling", "Tried Breathing Exercises", "Tried to Hide It", "Used Grounding Techniques", "Walking", "Went Outside", "Working", "Other"] }
    ]
  },
  {
    title: "Feelings",
    fields: [
      { id: "beforeFeelings", label: "What Were You Feeling Before?", type: "checkbox", options: ["Angry", "Anxious", "Ashamed", "Calm", "Clear-Headed", "Confident", "Confused", "Detached", "Drained", "Embarrassed", "Frustrated", "Helpless", "Hopeless", "Irritable", "Neutral", "Nervous", "Numb", "On Edge", "Out of Control", "Overwhelmed", "Panicked", "Positive", "Present", "Relieved", "Restless", "Sad", "Scared", "Stressed", "Stuck", "Supported", "Unsafe", "Other"] },
      { id: "duringFeelings", label: "What Were You Feeling During?", type: "checkbox", options: ["Angry", "Anxious", "Ashamed", "Calm", "Clear-Headed", "Confident", "Confused", "Detached", "Drained", "Embarrassed", "Frustrated", "Helpless", "Hopeless", "Irritable", "Neutral", "Nervous", "Numb", "On Edge", "Out of Control", "Overwhelmed", "Panicked", "Positive", "Present", "Relieved", "Restless", "Sad", "Scared", "Stressed", "Stuck", "Supported", "Unsafe", "Other"] },
      { id: "afterFeelings", label: "What Were You Feeling After?", type: "checkbox", options: ["Angry", "Anxious", "Ashamed", "Calm", "Clear-Headed", "Confident", "Confused", "Detached", "Drained", "Embarrassed", "Frustrated", "Helpless", "Hopeless", "Irritable", "Neutral", "Nervous", "Numb", "On Edge", "Out of Control", "Overwhelmed", "Panicked", "Positive", "Present", "Relieved", "Restless", "Sad", "Scared", "Stressed", "Stuck", "Supported", "Unsafe", "Other"] }
    ]
  },
  {
    title: "Physical Symptoms Before",
    fields: [
      { id: "physicalBeforeHead", label: "Physical Symptoms Before: Head", type: "checkbox", options: ["Blurry Vision", "Choking Feeling", "Dizziness", "Dry Mouth", "Feeling Faint", "Head Pressure", "Headache", "Light-Headedness", "Tight Throat", "Other"] },
      { id: "physicalBeforeChest", label: "Physical Symptoms Before: Chest", type: "checkbox", options: ["Chest Discomfort", "Chest Tightness", "Fast Breathing", "Hyperventilating", "Irregular Heartbeat", "Needing Deep Breaths", "Palpitations", "Pounding Heartbeat", "Racing Heart", "Shortness of Breath", "Other"] },
      { id: "physicalBeforeStomach", label: "Physical Symptoms Before: Stomach", type: "checkbox", options: ["Loss of Appetite", "Nausea", "Stomach Cramps", "Tight Stomach", "Urgent Need for Toilet", "Other"] },
      { id: "physicalBeforeBody", label: "Physical Symptoms Before: Limbs and Body", type: "checkbox", options: ["Burning Sensation", "Chills", "Feeling Frozen", "Hot Flushes", "Muscle Tension", "Numbness", "Restlessness", "Shaking", "Sweating", "Tingling", "Trembling", "Unable to Move", "Weak Legs", "Other"] }
    ]
  },
  {
    title: "Physical Symptoms During",
    fields: [
      { id: "physicalDuringHead", label: "Physical Symptoms During: Head", type: "checkbox", options: ["Blurry Vision", "Choking Feeling", "Dizziness", "Dry Mouth", "Feeling Faint", "Head Pressure", "Headache", "Light-Headedness", "Tight Throat", "Other"] },
      { id: "physicalDuringChest", label: "Physical Symptoms During: Chest", type: "checkbox", options: ["Chest Discomfort", "Chest Tightness", "Fast Breathing", "Hyperventilating", "Irregular Heartbeat", "Needing Deep Breaths", "Palpitations", "Pounding Heartbeat", "Racing Heart", "Shortness of Breath", "Other"] },
      { id: "physicalDuringStomach", label: "Physical Symptoms During: Stomach", type: "checkbox", options: ["Loss of Appetite", "Nausea", "Stomach Cramps", "Tight Stomach", "Urgent Need for Toilet", "Other"] },
      { id: "physicalDuringBody", label: "Physical Symptoms During: Limbs and Body", type: "checkbox", options: ["Burning Sensation", "Chills", "Feeling Frozen", "Hot Flushes", "Muscle Tension", "Numbness", "Restlessness", "Shaking", "Sweating", "Tingling", "Trembling", "Unable to Move", "Weak Legs", "Other"] }
    ]
  },
  {
    title: "Physical Symptoms After",
    fields: [
      { id: "physicalAfterHead", label: "Physical Symptoms After: Head", type: "checkbox", options: ["Blurry Vision", "Choking Feeling", "Dizziness", "Dry Mouth", "Feeling Faint", "Head Pressure", "Headache", "Light-Headedness", "Tight Throat", "Other"] },
      { id: "physicalAfterChest", label: "Physical Symptoms After: Chest", type: "checkbox", options: ["Chest Discomfort", "Chest Tightness", "Fast Breathing", "Hyperventilating", "Irregular Heartbeat", "Needing Deep Breaths", "Palpitations", "Pounding Heartbeat", "Racing Heart", "Shortness of Breath", "Other"] },
      { id: "physicalAfterStomach", label: "Physical Symptoms After: Stomach", type: "checkbox", options: ["Loss of Appetite", "Nausea", "Stomach Cramps", "Tight Stomach", "Urgent Need for Toilet", "Other"] },
      { id: "physicalAfterBody", label: "Physical Symptoms After: Limbs and Body", type: "checkbox", options: ["Burning Sensation", "Chills", "Feeling Frozen", "Hot Flushes", "Muscle Tension", "Numbness", "Restlessness", "Shaking", "Sweating", "Tingling", "Trembling", "Unable to Move", "Weak Legs", "Other"] }
    ]
  },
  {
    title: "Thoughts Before",
    fields: [
      { id: "thoughtsBefore", label: "Thoughts Before", type: "checkbox", options: ["Do I Know Where the Bathroom Is?", "Do I Know Where the Exits Are?", "Do I Need a Backup Plan?", "Do I Need Someone With Me?", "How Bad Is Traffic?", "How Far Is It?", "How Long Will It Take?", "I Can Do This", "I Feel Fine", "I Feel Great", "I Just Need to Get Through It", "I Should Be Okay", "Should I Cancel?", "Should I Drink Water?", "Should I Eat First?", "Should I Go to the Bathroom?", "Should I Leave Now?", "Should I Stay Home?", "Should I Take Something With Me?", "Should I Tell Someone?", "Should I Wait a Bit?", "What if I Feel Bad There?", "What if I Get Stuck There?", "Where Will I Park?", "Will I Be Able to Leave?", "Will It Be Busy?", "Will It Be Crowded?", "Will It Be Loud?", "Will There Be a Bathroom Nearby?", "Other"] }
    ]
  },
  {
    title: "Thoughts During",
    fields: [
      { id: "thoughtsDuring", label: "Thoughts During", type: "checkbox", options: ["Can I Get Home?", "Can I Keep Acting Normal?", "Can I Leave Now?", "Can Someone Fetch Me?", "Do I Need Help?", "Do I Need Someone With Me?", "How Far Am I From Home?", "How Long Until This Is Over?", "I Need to Focus on Something Else", "I Need to Get Through This", "I Need to Leave Now", "I Need to Slow Down", "I Need to Stay Here", "Is Anyone Looking at Me?", "Is It Too Crowded?", "Is There Too Much Noise?", "Should I Call Someone?", "Should I Get Fresh Air?", "Should I Go Outside?", "Should I Go to the Bathroom?", "Should I Leave?", "Should I Sit Down?", "Should I Stand Up?", "Should I Text Someone?", "Where Can I Be Alone?", "Where Can I Sit?", "Where Is the Bathroom?", "Where Is the Exit?", "Other"] }
    ]
  },
  {
    title: "Thoughts After",
    fields: [
      { id: "thoughtsAfter", label: "Thoughts After", type: "checkbox", options: ["Can I Still Continue My Day?", "Do I Need a Backup Plan Next Time?", "Do I Need Someone With Me?", "Do I Need to Change My Plans?", "How Do I Get Home?", "How Long Did It Last?", "I Can Try Again", "I Got Through It", "I Need to Take It Slow", "Should I Avoid This Place?", "Should I Drink Water?", "Should I Eat Something?", "Should I Go Home?", "Should I Go to the Bathroom?", "Should I Rest?", "Should I Stay Home Next Time?", "Should I Talk About It?", "Should I Tell Someone?", "Should I Try Again?", "Was It the Bathroom Situation?", "Was It the Crowd?", "Was It the Distance?", "Was It the Heat?", "Was It the Noise?", "Was It the Traffic?", "Was It the Waiting?", "What Helped?", "What Made It Worse?", "Other"] }
    ]
  },
  {
    title: "When It Started Feeling Better",
    fields: [
      { id: "whenBetter", label: "When Did It Start Feeling Better?", type: "checkbox", options: ["I Am Not Sure", "It Did Not Feel Better", "When I Ate Something", "When I Distracted Myself", "When I Drank Water", "When I Focused on Breathing", "When I Got Back in the Car", "When I Got Home", "When I Got Outside", "When I Got Reassurance", "When I Got to a Quiet Place", "When I Got to Bed", "When I Had an Exit Plan", "When I Knew I Could Leave", "When I Knew Where the Bathroom Was", "When I Lay Down", "When I Left the Situation", "When I Parked", "When I Reached My Destination", "When I Sat Down", "When I Spoke to Someone", "When I Started Moving", "When I Stopped Moving", "When I Texted Someone", "When I Took Medication", "When I Turned Back", "When I Was Alone", "When I Was No Longer Driving", "When Someone Was With Me", "When Time Passed", "When Traffic Cleared", "When I Went to the Bathroom", "Other"] }
    ]
  },
  {
    title: "Bathroom",
    fields: [
      { id: "neededBathroomBefore", label: "Did You Need the Bathroom Before?", type: "checkbox", options: ["No", "Yes"] },
      { id: "usedBathroomBefore", label: "Did You Use the Bathroom Before?", type: "checkbox", options: ["No", "Yes"] },
      { id: "neededBathroomDuring", label: "Did You Need the Bathroom During?", type: "checkbox", options: ["No", "Yes"] },
      { id: "usedBathroomDuring", label: "Did You Use the Bathroom During?", type: "checkbox", options: ["No", "Yes"] },
      { id: "neededBathroomAfter", label: "Did You Need the Bathroom After?", type: "checkbox", options: ["No", "Yes"] },
      { id: "usedBathroomAfter", label: "Did You Use the Bathroom After?", type: "checkbox", options: ["No", "Yes"] }
    ]
  },
  {
    title: "Themes",
    fields: [
      { id: "themes", label: "Which Themes Feel Relevant?", type: "checkbox", options: ["Burnout", "Caffeine Sensitivity", "Difficulty Saying No", "Emotions Showing Up Physically", "Family Stress", "Fear of Being Judged", "Fear of Being Trapped", "Fear of Body Symptoms", "Fear of Conflict", "Fear of Disappointing People", "Fear of Embarrassment", "Fear of Losing Control", "Fear of Panic Itself", "Overstimulation", "Past Stressful Experiences", "Perfectionism", "Relationship Stress", "Sleep Issues", "Social Pressure", "Work Pressure", "Other"] }
    ]
  }
];

const fields = formSections.flatMap((section) => section.fields);
const questionnaireFields = fields;
let optionState = loadOptionState();
applyOptionState();
let entries = loadEntries();
let draft = createEmptyDraft();
let currentStep = 0;
let editingEntryId = null;
let deferredInstallPrompt = null;

const form = document.querySelector("#episodeForm");
const toast = document.querySelector("#toast");

document.addEventListener("DOMContentLoaded", () => {
  renderStep();
  renderRecords();
  bindNavigation();
  bindBackup();
  registerServiceWorker();
  setupInstallPrompt();
});

function createEmptyDraft() {
  const data = {};
  for (const field of fields) {
    data[field.id] = field.type === "checkbox" ? [] : "";
  }
  data.date = new Date().toISOString().slice(0, 10);
  data.severity = "5";
  return data;
}

function renderStep() {
  const section = formSections[currentStep];
  form.innerHTML = "";

  const fieldset = document.createElement("fieldset");
  fieldset.className = "form-section wizard-card";

  const legend = document.createElement("legend");
  legend.innerHTML = `<span class="progress-pill">${currentStep + 1}/${formSections.length}</span><span>${escapeHtml(section.title)}</span>`;
  fieldset.append(legend);

  const progress = document.createElement("div");
  progress.className = "progress-track";
  progress.innerHTML = `<span style="width: ${((currentStep + 1) / formSections.length) * 100}%"></span>`;
  fieldset.append(progress);

  for (const field of section.fields) {
    fieldset.append(renderField(field));
  }

  form.append(fieldset);

  const actions = document.createElement("div");
  actions.className = "sticky-actions wizard-actions";
  const finalAction = editingEntryId ? "Update" : "Submit";
  actions.innerHTML = `
    <button class="secondary" id="backButton" type="button"${currentStep === 0 ? " disabled" : ""}>Back</button>
    <button class="primary" id="nextButton" type="button">${currentStep === formSections.length - 1 ? finalAction : "Next"}</button>
  `;
  form.append(actions);

  document.querySelector("#backButton").addEventListener("click", () => {
    saveCurrentStep();
    currentStep = Math.max(0, currentStep - 1);
    renderStep();
    scrollToTop();
  });

  document.querySelector("#nextButton").addEventListener("click", () => {
    saveCurrentStep();
    if (currentStep < formSections.length - 1) {
      currentStep += 1;
      renderStep();
      scrollToTop();
      return;
    }

    saveEntry();
  });
}

function renderField(field) {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const draftValue = normalizeDraftFieldValue(field, draft[field.id]);

  const label = document.createElement("label");
  label.className = "field-label";
  label.textContent = field.label;
  wrapper.append(label);

  if (field.hint) {
    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent = field.hint;
    wrapper.append(hint);
  }

  if (field.type === "date" || field.type === "time" || field.type === "textarea") {
    const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
    input.id = field.id;
    input.name = field.id;
    input.value = draft[field.id] || "";
    if (field.type === "date" || field.type === "time") {
      input.type = field.type;
    }
    if (field.required) {
      input.required = true;
    }
    wrapper.append(input);
    return wrapper;
  }

  if (field.type === "range") {
    const wrap = document.createElement("div");
    wrap.className = "range-wrap";
    wrap.innerHTML = `
      <input id="${field.id}" name="${field.id}" type="range" min="${field.min}" max="${field.max}" value="${draft[field.id] || "5"}">
      <span class="range-value" id="${field.id}Value">${draft[field.id] || "5"}</span>
    `;
    wrapper.append(wrap);
    wrap.querySelector("input").addEventListener("input", (event) => {
      wrap.querySelector(".range-value").textContent = event.target.value;
    });
    return wrapper;
  }

  const grid = document.createElement("div");
  grid.className = "choice-grid";
  for (const option of field.options) {
    const id = `${field.id}-${slugify(option)}`;
    const row = document.createElement("div");
    row.className = "choice-row";
    const checked = field.type === "checkbox" ? draftValue.includes(option) : draftValue === option;
    row.innerHTML = `
      <label class="choice" for="${id}">
      <input id="${id}" name="${field.id}" type="${field.type}" value="${escapeAttribute(option)}"${checked ? " checked" : ""}>
      <span>${escapeHtml(option)}</span>
      </label>
      <button class="remove-option" type="button" data-field-id="${field.id}" data-option="${escapeAttribute(option)}" aria-label="Remove ${escapeAttribute(option)}" title="Remove option">x</button>
    `;
    grid.append(row);
  }
  wrapper.append(grid);

  const addButton = document.createElement("button");
  addButton.className = "add-option";
  addButton.type = "button";
  addButton.dataset.fieldId = field.id;
  addButton.textContent = "Add +";
  wrapper.append(addButton);

  wrapper.querySelectorAll(".remove-option").forEach((button) => {
    button.addEventListener("click", () => removeOption(button.dataset.fieldId, button.dataset.option));
  });
  addButton.addEventListener("click", () => addOption(field.id));

  return wrapper;
}

function addOption(fieldId) {
  saveCurrentStep();
  const field = fields.find((item) => item.id === fieldId);
  if (!field || !field.options) {
    return;
  }

  const value = prompt("Add a new response option:");
  const option = value ? value.trim() : "";
  if (!option) {
    return;
  }

  if (field.options.some((existing) => existing.toLowerCase() === option.toLowerCase())) {
    showToast("That option already exists.");
    return;
  }

  field.options.push(option);
  saveOptionState();
  renderStep();
  showToast("Option added.");
}

function removeOption(fieldId, option) {
  saveCurrentStep();
  const field = fields.find((item) => item.id === fieldId);
  if (!field || !field.options) {
    return;
  }

  if (field.options.length <= 1) {
    showToast("Each question needs at least one option.");
    return;
  }

  if (!confirm(`Remove "${option}" from future forms? Existing saved records will not be changed.`)) {
    return;
  }

  field.options = field.options.filter((item) => item !== option);
  if (Array.isArray(draft[fieldId])) {
    draft[fieldId] = draft[fieldId].filter((item) => item !== option);
  } else if (draft[fieldId] === option) {
    draft[fieldId] = "";
  }
  saveOptionState();
  renderStep();
  showToast("Option removed.");
}

function saveCurrentStep() {
  for (const field of formSections[currentStep].fields) {
    if (field.type === "checkbox") {
      draft[field.id] = Array.from(form.querySelectorAll(`[name="${field.id}"]:checked`)).map((input) => input.value);
      continue;
    }

    const input = form.querySelector(`[name="${field.id}"]`);
    draft[field.id] = input ? input.value : "";
  }
}

function normalizeDraftFieldValue(field, value) {
  if (field.type !== "checkbox") {
    return value ?? "";
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value == null || value === "") {
    return [];
  }

  return String(value).split(";").map((item) => item.trim()).filter(Boolean);
}

function saveEntry() {
  if (!draft.date) {
    showToast("Please add a date before submitting.");
    currentStep = 0;
    renderStep();
    return;
  }

  const existing = editingEntryId ? entries.find((item) => item.id === editingEntryId) : null;
  const entry = {
    id: existing?.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    ...structuredClone(draft)
  };

  if (existing) {
    entries = entries.map((item) => (item.id === existing.id ? entry : item));
  } else {
    entries.unshift(entry);
  }

  entries.sort((a, b) => String(b.date || b.createdAt).localeCompare(String(a.date || a.createdAt)));
  persistEntries();
  draft = createEmptyDraft();
  editingEntryId = null;
  currentStep = 0;
  renderStep();
  renderRecords();
  switchView("records");
  showToast(existing ? "Entry updated." : "Entry saved.");
}

function renderRecords() {
  const count = document.querySelector("#recordCount");
  const list = document.querySelector("#recordList");
  const summary = document.querySelector("#summaryGrid");

  count.textContent = entries.length === 1 ? "1 entry saved." : `${entries.length} entries saved.`;
  summary.innerHTML = "";
  list.innerHTML = "";

  if (!entries.length) {
    count.textContent = "No entries yet.";
    list.innerHTML = `<div class="empty-state">Saved episodes will appear here.</div>`;
    return;
  }

  const intensities = entries.map((entry) => Number(entry.severity ?? entry.intensity)).filter((value) => !Number.isNaN(value));
  const averageIntensity = intensities.length ? (intensities.reduce((sum, value) => sum + value, 0) / intensities.length).toFixed(1) : "-";
  const latest = entries[0];
  const topWhere = topValue(entries.map((entry) => entry.beforeLocation || entry.where).filter(Boolean));

  [
    ["Total", entries.length],
    ["Average peak", averageIntensity],
    ["Latest", formatDate(latest.date)],
    ["Common place", topWhere || "-"]
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML = `<strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span>`;
    summary.append(item);
  });

  for (const entry of entries) {
    const card = document.createElement("article");
    card.className = "record-card";
    const severity = entry.severity ?? entry.intensity;
    const tags = [formatEntryValue(entry.duration), formatEntryValue(entry.beforeLocation || entry.where), severity ? `Severity ${severity}/10` : ""].filter(Boolean);
    card.innerHTML = `
      <div class="record-title">
        <span>${escapeHtml(formatDate(entry.date))}</span>
        <span class="record-meta">${escapeHtml(formatEntryValue(entry.rampUpTime || entry.onset) || "")}</span>
      </div>
      <div class="record-meta">${escapeHtml(firstFilled(entry.thoughtsDuring, entry.duringFeelings, entry.beforeFeelings, entry.beforeState) || "No details selected")}</div>
      <div class="pill-row">${tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="record-actions">
        <button type="button" data-action="edit" data-id="${entry.id}">Edit</button>
        <button type="button" data-action="duplicate" data-id="${entry.id}">Duplicate</button>
        <button type="button" data-action="delete" data-id="${entry.id}">Delete</button>
      </div>
    `;
    list.append(card);
  }

  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (button.dataset.action === "delete") {
        if (confirm("Delete this entry?")) {
          entries = entries.filter((entry) => entry.id !== id);
          persistEntries();
          renderRecords();
          showToast("Entry deleted.");
        }
        return;
      }

      const source = entries.find((entry) => entry.id === id);
      if (source) {
        draft = createEmptyDraft();
        for (const field of fields) {
          draft[field.id] = structuredClone(source[field.id] ?? draft[field.id]);
        }
        editingEntryId = button.dataset.action === "edit" ? source.id : null;
        currentStep = 0;
        renderStep();
        switchView("entry");
        showToast(button.dataset.action === "edit" ? "Editing saved entry." : "Entry copied into the form.");
      }
    });
  });
}

function bindNavigation() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
}

function switchView(view) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === view));
  document.querySelectorAll(".view").forEach((panel) => panel.classList.remove("is-active"));
  document.querySelector(`#${view}View`).classList.add("is-active");
  scrollToTop();
}

function bindBackup() {
  document.querySelector("#exportCsvButton").addEventListener("click", exportCsv);
  document.querySelector("#exportJsonButton").addEventListener("click", exportJson);
  document.querySelector("#importFile").addEventListener("change", importFile);
  document.querySelector("#clearDataButton").addEventListener("click", () => {
    if (!entries.length) {
      showToast("There is no saved data to delete.");
      return;
    }
    if (confirm("Delete all saved entries from this device? Export first if you need a backup.")) {
      entries = [];
      persistEntries();
      renderRecords();
      showToast("All entries deleted.");
    }
  });
}

function exportCsv() {
  if (!entries.length) {
    showToast("No entries to export.");
    return;
  }

  const headers = ["id", "createdAt", "updatedAt", "schemaVersion", ...questionnaireFields.map((field) => field.id)];
  const rows = entries.map((entry) => headers.map((header) => csvEscape(Array.isArray(entry[header]) ? entry[header].join("; ") : entry[header] ?? "")).join(","));
  downloadFile(`anxiety-checker-${todayStamp()}.csv`, [headers.join(","), ...rows].join("\n"), "text/csv");
}

function exportJson() {
  const backup = {
    exportedAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    entries,
    options: optionState
  };
  downloadFile(`anxiety-checker-${todayStamp()}.json`, JSON.stringify(backup, null, 2), "application/json");
}

function importFile(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = file.name.toLowerCase().endsWith(".json") ? JSON.parse(reader.result) : parseCsv(reader.result);
      const importedEntries = Array.isArray(imported) ? imported : imported.entries;
      if (!Array.isArray(importedEntries)) {
        throw new Error("Backup did not contain a list of entries.");
      }

      if (imported && !Array.isArray(imported) && imported.options && typeof imported.options === "object") {
        optionState = imported.options;
        applyOptionState();
        saveOptionState();
        draft = createEmptyDraft();
        currentStep = 0;
        renderStep();
      }

      const normalized = importedEntries.map(normalizeImportedEntry);
      const existingIds = new Set(entries.map((entry) => entry.id));
      const merged = [...entries];
      for (const entry of normalized) {
        if (!existingIds.has(entry.id)) {
          merged.push(entry);
        }
      }
      entries = merged.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      persistEntries();
      renderRecords();
      showToast(`Imported ${normalized.length} entries.`);
    } catch (error) {
      showToast(`Import failed: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  if (!headers) {
    return [];
  }
  return dataRows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])));
}

function normalizeImportedEntry(entry) {
  const normalized = {
    id: entry.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    createdAt: entry.createdAt || new Date().toISOString(),
    schemaVersion: Number(entry.schemaVersion || SCHEMA_VERSION)
  };

  for (const field of fields) {
    const value = entry[field.id];
    if (field.type === "checkbox") {
      normalized[field.id] = Array.isArray(value) ? value : String(value || "").split(";").map((item) => item.trim()).filter(Boolean);
    } else {
      normalized[field.id] = value == null ? "" : String(value);
    }
  }

  return normalized;
}

function loadOptionState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(OPTIONS_KEY) || "{}");
    const current = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    return mergeLegacyOptionState(current);
  } catch {
    return mergeLegacyOptionState({});
  }
}

function mergeLegacyOptionState(current) {
  const merged = { ...current };
  let changed = false;

  for (const key of LEGACY_OPTIONS_KEYS) {
    try {
      const legacy = JSON.parse(localStorage.getItem(key) || "{}");
      if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) {
        continue;
      }

      for (const field of fields) {
        const legacyOptions = legacy[field.id];
        if (!Array.isArray(legacyOptions) || !legacyOptions.length) {
          continue;
        }

        const currentOptions = Array.isArray(merged[field.id]) ? merged[field.id] : field.options || [];
        const nextOptions = uniqueOptions([...currentOptions, ...legacyOptions]);
        if (nextOptions.length !== currentOptions.length) {
          merged[field.id] = nextOptions;
          changed = true;
        }
      }
    } catch {
      // Ignore malformed legacy customization data.
    }
  }

  if (changed) {
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(merged));
  }

  return merged;
}

function applyOptionState() {
  for (const field of fields) {
    if (!field.options) {
      continue;
    }

    const savedOptions = optionState[field.id];
    if (Array.isArray(savedOptions) && savedOptions.length) {
      field.options = uniqueOptions(savedOptions, field.preserveOrder);
    } else {
      field.options = uniqueOptions(field.options, field.preserveOrder);
    }
  }
  saveOptionState();
}

function saveOptionState() {
  optionState = {};
  for (const field of fields) {
    if (field.options) {
      field.options = uniqueOptions(field.options, field.preserveOrder);
      optionState[field.id] = field.options;
    }
  }
  localStorage.setItem(OPTIONS_KEY, JSON.stringify(optionState));
}

function uniqueOptions(options, preserveOrder = false) {
  const seen = new Set();
  const unique = options
    .map((option) => String(option).trim())
    .filter((option) => {
      const key = option.toLowerCase();
      if (!option || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  if (preserveOrder) {
    return unique;
  }
  return unique.sort(sortOptions);
}

function loadEntries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
}

function setupInstallPrompt() {
  const button = document.querySelector("#installButton");
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    button.hidden = false;
  });

  button.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    button.hidden = true;
  });
}

function csvEscape(value) {
  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function topValue(values) {
  const counts = new Map();
  for (const value of values.flatMap((item) => (Array.isArray(item) ? item : [item]))) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function formatEntryValue(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function sortOptions(a, b) {
  if (a.toLowerCase() === "other") {
    return 1;
  }
  if (b.toLowerCase() === "other") {
    return -1;
  }
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function firstFilled(...values) {
  for (const value of values) {
    if (Array.isArray(value) && value.length) {
      return value.slice(0, 3).join(", ");
    }
    if (typeof value === "string" && value) {
      return value;
    }
  }
  return "";
}

function formatDate(value) {
  if (!value) {
    return "-";
  }
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
