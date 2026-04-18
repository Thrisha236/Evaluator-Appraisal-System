import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { facultyList } from "../dummyData";

// ─── PART A ──────────────────────────────────────────────────────────────────
function PartA({ data }) {
  return (
    <div>
      <div className="part-header">
        <div className="part-title">Part A</div>
        <div className="part-subtitle">Faculty Information — Academic Year 2025–26 &nbsp;|&nbsp; A.1 – A.9</div>
      </div>
      <div className="info-note">ℹ️ This section is view-only. Data is pre-filled from faculty records.</div>

      <div className="info-card">
        <div className="info-card-title">👤 Identity Details</div>
        <div className="info-row">
          <div className="info-field"><label>A.1 Employee ID</label><span>{data.employeeId}</span></div>
          <div className="info-field"><label>A.2 Name of Faculty</label><span>{data.name}</span></div>
        </div>
        <div className="info-row">
          <div className="info-field"><label>A.3 Department</label><span>{data.department}</span></div>
          <div className="info-field"><label>A.4 Designation</label><span>{data.designation}</span></div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">📋 Contact &amp; Qualification</div>
        <div className="info-row">
          <div className="info-field"><label>A.5 Mobile No.</label><span>{data.mobile}</span></div>
          <div className="info-field"><label>A.6 Highest Qualification</label><span>{data.qualification}</span></div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">🗓️ Service Details</div>
        <div className="info-row">
          <div className="info-field"><label>A.7 Date of Joining (Regular)</label><span>{data.dateOfJoining || "—"}</span></div>
          <div className="info-field"><label>A.8 Total Service after M.Tech &amp; Ph.D (as on 1st July 2026)</label><span>{data.totalService ? `${data.totalService} Years` : "—"}</span></div>
        </div>
        <div className="info-row">
          <div className="info-field"><label>A.9 Experience at CBIT (as on 1st July 2026)</label><span>{data.experienceAtCBIT ? `${data.experienceAtCBIT} Years` : "—"}</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── PART B ──────────────────────────────────────────────────────────────────
function PartB({ data, marks, setMarks }) {
  const [activeTab, setActiveTab] = useState("B1");
  const tabs = [
    { id: "B1", label: "B.1 Courses" },
    { id: "B2", label: "B.2 Feedback" },
    { id: "B3", label: "B.3 Pedagogy" },
    { id: "B4", label: "B.4 Mentoring" },
  ];

  const oddCourses = data?.courses?.odd || [];
  const evenCourses = data?.courses?.even || [];
  const oddFeedback = data?.feedback?.odd ?? null;
  const evenFeedback = data?.feedback?.even ?? null;
  const pedagogy = data?.pedagogy || {};
  const mentoring = data?.mentoring || {};

  return (
    <div>
      <div className="part-header">
        <div className="part-title">Part B</div>
        <div className="part-subtitle">Teaching, Learning & Evaluation — Max 120 Points</div>
      </div>
      <div className="tabs-bar">
        {tabs.map((t) => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* B.1 */}
      {activeTab === "B1" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">📚 B.1 Courses Taught, Success Rate & CO Attainment</span>
            <span className="max-badge">Max 40 pts</span>
          </div>
          <div className="section-card-body">
            <div className="info-note" style={{ marginBottom: 12 }}>
              ℹ️ Points for success rate only if pass % greater than 75. Best of 4 results considered.
            </div>

            <strong style={{ fontSize: 12, color: "#555" }}>Odd Semester (B.1.1)</strong>
            <table className="mini-table" style={{ marginTop: 6 }}>
              <thead>
                <tr><th>Course Title</th><th>Code</th><th>Success Rate (%)</th><th>GPA (0-10)</th><th>COs Attained</th><th>Proof Page</th></tr>
              </thead>
              <tbody>
                {oddCourses.length === 0 ? (
                  <tr><td colSpan={6} className="empty-state">No courses.</td></tr>
                ) : oddCourses.map((c, i) => (
                  <tr key={i}>
                    <td>{c.title}</td>
                    <td><code>{c.code}</code></td>
                    <td style={{ color: c.successRate > 75 ? "#27ae60" : "#c0392b", fontWeight: 600 }}>{c.successRate}%</td>
                    <td>{c.gpa}</td>
                    <td>{c.cosAttained}</td>
                    <td>{c.proofPage}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <strong style={{ fontSize: 12, color: "#555", display: "block", marginTop: 16 }}>Even Semester (B.1.2)</strong>
            <table className="mini-table" style={{ marginTop: 6 }}>
              <thead>
                <tr><th>Course Title</th><th>Code</th><th>Success Rate (%)</th><th>GPA (0-10)</th><th>COs Attained</th><th>Proof Page</th></tr>
              </thead>
              <tbody>
                {evenCourses.length === 0 ? (
                  <tr><td colSpan={6} className="empty-state">No courses.</td></tr>
                ) : evenCourses.map((c, i) => (
                  <tr key={i}>
                    <td>{c.title}</td>
                    <td><code>{c.code}</code></td>
                    <td style={{ color: c.successRate > 75 ? "#27ae60" : "#c0392b", fontWeight: 600 }}>{c.successRate}%</td>
                    <td>{c.gpa}</td>
                    <td>{c.cosAttained}</td>
                    <td>{c.proofPage}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="marks-input-row" style={{ marginTop: 16 }}>
              <label>B.1 Marks Awarded (Max 40)</label>
              <input className="marks-input" type="number" min={0} max={40} placeholder="–" value={marks.b1} onChange={(e) => setMarks({ ...marks, b1: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* B.2 */}
      {activeTab === "B2" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">⭐ B.2 Feedback on Teaching</span>
            <span className="max-badge">Max 20 pts</span>
          </div>
          <div className="section-card-body">
            <div className="info-note" style={{ marginBottom: 12 }}>
              ℹ️ Points allotted only if feedback % is 75 or above. Formula: (% / 100) x 10 per semester. Max 10 pts each semester.
            </div>

            <table className="mini-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Feedback Score (%)</th>
                  <th>Eligible?</th>
                  <th>Max Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Odd Semester (B.2.1)</td>
                  <td style={{ fontWeight: 600, color: oddFeedback !== null && oddFeedback >= 75 ? "#27ae60" : "#c0392b" }}>
                    {oddFeedback !== null ? `${oddFeedback}%` : "Not submitted"}
                  </td>
                  <td>
                    {oddFeedback !== null
                      ? oddFeedback >= 75
                        ? "✅ Yes"
                        : "❌ No (below 75%)"
                      : "—"}
                  </td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Even Semester (B.2.1)</td>
                  <td style={{ fontWeight: 600, color: evenFeedback !== null && evenFeedback >= 75 ? "#27ae60" : "#c0392b" }}>
                    {evenFeedback !== null ? `${evenFeedback}%` : "Not submitted"}
                  </td>
                  <td>
                    {evenFeedback !== null
                      ? evenFeedback >= 75
                        ? "✅ Yes"
                        : "❌ No (below 75%)"
                      : "—"}
                  </td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>

            <div className="marks-input-row" style={{ marginTop: 16 }}>
              <label>B.2 Marks Awarded (Max 20)</label>
              <input className="marks-input" type="number" min={0} max={20} placeholder="–" value={marks.b2} onChange={(e) => setMarks({ ...marks, b2: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* B.3 */}
      {activeTab === "B3" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">🧪 B.3 Pedagogical Initiatives</span>
            <span className="max-badge">Max 40 pts</span>
          </div>
          <div className="section-card-body">
            <table className="mini-table" style={{ marginBottom: 16 }}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Sub-section</th>
                  <th>Faculty Description</th>
                  <th style={{ width: "120px" }}>Rubric</th>
                  <th style={{ width: "60px" }}>Max</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "ictTools",          label: "B.3.1 Usage of ICT Tools",                               rubric: "2 pts/tool",    max: 4  },
                  { key: "alternateAssessment",label: "B.3.2 Alternate Assessment Tools",                       rubric: "2 pts/tool",    max: 4  },
                  { key: "complexProblems",    label: "B.3.3 Complex Engineering Problems / Case Studies",      rubric: "2 pts/problem", max: 6  },
                  { key: "courseEndProjects",  label: "B.3.4 Course End Projects / Survey Reports",             rubric: "2 pts/project", max: 6  },
                  { key: "innovativeTeaching", label: "B.3.5 Innovative Teaching / Active Learning",            rubric: "2 pts/method",  max: 6  },
                  { key: "contentDevelopment", label: "B.3.6 Content Development (Videos, Lab Manuals etc.)",  rubric: "5 pts/item",    max: 10 },
                  { key: "obeAwareness",       label: "B.3.7 Awareness on OBE (500 words, F2F assessed)",       rubric: "F2F only",      max: 4  },
                ].map((item) => (
                  <tr key={item.key}>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{item.label}</td>
                    <td style={{ fontSize: 12, color: "#444" }}>{pedagogy[item.key] || "—"}</td>
                    <td style={{ fontSize: 11, color: "#888" }}>{item.rubric}</td>
                    <td style={{ fontWeight: 600, color: "#7a1a1a", textAlign: "center" }}>{item.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="marks-input-row">
              <label>B.3 Marks Awarded (Max 40)</label>
              <input className="marks-input" type="number" min={0} max={40} placeholder="–" value={marks.b3} onChange={(e) => setMarks({ ...marks, b3: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* B.4 */}
      {activeTab === "B4" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">🎯 B.4 Student Mentoring</span>
            <span className="max-badge">Max 20 pts</span>
          </div>
          <div className="section-card-body">
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Value Submitted</th>
                  <th>Rubric</th>
                  <th>Max Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>B.4.1 Total Students Mentored (N)</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.totalStudents ?? "—"}</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>B.4.2 Frequency of Mentor-Mentee Meetings</td>
                  <td>{mentoring.meetingFrequency || "—"}</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>B.4.3 Students Cleared All Courses – Odd Sem (N1)</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.clearedOdd ?? "—"}</td>
                  <td>(N1 / N) x 4</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>4</td>
                </tr>
                <tr>
                  <td>B.4.4 Students Cleared All Courses – Even Sem (N2)</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.clearedEven ?? "—"}</td>
                  <td>(N2 / N) x 4</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>4</td>
                </tr>
                <tr>
                  <td>B.4.5 Participated in Inter-institutional Events</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.interInstitutional ?? "—"}</td>
                  <td>0.5 pt / student</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>2</td>
                </tr>
                <tr>
                  <td>B.4.6 Students Received Awards / Prizes</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.awardsWon ?? "—"}</td>
                  <td>1 pt / student</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>2</td>
                </tr>
                <tr>
                  <td>B.4.7 Students with NPTEL / MOOCs Certificate</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.nptelCertificates ?? "—"}</td>
                  <td>0.5 pt / student</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>3</td>
                </tr>
                <tr>
                  <td>B.4.8 Students with Industry Certification Courses</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.industryCertifications ?? "—"}</td>
                  <td>0.5 pt / student</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>2</td>
                </tr>
                <tr>
                  <td>B.4.9 Students with Attendance 75% or above (N3)</td>
                  <td style={{ fontWeight: 600 }}>{mentoring.attendanceAbove75 ?? "—"}</td>
                  <td>(N3 / N) x 3</td>
                  <td style={{ fontWeight: 600, color: "#7a1a1a" }}>3</td>
                </tr>
              </tbody>
            </table>

            <div className="marks-input-row" style={{ marginTop: 12 }}>
              <label>B.4 Marks Awarded (Max 20)</label>
              <input className="marks-input" type="number" min={0} max={20} placeholder="–" value={marks.b4} onChange={(e) => setMarks({ ...marks, b4: e.target.value })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ─── PART C ──────────────────────────────────────────────────────────────────
function PartC({ data, marks, setMarks }) {
  const [activeTab, setActiveTab] = useState("C1");

  // Safe defaults for every array/field
  const c = {
    conferencePapers: data?.conferencePapers || [],
    journalPapers: data?.journalPapers || [],
    citations: data?.citations ?? 0,
    bookChapters: data?.bookChapters || [],
    textbooks: data?.textbooks || [],
    projects: data?.projects || [],
    projectOutcome: data?.projectOutcome || "",
    products: data?.products || [],
    patents: data?.patents || [],
    patentMoney: data?.patentMoney || "",
    startups: data?.startups || [],
    consultancy: data?.consultancy || [],
    supervisorship: data?.supervisorship || [],
    studentProjects: data?.studentProjects || [],
  };

  const tabs = [
    { id: "C1", label: "C.1 Publications" },
    { id: "C2", label: "C.2 Projects" },
    { id: "C3", label: "C.3 Products & Patents" },
    { id: "C4", label: "C.4 Consultancy" },
    { id: "C5", label: "C.5 Supervisorship" },
    { id: "C6", label: "C.6 Student Projects" },
  ];

  return (
    <div>
      <div className="part-header">
        <div className="part-title">Part C</div>
        <div className="part-subtitle">Research Contribution</div>
      </div>
      <div className="tabs-bar" style={{ flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* C.1 Publications */}
      {activeTab === "C1" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📄 C.1.1 Conference Papers (Scopus / Web of Science)</span>
              <span className="max-badge">5 pts (1st) | 4 pts (2nd) | 3 pts (3rd) | No limit</span>
            </div>
            <div className="section-card-body">
              <table className="mini-table">
                <thead><tr><th>Paper Title</th><th>Conference</th><th>Indexing</th><th>Author Position</th><th>Year</th><th>Proof Page</th></tr></thead>
                <tbody>
                  {c.conferencePapers.length === 0 ? (
                    <tr><td colSpan={6} className="empty-state">No conference papers.</td></tr>
                  ) : c.conferencePapers.map((p, i) => (
                    <tr key={i}><td>{p.title}</td><td>{p.conference}</td><td>{p.indexing}</td><td>{p.authorPos}</td><td>{p.year}</td><td>{p.proofPage}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📰 C.1.2 Journal Publications (Scopus / WoS / SCIE / ESCI)</span>
            </div>
            <div className="section-card-body">
              <div className="info-note" style={{ marginBottom: 10, fontSize: 11 }}>
                Q1: 25/20/15 pts | Q2: 15/12/10 pts | Q3/Q4: 10/8/6 pts (1st/2nd/3rd author)
              </div>
              <table className="mini-table">
                <thead><tr><th>Paper Title</th><th>Quartile</th><th>Author Position</th><th>Points</th><th>Proof Page</th></tr></thead>
                <tbody>
                  {c.journalPapers.length === 0 ? (
                    <tr><td colSpan={5} className="empty-state">No journal papers.</td></tr>
                  ) : c.journalPapers.map((p, i) => (
                    <tr key={i}><td>{p.title}</td><td style={{ fontWeight: 600, color: "#7a1a1a" }}>{p.quartile}</td><td>{p.authorPos}</td><td style={{ fontWeight: 600 }}>{p.points}</td><td>{p.proofPage}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🔢 C.1.3 Citations (Scopus – Jan 1 to Dec 31)</span>
              <span className="max-badge">2 pts/Q1 citation | 1 pt/other | Max 15</span>
            </div>
            <div className="section-card-body">
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}>
                <span style={{ fontSize: 13 }}>Total Citations Reported:</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#7a1a1a" }}>{c.citations}</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📖 C.1.4 Book Chapters (Scopus / WoS / SCIE / ESCI)</span>
              <span className="max-badge">1st: 5 pts | 2nd: 3 pts | Any: 2 pts | Max 10</span>
            </div>
            <div className="section-card-body">
              {c.bookChapters.length === 0 ? (
                <div className="empty-state">No book chapters.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Chapter Title</th><th>Publisher</th><th>Author Position</th><th>Year</th></tr></thead>
                  <tbody>{c.bookChapters.map((b, i) => <tr key={i}><td>{b.title}</td><td>{b.publisher}</td><td>{b.authorPos}</td><td>{b.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📚 C.1.5 Authored / Edited Textbooks</span>
              <span className="max-badge">1st Author: 10 pts | Others: 3 pts | Max 14</span>
            </div>
            <div className="section-card-body">
              {c.textbooks.length === 0 ? (
                <div className="empty-state">No textbooks.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Title</th><th>Publisher</th><th>Author Position</th><th>Year</th></tr></thead>
                  <tbody>{c.textbooks.map((t, i) => <tr key={i}><td>{t.title}</td><td>{t.publisher}</td><td>{t.authorPos}</td><td>{t.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="marks-input-row">
            <label>C.1 Total Marks Awarded</label>
            <input className="marks-input" type="number" min={0} placeholder="–" value={marks.c1} onChange={(e) => setMarks({ ...marks, c1: e.target.value })} />
          </div>
        </div>
      )}

      {/* C.2 Projects */}
      {activeTab === "C2" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🔬 C.2.1 Funded Research Projects</span>
              <span className="max-badge">≥10L: PI-20/CoPI-15 | 5-10L: PI-12/CoPI-8 | &lt;5L: 5 pts each</span>
            </div>
            <div className="section-card-body">
              {c.projects.length === 0 ? (
                <div className="empty-state">No projects.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Project Title</th><th>Agency</th><th>Amount (₹)</th><th>Role</th><th>Duration</th><th>Proof Page</th></tr></thead>
                  <tbody>{c.projects.map((p, i) => <tr key={i}><td>{p.title}</td><td>{p.agency}</td><td>₹{p.amount}</td><td style={{ fontWeight: 600, color: "#7a1a1a" }}>{p.role}</td><td>{p.duration}</td><td>{p.proofPage}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📊 C.2.2 Outcome of Research Project</span>
              <span className="max-badge">PI/Co-I: 5 pts</span>
            </div>
            <div className="section-card-body">
              <div style={{ background: "#f9f9f7", border: "1px solid #e8e8e4", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#444" }}>
                {c.projectOutcome || "No outcome reported."}
              </div>
            </div>
          </div>

          <div className="marks-input-row" style={{ marginTop: 12 }}>
            <label>C.2 Marks Awarded</label>
            <input className="marks-input" type="number" min={0} placeholder="–" value={marks.c2} onChange={(e) => setMarks({ ...marks, c2: e.target.value })} />
          </div>
        </div>
      )}

      {/* C.3 Products & Patents */}
      {activeTab === "C3" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">💡 C.3.1 Products / Working Models / Software Applications</span>
              <span className="max-badge">10 pts/product | 5 pts/model | Max 10</span>
            </div>
            <div className="section-card-body">
              {c.products.length === 0 ? (
                <div className="empty-state">No products.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Title</th><th>Type</th><th>Year</th></tr></thead>
                  <tbody>{c.products.map((p, i) => <tr key={i}><td>{p.title}</td><td>{p.type}</td><td>{p.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🏆 C.3.2 Patents Granted / Published</span>
              <span className="max-badge">Granted: 10 pts | Published: 5 pts | No limit</span>
            </div>
            <div className="section-card-body">
              {c.patents.length === 0 ? (
                <div className="empty-state">No patents.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Patent Title</th><th>Status</th><th>Number</th><th>Proof Page</th></tr></thead>
                  <tbody>{c.patents.map((p, i) => (
                    <tr key={i}>
                      <td>{p.title}</td>
                      <td><span className={`status-badge ${p.type === "Granted" ? "status-evaluated" : "status-pending"}`}>{p.type}</span></td>
                      <td><code>{p.number}</code></td>
                      <td>{p.proofPage}</td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">💰 C.3.3 Money Generated from Patent / Copyright (CAY)</span>
              <span className="max-badge">10 pts | No limit</span>
            </div>
            <div className="section-card-body">
              <div style={{ fontSize: 13, color: "#555" }}>{c.patentMoney || "None reported."}</div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🚀 C.3.4 Startups / Venture Capital Investment</span>
              <span className="max-badge">&gt;10L: 20 pts | 5-10L: 12 pts | &lt;5L: 5 pts</span>
            </div>
            <div className="section-card-body">
              {c.startups.length === 0 ? (
                <div className="empty-state">No startups.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Startup Name</th><th>Investment</th><th>Year</th></tr></thead>
                  <tbody>{c.startups.map((s, i) => <tr key={i}><td>{s.name}</td><td>₹{s.investment}</td><td>{s.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="marks-input-row" style={{ marginTop: 12 }}>
            <label>C.3 Marks Awarded</label>
            <input className="marks-input" type="number" min={0} placeholder="–" value={marks.c3} onChange={(e) => setMarks({ ...marks, c3: e.target.value })} />
          </div>
        </div>
      )}

      {/* C.4 Consultancy */}
      {activeTab === "C4" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">🤝 C.4.1 Consultancy / Corporate Training / Innovation Grants</span>
            <span className="max-badge">&lt;10K:1 | 10-25K:2 | 25-75K:3 | 75K-1L:4 | 1-5L:5 | 5-10L:12 | &gt;10L:20 pts</span>
          </div>
          <div className="section-card-body">
            {c.consultancy.length === 0 ? (
              <div className="empty-state">No consultancy work.</div>
            ) : (
              <table className="mini-table">
                <thead><tr><th>Title / Organization</th><th>Amount (₹)</th><th>Proof Page</th></tr></thead>
                <tbody>{c.consultancy.map((item, i) => <tr key={i}><td>{item.title}</td><td>₹{item.amount}</td><td>{item.proofPage}</td></tr>)}</tbody>
              </table>
            )}
            <div className="marks-input-row" style={{ marginTop: 12 }}>
              <label>C.4 Marks Awarded</label>
              <input className="marks-input" type="number" min={0} placeholder="–" value={marks.c4} onChange={(e) => setMarks({ ...marks, c4: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* C.5 Supervisorship */}
      {activeTab === "C5" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">🎓 C.5.1 PhD Supervisorship</span>
            <span className="max-badge">1 pt/supervising | 5 pts/guided & awarded (CAY) | Max 10</span>
          </div>
          <div className="section-card-body">
            {c.supervisorship.length === 0 ? (
              <div className="empty-state">No PhD scholars.</div>
            ) : (
              <table className="mini-table">
                <thead><tr><th>Scholar Name</th><th>Status</th><th>Year</th></tr></thead>
                <tbody>{c.supervisorship.map((s, i) => (
                  <tr key={i}>
                    <td>{s.scholarName}</td>
                    <td><span className={`status-badge ${s.status === "Awarded" ? "status-evaluated" : "status-submitted"}`}>{s.status}</span></td>
                    <td>{s.year}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
            <div className="marks-input-row" style={{ marginTop: 12 }}>
              <label>C.5 Marks Awarded (Max 10)</label>
              <input className="marks-input" type="number" min={0} max={10} placeholder="–" value={marks.c5} onChange={(e) => setMarks({ ...marks, c5: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* C.6 Student Projects */}
      {activeTab === "C6" && (
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">🛠️ C.6.1 Student Projects Guided</span>
            <span className="max-badge">2 pts/project | 3 pts if Presentation/Publication | Max 10</span>
          </div>
          <div className="section-card-body">
            <div className="info-note" style={{ marginBottom: 10 }}>ℹ️ Not applicable for faculty of English. Mini project counted if only one project allotted.</div>
            {c.studentProjects.length === 0 ? (
              <div className="empty-state">No student projects.</div>
            ) : (
              <table className="mini-table">
                <thead><tr><th>Project Title</th><th>Team</th><th>No. of Students</th><th>Status</th><th>Year</th></tr></thead>
                <tbody>{c.studentProjects.map((p, i) => (
                  <tr key={i}>
                    <td>{p.title}</td><td>{p.team}</td><td>{p.students}</td>
                    <td><span className={`status-badge ${p.status === "Published" ? "status-evaluated" : "status-submitted"}`}>{p.status}</span></td>
                    <td>{p.year}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
            <div className="marks-input-row" style={{ marginTop: 12 }}>
              <label>C.6 Marks Awarded (Max 10)</label>
              <input className="marks-input" type="number" min={0} max={10} placeholder="–" value={marks.c6} onChange={(e) => setMarks({ ...marks, c6: e.target.value })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PART D ──────────────────────────────────────────────────────────────────
function PartD({ data, marks, setMarks }) {
  const [activeTab, setActiveTab] = useState("D1");

  // Safe defaults for every array/field
  const d = {
    trainingsAttended: data?.trainingsAttended || [],
    certifications: data?.certifications || [],
    trainingsConducted: data?.trainingsConducted || [],
    valueAddedCourses: data?.valueAddedCourses || [],
    professionalMemberships: data?.professionalMemberships || [],
    outsideInteractions: data?.outsideInteractions || [],
    awards: data?.awards || [],
    institutionContribution: data?.institutionContribution || "—",
    departmentContribution: data?.departmentContribution || "—",
  };

  const tabs = [
    { id: "D1", label: "D.1 Professional Dev." },
    { id: "D2", label: "D.2 Interactions" },
    { id: "D3", label: "D.3 Administration" },
  ];

  return (
    <div>
      <div className="part-header">
        <div className="part-title">Part D</div>
        <div className="part-subtitle">Extension Activities &amp; Professional Development — Max 70 Points</div>
      </div>
      <div className="tabs-bar">
        {tabs.map((t) => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* D.1 */}
      {activeTab === "D1" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📘 D.1.1 Trainings Attended by Faculty</span>
              <span className="max-badge">NPTEL 8/12wk: 2.5 pts | Sponsored FDP/NPTEL 4wk: 2 pts | Workshop: 1 pt | Max 5+5</span>
            </div>
            <div className="section-card-body">
              {d.trainingsAttended.length === 0 ? (
                <div className="empty-state">No trainings.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Type</th><th>Title</th><th>Duration</th><th>Year</th></tr></thead>
                  <tbody>{d.trainingsAttended.map((t, i) => (
                    <tr key={i}>
                      <td><span className="status-badge status-submitted">{t.type}</span></td>
                      <td>{t.title}</td><td>{t.duration}</td><td>{t.year}</td>
                    </tr>
                  ))}</tbody>
                </table>
              )}

              {d.certifications.length > 0 && (
                <>
                  <strong style={{ fontSize: 12, color: "#555", display: "block", marginTop: 14 }}>Certifications (5 pts each)</strong>
                  <table className="mini-table" style={{ marginTop: 6 }}>
                    <thead><tr><th>Title</th><th>Organization</th><th>Duration</th><th>Year</th></tr></thead>
                    <tbody>{d.certifications.map((c, i) => <tr key={i}><td>{c.title}</td><td>{c.organization}</td><td>{c.duration}</td><td>{c.year}</td></tr>)}</tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🎤 D.1.2 Trainings Conducted by Faculty</span>
              <span className="max-badge">FDP/STTP 1-2wk: 5 pts | &lt;1wk: 2.5 pts | Max 10</span>
            </div>
            <div className="section-card-body">
              {d.trainingsConducted.length === 0 ? (
                <div className="empty-state">No trainings conducted.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Role</th><th>Program Type</th><th>Duration</th><th>No. of Programs</th><th>Year</th></tr></thead>
                  <tbody>{d.trainingsConducted.map((t, i) => <tr key={i}><td>{t.role}</td><td>{t.programType}</td><td>{t.duration}</td><td>{t.programs}</td><td>{t.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">📋 D.1.3 Value Added / Add-on Courses (Min 30 hrs)</span>
              <span className="max-badge">5 pts per course | Max 5</span>
            </div>
            <div className="section-card-body">
              {d.valueAddedCourses.length === 0 ? (
                <div className="empty-state">No value-added courses.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Course / Workshop Title</th><th>Duration (hrs)</th><th>No. of Courses</th><th>Year</th></tr></thead>
                  <tbody>{d.valueAddedCourses.map((v, i) => <tr key={i}><td>{v.title}</td><td>{v.duration} hrs</td><td>{v.courses}</td><td>{v.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="marks-input-row" style={{ marginTop: 8 }}>
            <label>D.1 Marks Awarded (Max 25)</label>
            <input className="marks-input" type="number" min={0} max={25} placeholder="–" value={marks.d1} onChange={(e) => setMarks({ ...marks, d1: e.target.value })} />
          </div>
        </div>
      )}

      {/* D.2 */}
      {activeTab === "D2" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🏛️ D.2.1 Professional Society Memberships</span>
              <span className="max-badge">Lifetime: 2 pts | Annual: 1 pt | Max 5</span>
            </div>
            <div className="section-card-body">
              {d.professionalMemberships.length === 0 ? (
                <div className="empty-state">No memberships.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Society (IEEE, ACM, IETE, ISTE, ASME, ASCE, CSI…)</th><th>Type</th><th>Count</th></tr></thead>
                  <tbody>{d.professionalMemberships.map((m, i) => <tr key={i}><td>{m.society}</td><td>{m.membershipType}</td><td>{m.memberships}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🌐 D.2.2 Interaction with Outside World</span>
              <span className="max-badge">Accreditation/BOS: 10 pts | Editor Q1: 4 pts | Examiner: 2.5 pts | QP: 5 pts | Resource Person/Reviewer: 5 pts | Intl Visit: 10 pts | Max 15</span>
            </div>
            <div className="section-card-body">
              {d.outsideInteractions.length === 0 ? (
                <div className="empty-state">No interactions.</div>
              ) : d.outsideInteractions.map((item, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot"></div>
                  <div>
                    <div className="activity-text"><strong>{item.activityType}</strong> — {item.description}</div>
                    <div className="activity-meta">Year: {item.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🏅 D.2.3 Awards &amp; Achievements</span>
              <span className="max-badge">10 pts per award | Max 10</span>
            </div>
            <div className="section-card-body">
              {d.awards.length === 0 ? (
                <div className="empty-state">No awards.</div>
              ) : (
                <table className="mini-table">
                  <thead><tr><th>Award Title</th><th>Organization</th><th>Year</th></tr></thead>
                  <tbody>{d.awards.map((a, i) => <tr key={i}><td>{a.title}</td><td>{a.organization}</td><td>{a.year}</td></tr>)}</tbody>
                </table>
              )}
            </div>
          </div>

          <div className="marks-input-row" style={{ marginTop: 8 }}>
            <label>D.2 Marks Awarded (Max 30)</label>
            <input className="marks-input" type="number" min={0} max={30} placeholder="–" value={marks.d2} onChange={(e) => setMarks({ ...marks, d2: e.target.value })} />
          </div>
        </div>
      )}

      {/* D.3 */}
      {activeTab === "D3" && (
        <div>
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🏫 D.3.1 Contribution to Institution</span>
              <span className="max-badge">Principal Authentication | Max 5</span>
            </div>
            <div className="section-card-body">
              <div style={{ background: "#f9f9f7", border: "1px solid #e8e8e4", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#444", lineHeight: 1.7, marginBottom: 12 }}>
                {d.institutionContribution}
              </div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", display: "block", marginBottom: 4 }}>PRINCIPAL REMARKS / AUTHENTICATION</label>
              <textarea style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, minHeight: 60, resize: "vertical" }} placeholder="Enter principal remarks..." />
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">🏢 D.3.2 Contribution to Department</span>
              <span className="max-badge">HOD Authentication | Max 10</span>
            </div>
            <div className="section-card-body">
              <div style={{ background: "#f9f9f7", border: "1px solid #e8e8e4", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#444", lineHeight: 1.7, marginBottom: 12 }}>
                {d.departmentContribution}
              </div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", display: "block", marginBottom: 4 }}>HOD REMARKS / AUTHENTICATION</label>
              <textarea style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, minHeight: 60, resize: "vertical" }} placeholder="Enter HOD remarks..." />
            </div>
          </div>

          <div className="marks-input-row" style={{ marginTop: 8 }}>
            <label>D.3 Marks Awarded (Max 15)</label>
            <input className="marks-input" type="number" min={0} max={15} placeholder="–" value={marks.d3} onChange={(e) => setMarks({ ...marks, d3: e.target.value })} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PART E ──────────────────────────────────────────────────────────────────
function PartE({ data }) {
  return (
    <div>
      <div className="part-header">
        <div className="part-title">Part E</div>
        <div className="part-subtitle">Additional Information (Optional) — View Only</div>
      </div>
      <div className="info-note">ℹ️ Part E is additional information provided by the faculty. No marks awarded for this section.</div>
      <div className="info-card">
        <div className="info-card-title">📝 Self Appraisal / Additional Information</div>
        <p style={{ fontSize: 14, color: "#333", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {data?.selfAppraisal || "—"}
        </p>
      </div>
    </div>
  );
}

// ─── FINAL SECTION ───────────────────────────────────────────────────────────
function FinalSection({ scores, setScores, onSave, onSubmit, submitted, faculty }) {
  const designation = faculty?.designation || "";
  const minB = designation.includes("Assistant") ? 80 : designation.includes("Associate") ? 90 : 100;
  const minC = designation.includes("Assistant") ? 50 : designation.includes("Associate") ? 60 : 70;
  const minD = designation.includes("Assistant") ? 30 : designation.includes("Associate") ? 40 : 50;
  const minTotal = designation.includes("Assistant") ? 160 : designation.includes("Associate") ? 190 : 220;

  return (
    <div>
      <div className="part-header">
        <div className="part-title">Final Evaluation</div>
        <div className="part-subtitle">Enter final scores and submit evaluation</div>
      </div>

      <div className="info-card" style={{ marginBottom: 16 }}>
        <div className="info-card-title">📊 Minimum Required Scores — {designation}</div>
        <div className="info-row">
          <div className="info-field"><label>Min. Part B</label><span style={{ color: "#7a1a1a" }}>{minB} pts</span></div>
          <div className="info-field"><label>Min. Part C</label><span style={{ color: "#7a1a1a" }}>{minC} pts</span></div>
        </div>
        <div className="info-row">
          <div className="info-field"><label>Min. Part D</label><span style={{ color: "#7a1a1a" }}>{minD} pts</span></div>
          <div className="info-field"><label>Min. Total (B+C+D)</label><span style={{ color: "#7a1a1a" }}>{minTotal} pts</span></div>
        </div>
      </div>

      <div className="final-section">
        <h3>📊 Final Score Summary</h3>
        <div className="scores-grid">
          <div className="score-input-group">
            <label>Part B Score (Max 120)</label>
            <input type="number" value={scores.partB} placeholder="Enter Part B score" onChange={(e) => setScores({ ...scores, partB: e.target.value })} min={0} max={120} />
          </div>
          <div className="score-input-group">
            <label>Part C Score</label>
            <input type="number" value={scores.partC} placeholder="Enter Part C score" onChange={(e) => setScores({ ...scores, partC: e.target.value })} min={0} />
          </div>
          <div className="score-input-group">
            <label>Part D Score (Max 70)</label>
            <input type="number" value={scores.partD} placeholder="Enter Part D score" onChange={(e) => setScores({ ...scores, partD: e.target.value })} min={0} max={70} />
          </div>
          <div className="score-input-group total-score-group">
            <label>Total Score (B + C + D)</label>
            <input type="number" value={scores.total} placeholder="Enter Total score" onChange={(e) => setScores({ ...scores, total: e.target.value })} min={0} />
          </div>
        </div>
        <div className="final-actions">
          <button className="btn btn-outline" onClick={onSave}>💾 Save</button>
          <button className="btn btn-success" onClick={onSubmit} disabled={submitted} style={{ opacity: submitted ? 0.6 : 1 }}>
            {submitted ? "✓ Submitted" : "✅ Submit Evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EVALUATE PAGE ──────────────────────────────────────────────────────
function Evaluate() {
  const navigate = useNavigate();
  const location = useLocation();
  const facultyId = location.state?.facultyId || facultyList[0].id;
  const faculty = facultyList.find((f) => f.id === facultyId) || facultyList[0];

  const [activeSection, setActiveSection] = useState("A");
  const [bMarks, setBMarks] = useState({ b1: "", b2: "", b3: "", b4: "" });
  const [cMarks, setCMarks] = useState({ c1: "", c2: "", c3: "", c4: "", c5: "", c6: "" });
  const [dMarks, setDMarks] = useState({ d1: "", d2: "", d3: "" });
  const [scores, setScores] = useState({
    partB: faculty?.scores?.partB || "",
    partC: faculty?.scores?.partC || "",
    partD: faculty?.scores?.partD || "",
    total: faculty?.scores?.total || "",
  });
  const [submitted, setSubmitted] = useState(faculty?.submitted || false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => showToast("Evaluation saved successfully!", "success");

  const handleSubmit = () => {
    if (!scores.total) { showToast("Please enter the Total Score before submitting.", "error"); return; }
    setSubmitted(true);
    showToast("Evaluation submitted successfully!", "success");
  };

  const sidebarSections = [
    { id: "A", label: "Part A – Faculty Info" },
    { id: "B", label: "Part B – Teaching" },
    { id: "C", label: "Part C – Research" },
    { id: "D", label: "Part D – Prof. Dev." },
    { id: "E", label: "Part E – Additional Info" },
    { id: "FINAL", label: "Final Score" },
  ];

  return (
    <>
      <Header />
      <div className="evaluate-layout">
        <aside className="evaluate-sidebar">
          <div style={{ padding: "12px 20px 8px", borderBottom: "1px solid #f0f0ec" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{faculty?.name}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{faculty?.id} · {faculty?.designation}</div>
            {submitted && <div style={{ marginTop: 6 }}><span className="status-badge status-evaluated">✓ Submitted</span></div>}
          </div>
          <div style={{ padding: "12px 0 0" }}>
            <div className="sidebar-title">Sections</div>
            {sidebarSections.map((s) => (
              <button key={s.id} className={`sidebar-nav-item ${activeSection === s.id ? "active" : ""}`} onClick={() => setActiveSection(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0ec", marginTop: 16 }}>
            <button className="btn btn-outline" style={{ width: "100%", fontSize: 12, justifyContent: "center" }} onClick={() => navigate("/home")}>
              ← Back to Dashboard
            </button>
          </div>
        </aside>

        <main className="evaluate-content">
          {activeSection === "A" && <PartA data={faculty?.partA || {}} />}
          {activeSection === "B" && <PartB data={faculty?.partB || {}} marks={bMarks} setMarks={setBMarks} />}
          {activeSection === "C" && <PartC data={faculty?.partC || {}} marks={cMarks} setMarks={setCMarks} />}
          {activeSection === "D" && <PartD data={faculty?.partD || {}} marks={dMarks} setMarks={setDMarks} />}
          {activeSection === "E" && <PartE data={faculty?.partE || {}} />}
          {activeSection === "FINAL" && (
            <FinalSection scores={scores} setScores={setScores} onSave={handleSave} onSubmit={handleSubmit} submitted={submitted} faculty={faculty} />
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 16, borderTop: "1px solid #e8e8e4" }}>
            <button className="btn btn-outline" disabled={activeSection === "A"}
              onClick={() => { const idx = sidebarSections.findIndex((s) => s.id === activeSection); if (idx > 0) setActiveSection(sidebarSections[idx - 1].id); }}>
              ← Previous
            </button>
            <button className="btn btn-primary" disabled={activeSection === "FINAL"}
              onClick={() => { const idx = sidebarSections.findIndex((s) => s.id === activeSection); if (idx < sidebarSections.length - 1) setActiveSection(sidebarSections[idx + 1].id); }}>
              Next →
            </button>
          </div>
        </main>
      </div>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}

export default Evaluate;
