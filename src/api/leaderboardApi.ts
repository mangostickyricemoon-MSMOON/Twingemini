export async function saveScore(name: string, time: number) {
  await fetch("https://script.google.com/macros/s/AKfycbzuXS1ydiHLnuu73fxj_2qFy3T47C0ych3qX6n6zyvr4pkWVXuWUxZVuwcAjBMRHf7yCQ/exec", {
    method: "POST",
    body: JSON.stringify({ name, time }),
    headers: { "Content-Type": "application/json" }
  });
}

export async function loadLeaderboard() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzuXS1ydiHLnuu73fxj_2qFy3T47C0ych3qX6n6zyvr4pkWVXuWUxZVuwcAjBMRHf7yCQ/exec");
  return await res.json();
}
