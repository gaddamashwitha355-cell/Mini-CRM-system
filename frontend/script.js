document
.getElementById("leadForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        source: document.getElementById("source").value

    };

    const response = await fetch(
        "http://localhost:5000/leads",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    document.getElementById("leadForm").reset();

    loadLeads();

});


// UPDATE STATUS

async function updateStatus(id, status) {

    await fetch(
        `http://localhost:5000/leads/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ status })
        }
    );

    loadLeads();

}


// UPDATE NOTES

async function updateNotes(id, notes) {

    await fetch(
        `http://localhost:5000/leads/${id}/notes`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ notes })
        }
    );

}


// DELETE LEAD

async function deleteLead(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this lead?");

    if (!confirmDelete) {
        return;
    }

    await fetch(
        `http://localhost:5000/leads/${id}`,
        {
            method: "DELETE"
        }
    );

    loadLeads();

}


// LOAD LEADS

async function loadLeads() {

    const response =
        await fetch("http://localhost:5000/leads");

    const leads =
        await response.json();

    const tbody =
        document.querySelector("#leadsTable tbody");

    tbody.innerHTML = "";

    leads.forEach(lead => {

        tbody.innerHTML += `

        <tr>

            <td>${lead.id}</td>

            <td>${lead.name}</td>

            <td>${lead.email}</td>

            <td>${lead.source}</td>

            <td>

                <select onchange="updateStatus(${lead.id}, this.value)">

                    <option value="New"
                    ${lead.status === "New" ? "selected" : ""}>
                    New
                    </option>

                    <option value="Contacted"
                    ${lead.status === "Contacted" ? "selected" : ""}>
                    Contacted
                    </option>

                    <option value="Converted"
                    ${lead.status === "Converted" ? "selected" : ""}>
                    Converted
                    </option>

                </select>

            </td>

            <td>

                <textarea
                onchange="updateNotes(${lead.id}, this.value)"
                rows="2"
                cols="20">${lead.notes || ""}</textarea>

            </td>

            <td>

                <button onclick="deleteLead(${lead.id})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

    // Dashboard Statistics

    document.getElementById("total").innerText =
        leads.length;

    document.getElementById("new").innerText =
        leads.filter(
            lead => lead.status === "New"
        ).length;

    document.getElementById("contacted").innerText =
        leads.filter(
            lead => lead.status === "Contacted"
        ).length;

    document.getElementById("converted").innerText =
        leads.filter(
            lead => lead.status === "Converted"
        ).length;

}


// SEARCH LEADS

function searchLeads() {

    const searchText =
        document.getElementById("search")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll(
            "#leadsTable tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(searchText)
                ? ""
                : "none";

    });

}


// FILTER LEADS

document
.getElementById("filterStatus")
.addEventListener("change", filterLeads);

function filterLeads() {

    const status =
        document.getElementById("filterStatus").value;

    const rows =
        document.querySelectorAll(
            "#leadsTable tbody tr"
        );

    rows.forEach(row => {

        const rowStatus =
            row.querySelector("select").value;

        if (
            status === "All" ||
            rowStatus === status
        ) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }

    });

}


// INITIAL LOAD

loadLeads();