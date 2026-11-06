const storageKey = "buffalo-chicken-burgers";
const state = JSON.parse(localStorage.getItem(storageKey) || "{}");
const persist = () => localStorage.setItem(storageKey, JSON.stringify(state));

// Ingredient checkboxes
document.querySelectorAll(".ingredients input").forEach((box, i) => {
  box.checked = Boolean(state.ingredients?.[i]);
  box.addEventListener("change", () => {
    state.ingredients = { ...state.ingredients, [i]: box.checked };
    persist();
  });
});

// Click a step to mark it done
document.querySelectorAll(".instructions li").forEach((step, i) => {
  step.classList.toggle("done", Boolean(state.steps?.[i]));
  step.addEventListener("click", () => {
    const done = step.classList.toggle("done");
    state.steps = { ...state.steps, [i]: done };
    persist();
  });
});

// Save button
const saveBtn = document.querySelector(".save");
const renderSave = () => {
  saveBtn.classList.toggle("saved", Boolean(state.saved));
  saveBtn.textContent = state.saved ? "♥ SAVED" : "♡ SAVE";
};
saveBtn.addEventListener("click", () => {
  state.saved = !state.saved;
  persist();
  renderSave();
});
renderSave();

// Star rating
const stars = document.querySelectorAll(".stars button");
const renderStars = () =>
  stars.forEach((s, i) => s.classList.toggle("on", i < (state.rating || 0)));
stars.forEach((star, i) => {
  star.addEventListener("click", () => {
    state.rating = i + 1;
    persist();
    renderStars();
  });
});
renderStars();

// Print
document.querySelector(".print").addEventListener("click", () => window.print());
