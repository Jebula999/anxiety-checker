const STORAGE_KEY = "anxiety-checker-entries-v1";
const OPTIONS_KEY = "anxiety-checker-options-v4";
const LEGACY_OPTIONS_KEYS = [];
const SCHEMA_VERSION = 1;

const formSections = [
  {
    title: "When It Happened",
    fields: [
      { id: "date", label: "Date of panic attack", type: "date", required: true },
      { id: "time", label: "Approximate time", type: "time" },
      {
        id: "duration",
        label: "Approximate duration",
        type: "checkbox",
        options: ["Less than 5 minutes", "5-10 minutes", "10-20 minutes", "20-30 minutes", "30-60 minutes", "More than 1 hour", "Not sure"]
      },
      { id: "intensity", label: "Intensity at peak", type: "range", min: 0, max: 10, hint: "0 = none, 10 = unbearable" },
      { id: "onset", label: "Did it feel sudden or gradual?", type: "checkbox", options: ["Built up slowly", "Came out of nowhere", "Not sure", "Started after a clear trigger"] }
    ]
  },
  {
    title: "Before: Location",
    fields: [
      { id: "beforeLocation", label: "Where were you before the episode started?", type: "checkbox", options: ["Bed", "Cafe", "Car", "Home", "Mall", "Medical setting", "Office", "Online", "Outdoors", "Phone call", "Public transport", "Restaurant", "Shop", "Social setting", "Work", "Other"] }
    ]
  },
  {
    title: "Before: Activity",
    fields: [
      { id: "beforeActivity", label: "What were you doing before it started?", type: "checkbox", options: ["Doing chores", "Driving", "Eating", "Exercising", "In a meeting", "Nothing obvious", "Resting", "Scrolling online", "Shopping", "Talking to someone", "Travelling", "Trying to sleep", "Waiting for something", "Waking up", "Working", "Other"] }
    ]
  },
  {
    title: "Before: Company",
    fields: [
      { id: "beforeCompany", label: "Who were you with when it started?", type: "checkbox", options: ["Alone", "Colleagues", "Family", "Friends", "Online with someone", "On a call with someone", "Partner", "Strangers nearby", "Other"] }
    ]
  },
  {
    title: "Before: State",
    fields: [
      { id: "beforeState", label: "What was your state before it started?", type: "checkbox", options: ["After caffeine", "After energy drink", "After little sleep", "Calm", "Dehydrated", "Disconnected", "Hungry", "Irritable", "Numb", "Overstimulated", "Physically unwell", "Running late", "Sad", "Socially uncomfortable", "Stressed", "Tired", "Trapped", "Unable to leave", "Under pressure", "Other"] }
    ]
  },
  {
    title: "Start",
    fields: [
      { id: "startTriggers", label: "What seemed to start it?", type: "checkbox", options: ["Being unable to leave", "Bright lights", "Chest sensation", "Conflict", "Crowds", "Dizziness", "Fast heartbeat", "Feeling hot", "Feeling judged", "Future worry", "Health worry", "I do not know", "Loud noise", "Money worry", "Relationship worry", "Remembering something stressful", "Shortness of breath", "Stomach discomfort", "Work worry", "Other"] }
    ]
  },
  {
    title: "Worsening",
    fields: [
      { id: "worseningFactors", label: "What seemed to make it worse?", type: "checkbox", options: ["Being unable to leave", "Bright lights", "Checking symptoms", "Chest sensation", "Conflict", "Crowds", "Dizziness", "Fast heartbeat", "Feeling hot", "Feeling judged", "Future worry", "Health worry", "I do not know", "Loud noise", "Money worry", "Relationship worry", "Remembering something stressful", "Shortness of breath", "Stomach discomfort", "Work worry", "Other"] }
    ]
  },
  {
    title: "During: Location",
    fields: [
      { id: "duringLocation", label: "Where were you during the worst part?", type: "checkbox", options: ["Bathroom", "Bedroom", "Car", "Office", "Outside", "Public place", "Public transport", "Quiet room", "Same place as before", "Shop", "Someone else's home", "Work", "Other"] }
    ]
  },
  {
    title: "During: Company",
    fields: [
      { id: "duringCompany", label: "Who was with you during the worst part?", type: "checkbox", options: ["Alone", "Colleagues", "Family", "Friends", "Online with someone", "On a call with someone", "Partner", "Strangers nearby", "Other"] }
    ]
  },
  {
    title: "During: Physical Symptoms",
    fields: [
      { id: "physicalSymptoms", label: "Physical symptoms during the episode", type: "checkbox", options: ["Blurry vision", "Chest discomfort", "Chest pain", "Chest tightness", "Chills", "Detached from body", "Dizziness", "Dreamlike feeling", "Dry mouth", "Hot flushes", "Light-headedness", "Muscle tension", "Nausea", "None of these", "Numbness", "Pounding heartbeat", "Racing heart", "Shaking", "Shortness of breath", "Stomach cramps", "Sweating", "Tight throat", "Tingling", "Trembling", "Weak legs", "Other"] }
    ]
  },
  {
    title: "During: Thoughts",
    fields: [
      { id: "thoughts", label: "What thoughts did you have during the episode?", type: "checkbox", options: ["I am embarrassing myself", "I am not safe", "I am trapped", "I cannot handle this", "I felt blank or numb", "I might faint", "I might lose control", "I need help immediately", "I need reassurance", "I need to check my body", "I need to check symptoms", "I need to escape", "My thoughts were racing", "None of these", "People will notice", "Something is seriously wrong with me", "This will not stop"] }
    ]
  },
  {
    title: "During: Emotions",
    fields: [
      { id: "emotions", label: "What emotions were present during the episode?", type: "checkbox", options: ["Anger", "Confusion", "Disconnection", "Dread", "Embarrassment", "Fear", "Frustration", "Guilt", "Helplessness", "Irritability", "No clear emotion", "Numbness", "Other", "Overwhelm", "Sadness", "Shame"] }
    ]
  },
  {
    title: "During: Actions",
    fields: [
      { id: "duringActions", label: "What did you do during the episode?", type: "checkbox", options: ["Asked for reassurance", "Called someone", "Checked body symptoms", "Checked breathing", "Checked pulse", "Cried", "Distracted myself", "Drank water", "Froze", "Googled symptoms", "Lay down", "Left the situation", "Sat down", "Stayed where I was", "Texted someone", "Took prescribed medication", "Tried breathing exercises", "Tried to hide it", "Tried to stay but wanted to leave", "Used grounding techniques", "Walked around", "Went outside", "Other"] }
    ]
  },
  {
    title: "After: Felt and Recovery",
    fields: [
      { id: "afterEffects", label: "After the panic attack, I felt:", type: "checkbox", options: ["Angry", "Confused", "Embarrassed", "Exhausted", "Fine quite quickly", "Hyper-alert", "Low mood", "Needed reassurance", "Needed sleep", "Needed to be alone", "Numb", "Other", "Physically drained", "Relieved", "Shaky", "Tearful", "Worried it would happen again"] },
      { id: "recoveryTime", label: "How long did it take to feel normal again?", type: "checkbox", options: ["A few hours", "Less than an hour", "Minutes", "Next day or longer", "Not sure", "Rest of the day"] }
    ]
  },
  {
    title: "After: Location and Actions",
    fields: [
      { id: "afterLocation", label: "Where were you after the episode?", type: "checkbox", options: ["Bathroom", "Bedroom", "Car", "Home", "Office", "Outside", "Public place", "Quiet room", "Same place as before", "Someone else's home", "Work", "Other"] },
      { id: "afterActions", label: "What did you do after the episode?", type: "checkbox", options: ["Ate something", "Called someone", "Cancelled remaining plans", "Changed clothes", "Checked symptoms again", "Continued with plans", "Drank water", "Journaled", "Listened to music", "Listened to podcast", "Looked up symptoms online", "Made notes", "Made tea", "Made a calming drink", "Sat alone", "Scrolled on phone", "Showered", "Stayed near someone", "Texted someone", "Told someone what happened", "Unpacked", "Washed face", "Watched TV", "Watched videos", "Went somewhere quiet", "Went to bed", "Other"] }
    ]
  },
  {
    title: "Notes",
    fields: [
      { id: "notes", label: "Notes for therapy", type: "textarea", notesOnly: true, hint: "Optional. These are excluded from CSV and available through Export Notes." }
    ]
  }
];

const fields = formSections.flatMap((section) => section.fields);
const questionnaireFields = fields.filter((field) => !field.notesOnly);
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

  const intensities = entries.map((entry) => Number(entry.intensity)).filter((value) => !Number.isNaN(value));
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
    const tags = [formatEntryValue(entry.duration), formatEntryValue(entry.beforeLocation || entry.where), `Peak ${entry.intensity}/10`].filter(Boolean);
    card.innerHTML = `
      <div class="record-title">
        <span>${escapeHtml(formatDate(entry.date))}</span>
        <span class="record-meta">${escapeHtml(formatEntryValue(entry.onset) || "")}</span>
      </div>
      <div class="record-meta">${escapeHtml(firstFilled(entry.thoughts, entry.emotions, entry.beforeState, entry.beforeAttack) || "No details selected")}</div>
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
  document.querySelector("#exportNotesButton").addEventListener("click", exportNotes);
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

function exportNotes() {
  const notes = entries
    .filter((entry) => String(entry.notes || "").trim())
    .map((entry) => {
      const parts = [
        `Date: ${formatDate(entry.date)}`,
        entry.time ? `Time: ${entry.time}` : "",
        entry.beforeLocation ? `Before location: ${formatEntryValue(entry.beforeLocation)}` : "",
        entry.afterLocation ? `After location: ${formatEntryValue(entry.afterLocation)}` : "",
        "",
        entry.notes.trim()
      ].filter((part) => part !== "");
      return parts.join("\n");
    });

  if (!notes.length) {
    showToast("No notes to export.");
    return;
  }

  downloadFile(`anxiety-checker-notes-${todayStamp()}.txt`, notes.join("\n\n---\n\n"), "text/plain");
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
      field.options = uniqueOptions(field.options);
      optionState[field.id] = field.options;
    }
  }
  localStorage.setItem(OPTIONS_KEY, JSON.stringify(optionState));
}

function uniqueOptions(options) {
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
