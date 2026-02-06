const API_BASE = "http://localhost:5000";

// HOME: Announcements
async function loadAnnouncements() {
  const el = document.getElementById("announcements");
  if (!el) return;

  try {
    const res = await fetch(`${API_BASE}/api/announcements`);
    const items = await res.json();

    el.innerHTML = items.map(a => `
      <div class="card">
        <h3>${a.title}</h3>
        <p>${a.body}</p>
        <small>${new Date(a.created_at).toLocaleString()}</small>
      </div>
    `).join("");
  } catch (e) {
    el.innerHTML = `<p>Failed to load announcements.</p>`;
  }
}

// DEPARTMENTS
async function loadDepartments() {
  const el = document.getElementById("departmentsList");
  if (!el) return;

  try {
    const res = await fetch(`${API_BASE}/api/departments`);
    const items = await res.json();

    el.innerHTML = items.map(d => `
      <div class="card">
        <h3>${d.name}</h3>
        <p>${d.description || ""}</p>
        <p><b>HOD:</b> ${d.head || "—"}</p>
      </div>
    `).join("");
  } catch (e) {
    el.innerHTML = `<p>Failed to load departments.</p>`;
  }
}

// ADMISSIONS
async function loadAdmissions() {
  const el = document.getElementById("admissionsList");
  if (!el) return;

  try {
    const res = await fetch(`${API_BASE}/api/admissions`);
    const items = await res.json();

    el.innerHTML = items.map(a => `
      <div class="card">
        <h3>${a.program}</h3>
        <p>${a.requirement}</p>
        <p><b>Deadline:</b> ${a.deadline ? new Date(a.deadline).toLocaleDateString() : "—"}</p>
      </div>
    `).join("");
  } catch (e) {
    el.innerHTML = `<p>Failed to load admissions.</p>`;
  }
}

// CONTACT FORM
async function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      status.textContent = "✅ Message sent!";
      form.reset();
    } catch (err) {
      status.textContent = "❌ " + err.message;
    }
  });
}

// Auto-run on all pages
loadAnnouncements();
loadDepartments();
loadAdmissions();
setupContactForm();
