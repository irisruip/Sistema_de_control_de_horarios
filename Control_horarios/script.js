// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Login Page
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")
  const employeeLoginForm = document.getElementById("employee-login-form")
  const adminLoginForm = document.getElementById("admin-login-form")

  // Dashboard
  const sidebarNavLinks = document.querySelectorAll(".sidebar-nav ul li a")
  const contentSections = document.querySelectorAll(".content-section")
  const logoutBtn = document.getElementById("logout-btn")
  const clockInBtn = document.getElementById("clock-in-btn")
  const clockOutBtn = document.getElementById("clock-out-btn")
  const currentTimeEl = document.getElementById("current-time")
  const currentDateEl = document.getElementById("current-date")
  const currentStatusEl = document.getElementById("current-status")
  const todayHoursEl = document.getElementById("today-hours")

  // Reports and Requests
  const newReportBtn = document.getElementById("new-report-btn")
  const newRequestBtn = document.getElementById("new-request-btn")
  const newReportForm = document.getElementById("new-report-form")
  const newRequestForm = document.getElementById("new-request-form")
  const closeBtns = document.querySelectorAll(".close-btn")
  const cancelBtns = document.querySelectorAll(".cancel-btn")

  // Calendar
  const prevMonthBtn = document.getElementById("prev-month")
  const nextMonthBtn = document.getElementById("next-month")
  const calendarMonthEl = document.getElementById("calendar-month")

  // Initialize the application
  initApp()

  // Functions
  function initApp() {
    // Set current date and time
    updateDateTime()
    setInterval(updateDateTime, 1000)

    // Add event listeners
    addEventListeners()
  }

  function addEventListeners() {
    // Login tabs
    if (tabBtns) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const tabId = btn.getAttribute("data-tab")

          // Remove active class from all tabs
          tabBtns.forEach((b) => b.classList.remove("active"))
          tabContents.forEach((c) => c.classList.remove("active"))

          // Add active class to selected tab
          btn.classList.add("active")
          document.getElementById(`${tabId}-tab`).classList.add("active")
        })
      })
    }

    // Login forms
    if (employeeLoginForm) {
      employeeLoginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const employeeId = document.getElementById("employee-id").value
        const password = document.getElementById("employee-password").value

        // Simple validation
        if (employeeId && password) {
          // In a real app, you would send this to a server for authentication
          // For demo purposes, we'll just redirect to the employee dashboard
          window.location.href = "employee-dashboard.html"
        }
      })
    }

    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const adminId = document.getElementById("admin-id").value
        const password = document.getElementById("admin-password").value

        // Simple validation
        if (adminId && password) {
          // In a real app, you would send this to a server for authentication
          // For demo purposes, we'll just redirect to the admin dashboard
          window.location.href = "admin-dashboard.html"
        }
      })
    }

    // Sidebar navigation
    if (sidebarNavLinks) {
      sidebarNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault()

          const sectionId = link.getAttribute("href").substring(1)

          // Remove active class from all links and sections
          sidebarNavLinks.forEach((l) => l.parentElement.classList.remove("active"))
          contentSections.forEach((s) => s.classList.remove("active"))

          // Add active class to selected link and section
          link.parentElement.classList.add("active")
          document.getElementById(`${sectionId}-section`).classList.add("active")
        })
      })
    }

    // Logout button
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        // In a real app, you would handle logout logic here
        window.location.href = "index.html"
      })
    }

    // Clock in/out buttons
    if (clockInBtn) {
      clockInBtn.addEventListener("click", () => {
        clockInBtn.disabled = true
        clockOutBtn.disabled = false
        currentStatusEl.textContent = "Turno iniciado"

        // Start timer for today's hours
        startWorkTimer()

        // Add to activity list
        addActivity("Iniciaste turno", "clock-in")
      })
    }

    if (clockOutBtn) {
      clockOutBtn.addEventListener("click", () => {
        clockInBtn.disabled = false
        clockOutBtn.disabled = true
        currentStatusEl.textContent = "Turno finalizado"

        // Stop timer
        stopWorkTimer()

        // Add to activity list
        addActivity("Finalizaste turno", "clock-out")
      })
    }

    // Modal forms
    if (newReportBtn) {
      newReportBtn.addEventListener("click", () => {
        newReportForm.style.display = "flex"
      })
    }

    if (newRequestBtn) {
      newRequestBtn.addEventListener("click", () => {
        newRequestForm.style.display = "flex"
      })
    }

    // Close buttons for modals
    if (closeBtns) {
      closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const modal = btn.closest(".modal")
          modal.style.display = "none"
        })
      })
    }

    if (cancelBtns) {
      cancelBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const modal = btn.closest(".modal")
          modal.style.display = "none"
        })
      })
    }

    // Calendar navigation
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener("click", () => {
        // In a real app, you would update the calendar here
        alert("Navigate to previous month")
      })
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener("click", () => {
        // In a real app, you would update the calendar here
        alert("Navigate to next month")
      })
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none"
      }
    })
  }

  // Timer variables
  let workTimer
  let workSeconds = 0

  function startWorkTimer() {
    workTimer = setInterval(() => {
      workSeconds++
      updateWorkTime()
    }, 1000)
  }

  function stopWorkTimer() {
    clearInterval(workTimer)
  }

  function updateWorkTime() {
    const hours = Math.floor(workSeconds / 3600)
    const minutes = Math.floor((workSeconds % 3600) / 60)
    todayHoursEl.textContent = `${hours}h ${minutes}m`
  }

  function updateDateTime() {
    const now = new Date()

    // Update time
    if (currentTimeEl) {
      currentTimeEl.textContent = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    // Update date
    if (currentDateEl) {
      currentDateEl.textContent = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
  }

  function addActivity(description, type) {
    const activityList = document.querySelector(".activity-list")
    if (!activityList) return

    const now = new Date()
    const timeString = now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const activityItem = document.createElement("li")
    activityItem.className = "activity-item"
    activityItem.innerHTML = `
            <div class="activity-icon ${type}">
                <span class="material-symbols-outlined">${type === "clock-in" ? "login" : type === "clock-out" ? "logout" : "description"}</span>
            </div>
            <div class="activity-details">
                <p class="activity-description">${description}</p>
                <p class="activity-time">Hoy, ${timeString}</p>
            </div>
        `

    // Insert at the beginning of the list
    activityList.insertBefore(activityItem, activityList.firstChild)
  }
})

