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
  const username = document.getElementById("username").value;
  const resultDiv = document.getElementById("result");

  if (!username) {
    resultDiv.innerHTML = "Please enter a username";
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    if (data.message === "Not Found") {
      resultDiv.innerHTML = "User not found ❌";
      return;
    }

    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <h3>${data.name || "No Name"}</h3>
      <p>${data.bio || "No bio available"}</p>
      <p>Followers: ${data.followers}</p>
      <a href="${data.html_url}" target="_blank">View Profile</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data";
  }
}