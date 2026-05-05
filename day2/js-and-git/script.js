const toggleBtn = document.getElementById("darkToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});


async function getUser() {
  const usernameInput = document.getElementById("username");
  const resultDiv = document.getElementById("result");

  const username = usernameInput.value.trim();

  if (!username) {
    resultDiv.innerHTML = "Please enter a username";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    if (!res.ok) {
      resultDiv.innerHTML = `Error: ${data.message}`;
      return;
    }

    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <h3>${data.name || data.login}</h3>
      <p>${data.bio || "No bio available"}</p>
      <p>Followers: ${data.followers ?? 0}</p>
      <a href="${data.html_url}" target="_blank">View Profile</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data";
  }
}