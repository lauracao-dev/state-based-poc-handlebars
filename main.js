import "./style.css";
import { watchEffect, computed } from "vue";
import {
  useStorage,
  useActiveElement,
  useToggle,
  useAsyncState,
} from "@vueuse/core";
import Handlebars from "handlebars";

/*
  |--------------------------------------------------------------------------
  | STATE-BASED LOGIC (can be copied directly to a Vue.js project)
  |--------------------------------------------------------------------------
*/

// simple toggle composable
const [showCounter, toggle] = useToggle(true);

// reactive ref being loaded from local storage
const count = useStorage("my-count", 0);

// computeds
const toggleText = computed(() => `Show counter: ${showCounter.value}`);
const countText = computed(() => `Current count: ${count.value}`);
const doubleCountText = computed(() => `Double count: ${count.value * 2}`);

// composable that gives us reactive state based on async function
const { state, isReady, isLoading } = useAsyncState(async () => {
  await new Promise((r) => setTimeout(r, 2000));
  return "State based POC - Handlebars";
}, "Loading title...");

// composable that detects active element
const activeElement = useActiveElement();
const activeElementText = computed(
  () => `Current active element tag: ${activeElement.value?.tagName || "null"}`
);

function handleIncreaseCountClick() {
  count.value = count.value + 1;
}

/*
  |--------------------------------------------------------------------------
  | RENDERER - typical thing that Vue would do for us automatically
  |--------------------------------------------------------------------------
*/

const template = document.getElementById("app-template").innerHTML;
const compiler = Handlebars.compile(template);

// watchEffect tracks all its reactive dependencies automatically and executes the function when any of them change
watchEffect(() => {
  const appEl = document.getElementById("app");
  appEl.innerHTML = compiler({
    title: state.value,
    showCounter: showCounter.value,
    showCounterStyle: `display:${showCounter.value ? "block" : "none"}`,
    toggleText: toggleText.value,
    countText: countText.value,
    doubleCountText: doubleCountText.value,
    activeElementText: activeElementText.value,
  });

  const toggleEl = appEl.querySelector("#toggle");
  toggleEl.checked = showCounter.value;
  toggleEl.onclick = () => toggle();

  const counterEl = document.getElementById("counter");
  counterEl.onclick = handleIncreaseCountClick;
});
