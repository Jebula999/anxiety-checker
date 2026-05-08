const STORAGE_KEY = "anxiety-checker-entries-v1";
const OPTIONS_KEY = "anxiety-checker-options-v1";
const SCHEMA_VERSION = 1;

const formSections = [
  {
    title: "Basic Details",
    fields: [
      { id: "date", label: "Date of panic attack", type: "date", required: true },
      {
        id: "duration",
        label: "Approximate duration",
        type: "radio",
        options: ["Less than 5 minutes", "5-10 minutes", "10-20 minutes", "20-30 minutes", "30-60 minutes", "More than 1 hour", "Not sure"]
      },
      { id: "intensity", label: "Intensity at peak", type: "range", min: 0, max: 10, hint: "0 = none, 10 = unbearable" },
      { id: "where", label: "Where was I?", type: "radio", options: ["Home", "Work / school", "Car / transport", "Shop / public place", "Social setting", "Bed / trying to sleep", "Online / phone call", "Other"] },
      { id: "alone", label: "Was I alone?", type: "radio", options: ["Alone", "With family", "With friends", "With colleagues / classmates", "Around strangers", "Other"] },
      { id: "onset", label: "Did it feel sudden or gradual?", type: "radio", options: ["Came out of nowhere", "Built up slowly", "Started after a clear trigger", "Not sure"] }
    ]
  },
  {
    title: "Physical Symptoms",
    fields: [
      { id: "heartChestSymptoms", label: "Heart / chest symptoms", type: "checkbox", options: ["Racing heart", "Pounding heartbeat", "Chest tightness", "Chest pain / discomfort", "Feeling like my heart skipped beats", "Pressure in chest", "None of these"] },
      { id: "breathingSymptoms", label: "Breathing symptoms", type: "checkbox", options: ["Shortness of breath", "Breathing too fast", "Feeling like I could not get enough air", "Choking sensation", "Tight throat", "Heavy sighing / needing deep breaths", "None of these"] },
      { id: "headBalanceSymptoms", label: "Head / balance symptoms", type: "checkbox", options: ["Dizziness", "Light-headedness", "Feeling faint", "Blurry vision", "Head pressure", "Headache", "Feeling detached from my body", "Feeling like the world was unreal or dreamlike", "None of these"] },
      { id: "stomachSymptoms", label: "Stomach / digestion symptoms", type: "checkbox", options: ["Nausea", "Stomach cramps", "Urgent need for toilet", "Loss of appetite", "Dry mouth", "Acid reflux / burning sensation", "Tight stomach", "None of these"] },
      { id: "bodySensations", label: "Body sensations", type: "checkbox", options: ["Shaking", "Trembling", "Sweating", "Hot flushes", "Chills", "Tingling", "Numbness", "Muscle tension", "Weak legs", "Restlessness", "Feeling frozen / unable to move normally", "None of these"] }
    ]
  },
  {
    title: "Thoughts During the Attack",
    fields: [
      { id: "thoughts", label: "What thoughts did I have during the panic attack?", type: "checkbox", options: ["Something is seriously wrong with me", "I might faint", "I might lose control", "I need to escape", "People will notice", "I am embarrassing myself", "I cannot handle this", "This will not stop", "I am trapped", "I am not safe", "I need someone to help me immediately", "I need to check my body / symptoms", "I need reassurance", "I do not know what triggered this", "My thoughts were racing too fast to identify", "I felt blank or numb rather than panicked", "None of these"] }
    ]
  },
  {
    title: "Emotions",
    fields: [
      { id: "emotions", label: "What emotions were present?", type: "checkbox", options: ["Fear", "Dread", "Shame", "Embarrassment", "Frustration", "Anger", "Sadness", "Helplessness", "Confusion", "Disconnection", "Overwhelm", "Irritability", "Guilt", "Numbness", "Nothing / no clear emotion", "Other"] }
    ]
  },
  {
    title: "What Was Happening Before",
    fields: [
      { id: "beforeAttack", label: "In the 30 minutes before the attack, was I:", type: "checkbox", options: ["In an argument", "Thinking about something stressful", "Feeling physically unwell", "Tired", "Hungry", "Dehydrated", "Overstimulated by noise / lights / crowds", "Under pressure", "Running late", "Socially uncomfortable", "Feeling trapped or unable to leave", "Doing something important", "Waiting for something", "Trying to sleep", "Waking up", "Scrolling online", "After caffeine / energy drinks", "After intense exercise", "After little sleep", "After a major change or stressful event", "Nothing obvious was happening", "Other"] }
    ]
  },
  {
    title: "Situational Triggers",
    fields: [
      { id: "situationalTriggers", label: "Do panic attacks happen more often in or around:", type: "checkbox", options: ["Crowds", "Queues", "Shops", "Restaurants", "Classrooms / meetings", "Work pressure", "Social events", "Conflict", "Being watched / judged", "Driving", "Public transport", "Being far from home", "Being alone", "Being with certain people", "Medical appointments", "Physical symptoms", "Exercise", "Sleep / bedtime", "Waking up", "After eating", "After caffeine", "During silence / downtime", "When I cannot leave easily", "When I feel responsible for something", "When plans change suddenly", "Other", "No clear situational trigger"] }
    ]
  },
  {
    title: "Internal Triggers",
    fields: [
      { id: "internalTriggers", label: "Did any internal trigger seem to start or worsen the panic?", type: "checkbox", options: ["Fast heartbeat", "Feeling dizzy", "Feeling short of breath", "Stomach discomfort", "Feeling hot", "Feeling tired", "Feeling trapped", "Feeling judged", "Feeling uncertain", "Feeling like I disappointed someone", "Thinking about health", "Thinking about school / work", "Thinking about relationships", "Thinking about money / future", "Remembering something stressful", "Feeling like I have too much to do", "Feeling like I have no control", "Not knowing why I feel anxious", "Other", "No clear internal trigger"] }
    ]
  },
  {
    title: "What I Did During the Attack",
    fields: [
      { id: "duringAttackActions", label: "What did I do during the panic attack?", type: "checkbox", options: ["Left the situation", "Tried to stay but wanted to leave", "Asked someone for reassurance", "Called / texted someone", "Checked my pulse / breathing / body", "Googled symptoms", "Sat or lay down", "Walked around", "Froze", "Cried", "Tried breathing exercises", "Used grounding techniques", "Distracted myself with phone / TV / music", "Drank water", "Went outside", "Avoided talking", "Talked a lot", "Tried to hide it from others", "Took prescribed medication", "Other"] }
    ]
  },
  {
    title: "Avoidance / Safety Behaviours",
    fields: [
      { id: "avoidanceSafety", label: "After panic attacks, do I avoid or rely on anything?", type: "checkbox", options: ["Avoid going out alone", "Avoid crowds", "Avoid exercise", "Avoid caffeine", "Avoid driving", "Avoid public transport", "Avoid social events", "Avoid certain places", "Avoid conflict", "Avoid being far from home", "Avoid being without my phone", "Need to sit near exits", "Need to know where bathrooms are", "Need someone with me", "Need water with me", "Need medication with me", "Need to check my body often", "Need reassurance from others", "Cancel plans because I fear panic", "Leave situations early", "Other", "None of these"] }
    ]
  },
  {
    title: "Frequency and Pattern",
    fields: [
      { id: "recentFrequency", label: "How often have I been having panic attacks recently?", type: "radio", options: ["Daily", "Several times a week", "Weekly", "A few times a month", "Monthly", "Rarely", "Unclear"] },
      { id: "timePattern", label: "Are they more likely at certain times?", type: "checkbox", options: ["Morning", "Afternoon", "Evening", "Night", "During sleep / waking up", "Weekdays", "Weekends", "Before specific events", "After stressful events", "No clear pattern", "Other"] },
      { id: "worryAboutAnother", label: "Do I worry about having another panic attack?", type: "radio", options: ["Not really", "Sometimes", "Often", "Most days", "It affects my plans"] }
    ]
  },
  {
    title: "After-Effects",
    fields: [
      { id: "afterEffects", label: "After the panic attack, I usually feel:", type: "checkbox", options: ["Exhausted", "Embarrassed", "Relieved", "Tearful", "Shaky", "Angry", "Low mood", "Numb", "Confused", "Hyper-alert", "Worried it will happen again", "Physically drained", "Need to sleep", "Need to be alone", "Need reassurance", "Fine quite quickly", "Other"] },
      { id: "recoveryTime", label: "How long does it take to feel normal again?", type: "radio", options: ["Minutes", "Less than an hour", "A few hours", "Rest of the day", "Next day or longer"] }
    ]
  },
  {
    title: "Possible Themes for Therapy",
    fields: [
      { id: "therapyThemes", label: "Which themes feel relevant?", type: "checkbox", options: ["Health anxiety / fear of body symptoms", "Fear of embarrassment", "Fear of losing control", "Fear of being trapped", "Fear of conflict", "Fear of disappointing people", "Fear of being judged", "Difficulty saying no", "Perfectionism", "Work / school pressure", "Social pressure", "Family stress", "Relationship stress", "Past stressful experiences", "Sleep issues", "Caffeine sensitivity", "Overstimulation", "General burnout", "Not knowing what I feel until it becomes physical", "I am scared of the panic itself", "Other", "Not sure"] },
      { id: "notes", label: "Private notes", type: "textarea", hint: "Optional extra context." }
    ]
  }
];

const fields = formSections.flatMap((section) => section.fields);
let optionState = loadOptionState();
applyOptionState();
let entries = loadEntries();
let draft = createEmptyDraft();
let currentStep = 0;
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
  data.intensity = "5";
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
  actions.innerHTML = `
    <button class="secondary" id="backButton" type="button"${currentStep === 0 ? " disabled" : ""}>Back</button>
    <button class="primary" id="nextButton" type="button">${currentStep === formSections.length - 1 ? "Submit" : "Next"}</button>
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

  if (field.type === "date" || field.type === "textarea") {
    const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
    input.id = field.id;
    input.name = field.id;
    input.value = draft[field.id] || "";
    if (field.type === "date") {
      input.type = "date";
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
    const checked = field.type === "checkbox" ? draft[field.id].includes(option) : draft[field.id] === option;
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

function saveEntry() {
  if (!draft.date) {
    showToast("Please add a date before submitting.");
    currentStep = 0;
    renderStep();
    return;
  }

  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    ...structuredClone(draft)
  };

  entries.unshift(entry);
  persistEntries();
  draft = createEmptyDraft();
  currentStep = 0;
  renderStep();
  renderRecords();
  switchView("records");
  showToast("Entry saved.");
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

  const intensities = entries.map((entry) => Number(entry.intensity)).filter((value) => !Number.isNaN(value));
  const averageIntensity = intensities.length ? (intensities.reduce((sum, value) => sum + value, 0) / intensities.length).toFixed(1) : "-";
  const latest = entries[0];
  const topWhere = topValue(entries.map((entry) => entry.where).filter(Boolean));

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
    const tags = [entry.duration, entry.where, `Peak ${entry.intensity}/10`].filter(Boolean);
    card.innerHTML = `
      <div class="record-title">
        <span>${escapeHtml(formatDate(entry.date))}</span>
        <span class="record-meta">${escapeHtml(entry.onset || "")}</span>
      </div>
      <div class="record-meta">${escapeHtml(firstFilled(entry.thoughts, entry.emotions, entry.beforeAttack) || "No details selected")}</div>
      <div class="pill-row">${tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="record-actions">
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
        currentStep = 0;
        renderStep();
        switchView("entry");
        showToast("Entry copied into the form.");
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

  const headers = ["id", "createdAt", "schemaVersion", ...fields.map((field) => field.id)];
  const rows = entries.map((entry) => headers.map((header) => csvEscape(Array.isArray(entry[header]) ? entry[header].join("; ") : entry[header] ?? "")).join(","));
  downloadFile(`anxiety-checker-${todayStamp()}.csv`, [headers.join(","), ...rows].join("\n"), "text/csv");
}

function exportJson() {
  if (!entries.length) {
    showToast("No entries to export.");
    return;
  }

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
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function applyOptionState() {
  for (const field of fields) {
    if (!field.options) {
      continue;
    }

    const savedOptions = optionState[field.id];
    if (Array.isArray(savedOptions) && savedOptions.length) {
      field.options = uniqueOptions(savedOptions);
    } else {
      field.options = uniqueOptions(field.options);
    }
  }
  saveOptionState();
}

function saveOptionState() {
  optionState = {};
  for (const field of fields) {
    if (field.options) {
      optionState[field.id] = uniqueOptions(field.options);
    }
  }
  localStorage.setItem(OPTIONS_KEY, JSON.stringify(optionState));
}

function uniqueOptions(options) {
  const seen = new Set();
  return options
    .map((option) => String(option).trim())
    .filter((option) => {
      const key = option.toLowerCase();
      if (!option || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
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
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
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
