// The-end.js
const heart = "💖💖💖💖💖";
console.log("Current status: " + heart);

// Splitting up
const pieces = heart.split("💖");
const leftShard = pieces.slice(0, 3).join("");
const rightShard = pieces.slice(3).join("");

console.log("Left side: " + leftShard);
console.log("Right side: " + rightShard);

// Clearing feelings cache
try {
  localStorage.clear();
  sessionStorage.removeItem("shared_memories");
  throw new Error("TypeError: Cannot read properties of ex, undefined reading 'love'");
} catch (pain) {
  console.error("Heartbreak caught: ", pain.message);
} finally {
  console.log("Process complete. Entering infinite healing loop...");
}
