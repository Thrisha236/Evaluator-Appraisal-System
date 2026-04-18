import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import { facultyList } from "../dummyData";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const totalFaculty = facultyList.length;
  const evaluated = facultyList.filter((f) => f.submitted).length;
  const pending = facultyList.filter((f) => !f.submitted).length;
  const departments = ["All", ...new Set(facultyList.map((f) => f.department))];

  const filtered = facultyList.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || f.department === deptFilter;
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Pending" && !f.submitted) ||
      (statusFilter === "Evaluated" && f.submitted);
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Welcome, Evaluator A</h2>
            <p>Chaitanya Bharathi Institute of Technology — Performance Appraisal 2025–26</p>
          </div>
          <div className="welcome-badge">
            <span className="badge-number">{totalFaculty}</span>
            <span className="badge-label">Assigned Faculty</span>
          </div>
        </div>

        <div className="stats-grid">
          <Card title="Total Faculty" value={totalFaculty} iconEmoji="👥" colorClass="blue" />
          <Card title="Evaluated" value={evaluated} iconEmoji="✅" colorClass="green" />
          <Card title="Pending" value={pending} iconEmoji="⏳" colorClass="orange" />
        </div>

        <div className="section-header">
          <span className="section-title">Faculty List</span>
          <span className="section-count">{filtered.length} faculty</span>
        </div>

        <div className="filters-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Evaluated">Evaluated</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="empty-state">No faculty records found.</td></tr>
              ) : (
                filtered.map((f) => (
                  <tr key={f.id}>
                    <td style={{ fontFamily: "monospace", color: "#7a1a1a", fontWeight: 600 }}>{f.id}</td>
                    <td style={{ fontWeight: 500 }}>{f.name}</td>
                    <td>{f.designation}</td>
                    <td style={{ color: "#555" }}>{f.department}</td>
                    <td>
                      {f.submitted
                        ? <span className="status-badge status-evaluated">✓ Evaluated</span>
                        : <span className="status-badge status-pending">⏳ Pending</span>
                      }
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{ padding: "5px 14px", fontSize: "12px" }}
                        onClick={() => navigate("/evaluate", { state: { facultyId: f.id } })}
                      >
                        {f.submitted ? "View / Edit" : "Evaluate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;