/* ==========================================
   VEDANTU TRUSTGATE - MAIN APPLICATION LOGIC
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Tab switching
    initTabs();
    
    // Slide deck system
    initDeck();
    
    // Interactive prototype
    initPrototype();
    
    // Analytics Dashboard
    initDashboard();
}

/* ==========================================
   TAB SYSTEM
   ========================================== */
function initTabs() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            
            navButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            const targetContent = document.getElementById(`tab-${tabId}`);
            if (targetContent) {
                targetContent.classList.add("active");
                logSandbox(`[SYSTEM] Switched to tab: ${btn.textContent.trim()}`);
                
                // Re-render SVG charts if dashboard tab is active to ensure proper dimensions
                if (tabId === "dashboard") {
                    renderDashboardCharts();
                }
            }
        });
    });
}

/* ==========================================
   PRODUCT THINKING DECK DATA & LOGIC
   ========================================== */
const DECK_DATA = [
    {
        tag: "Introduction",
        title: "Vedantu TrustGate: Balancing DPDP Compliance & Onboarding Velocity",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Executive Summary</span>
                    <h2>Vedantu TrustGate: Privacy-First Onboarding Design</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div class="slide-card primary">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">The Assignment Goal</h3>
                            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; line-height: 1.5;">
                                Under India's <strong>DPDP Act, 2023</strong>, EdTech platforms like Vedantu must obtain <strong>Verifiable Parental Consent (VPC)</strong> for users under 18 and are banned from profiling or behavioral tracking of children.
                            </p>
                            <p style="font-size: 0.9rem; line-height: 1.5;">
                                This deck presents <strong>TrustGate</strong>: a compliance architecture that fulfills every legal mandate while employing low-friction verification loops (like UPI Penny-Drop) to keep onboarding seamless and user-friendly.
                            </p>
                        </div>
                        <div class="big-stat-group">
                            <div class="big-stat-number">&lt; 18</div>
                            <div class="big-stat-label">Minor Age Threshold</div>
                            <div class="big-stat-desc">Mandating parental consent under Section 9</div>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Vedantu PM Assignment • DPDP Compliance</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Problem Statement",
        title: "The Compliance Threat to User Onboarding Conversion",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Problem Statement</span>
                    <h2>The Friction vs. Compliance Dilemma</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div>
                            <ul class="bullet-list">
                                <li><strong>The Regulatory Mandate:</strong> Section 9 of DPDP Act 2023 requires <em>verifiable</em> consent of the parent/lawful guardian before processing children's personal data.</li>
                                <li><strong>The User Friction Point:</strong> Traditional verifiable consent (uploading Aadhaar card, PAN, or guardian IDs) causes up to <strong>40% drop-off rates</strong> in student signup funnels.</li>
                                <li><strong>Profiling Ban:</strong> No tracking or targeted ads for minors. Personalization must be built strictly on non-behavioral, functional learning telemetry.</li>
                            </ul>
                        </div>
                        <div class="slide-card" style="border-left: 3px solid var(--error-color); background: rgba(239, 68, 68, 0.01);">
                            <h3 style="color: var(--error-color); font-weight: 700;">The Risks of Failure</h3>
                            <p style="margin-bottom: 0.5rem; font-size: 0.85rem;"><strong>Legal Risk:</strong> Non-compliance penalties under the DPDP Act range up to <strong>₹200 Crore</strong> for children's data violations.</p>
                            <p style="font-size: 0.85rem;"><strong>Business Risk:</strong> High signup friction drives students to competitors who bypass regulations (temporary advantage) or causes complete loss of customer trust.</p>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 2 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "User Persona",
        title: "Target Personas: Balancing Student Eagerness with Parental Trust",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">User Personas</span>
                    <h2>Aarav (Student) & Sunita (Parent)</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div class="slide-card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                <h3 style="color: var(--brand-primary); font-weight: 700;">Aarav Jaiswal (14)</h3>
                                <span style="font-size: 0.7rem; background: var(--bg-tertiary); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">Student</span>
                            </div>
                            <p style="font-size: 0.85rem; margin-bottom: 0.5rem; line-height: 1.5;"><strong>Context:</strong> Wants to sign up on Vedantu for his Grade 9 Live Science class. Highly eager, low patience.</p>
                            <p style="font-size: 0.85rem; margin-bottom: 0.5rem; line-height: 1.5;"><strong>Pain Points:</strong> Blocked by verification walls. Doesn't have credit cards or government IDs handy. Impatient with complex flows.</p>
                            <p style="font-size: 0.85rem; line-height: 1.5;"><strong>Goal:</strong> Wants to join his classes instantly with zero setup delays.</p>
                        </div>
                        <div class="slide-card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                <h3 style="color: var(--brand-secondary); font-weight: 700;">Sunita Jaiswal (42)</h3>
                                <span style="font-size: 0.7rem; background: var(--bg-tertiary); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">Parent (Teacher)</span>
                            </div>
                            <p style="font-size: 0.85rem; margin-bottom: 0.5rem; line-height: 1.5;"><strong>Context:</strong> Protective mother, moderate digital literacy. Pays for class subscriptions.</p>
                            <p style="font-size: 0.85rem; margin-bottom: 0.5rem; line-height: 1.5;"><strong>Pain Points:</strong> Suspicious of apps asking for government ID cards (fear of identity theft/misuse). Worried about spam calling.</p>
                            <p style="font-size: 0.85rem; line-height: 1.5;"><strong>Goal:</strong> Secure and quick authorization without uploading physical documents.</p>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 3 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Current Experience",
        title: "Current Experience Audit & DPDP Compliance Gaps",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Current vs. DPDP Reality</span>
                    <h2>Where the Industry Falls Short of Compliance</h2>
                </div>
                <div class="slide-body">
                    <div class="comparison-box">
                        <div class="comparison-row header">
                            <span>Process</span>
                            <span>Traditional / Current Flow</span>
                            <span>DPDP Act Requirement</span>
                        </div>
                        <div class="comparison-row">
                            <span class="comparison-label">Consent Notice</span>
                            <span class="comparison-bad">Endless 40-page, English-only Privacy Policy accepted with a pre-ticked checkbox.</span>
                            <span class="comparison-good">Section 5: Itemised notice in English + 22 scheduled languages, explaining exact data usage.</span>
                        </div>
                        <div class="comparison-row">
                            <span class="comparison-label">Parent Verification</span>
                            <span class="comparison-bad">Assumed consent (no verification, or checking 'I confirm my parent is aware').</span>
                            <span class="comparison-good">Section 9(1): Verifiable parental consent. Platform must confirm the parent authorized it.</span>
                        </div>
                        <div class="comparison-row">
                            <span class="comparison-label">User Data Rights</span>
                            <span class="comparison-bad">Hard-to-reach customer support email to request data erasure or edits.</span>
                            <span class="comparison-good">Section 11/12: Easy self-serve dashboard to view, correct, or delete data instantly.</span>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 4 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Proposed Solution",
        title: "Vedantu TrustGate: Seamless & Compliant Consent Flow",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Proposed Solution</span>
                    <h2>TrustGate Consent Architecture</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div>
                            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
                                We propose a dual-verification highway designed for the Indian demographic context:
                            </p>
                            <div class="diagram-block">
                                <div class="diagram-step">
                                    <div class="step-circle">1</div>
                                    <div class="step-details">
                                        <h4>UPI Penny-Drop Validation (₹1 Refunded)</h4>
                                        <p>Parent triggers a ₹1 UPI payment. NPCI returns the bank-verified legal name of the account holder instantly. Vedantu auto-refunds ₹1.</p>
                                    </div>
                                </div>
                                <div class="diagram-arrow"></div>
                                <div class="diagram-step">
                                    <div class="step-circle">2</div>
                                    <div class="step-details">
                                        <h4>Aadhaar OTP fallback (DigiLocker)</h4>
                                        <p>Secure government OTP linked to the child's guardian. Low-friction alternative for non-UPI users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slide-card primary" style="height: auto;">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">Key Features</h3>
                            <ul class="bullet-list" style="font-size: 0.85rem;">
                                <li><strong>Dynamic Notice:</strong> Clear, itemised list togglable between English/Hindi with simple toggle switches for personalization.</li>
                                <li><strong>Zero Tracking for Minors:</strong> Behavioral scripts disabled, recommendation engines switched to contextual (based on topic & grade).</li>
                                <li><strong>Parent Portal:</strong> Real-time compliance dashboard for parents to exercise right of access, correction, or erasure.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 5 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Metrics",
        title: "Metrics Framework: Measuring Trust & Onboarding Velocity",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Success Metrics</span>
                    <h2>Key Performance Indicators (KPIs)</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-3">
                        <div class="slide-card primary">
                            <span style="font-size: 0.7rem; font-weight: 700; color: var(--brand-primary); text-transform: uppercase; letter-spacing: 0.5px;">North Star Metric</span>
                            <h3 style="font-size: 1.15rem; margin-top: 0.25rem; font-weight: 700;">Parent Consent Conversion Rate</h3>
                            <p style="font-size: 0.8rem; margin-top: 0.5rem; line-height: 1.4; color: var(--text-secondary);">% of signups from minor student accounts that successfully complete parental verification within 48 hours.</p>
                            <p style="font-size: 0.8rem; font-weight: 700; margin-top: 0.5rem; color: var(--brand-primary);">Goal: &gt; 78%</p>
                        </div>
                        <div class="slide-card">
                            <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Supporting Metrics</span>
                            <h3 style="font-size: 1rem; margin-top: 0.25rem; font-weight: 700;">Onboarding Velocity</h3>
                            <p style="font-size: 0.8rem; margin-top: 0.5rem; line-height: 1.4; color: var(--text-secondary);">Average time-to-onboard (seconds from student landing to consent approval).</p>
                            <h3 style="font-size: 1rem; margin-top: 0.75rem; font-weight: 700;">Method Adoption</h3>
                            <p style="font-size: 0.8rem; margin-top: 0.25rem; line-height: 1.4; color: var(--text-secondary);">UPI Penny-Drop vs. Aadhaar OTP split (tracking preference for frictionless validation).</p>
                        </div>
                        <div class="slide-card">
                            <span style="font-size: 0.7rem; font-weight: 700; color: var(--error-color); text-transform: uppercase; letter-spacing: 0.5px;">Guardrail Metrics</span>
                            <h3 style="font-size: 1rem; margin-top: 0.25rem; font-weight: 700;">Direct Funnel Drop-off</h3>
                            <p style="font-size: 0.8rem; margin-top: 0.5rem; line-height: 1.4; color: var(--text-secondary);">% drop-off at the age-gate screen (evaluating if the consent wall drives students away).</p>
                            <h3 style="font-size: 1rem; margin-top: 0.75rem; font-weight: 700;">Support Tickets</h3>
                            <p style="font-size: 0.8rem; margin-top: 0.25rem; line-height: 1.4; color: var(--text-secondary);">Volume of complaints regarding verification delays or UPI refund queries.</p>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 6 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Diagnostic Thinking",
        title: "Diagnostic Thinking: Investigating Funnel Drops",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Diagnostic Framework</span>
                    <h2>Hypothesis Tree for Consent Drops (-15%)</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div>
                            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
                                If our North Star Conversion Rate drops by 15% post-launch, we isolate the root cause via a structured <strong>Hypothesis Tree</strong>:
                            </p>
                            <ul class="bullet-list" style="font-size: 0.85rem;">
                                <li><strong>1. Technical Failure:</strong> 3rd party API failures. Timeout spikes in UPI rails or SMS gateways failing to deliver OTP.</li>
                                <li><strong>2. User Trust & Conversion Deficit:</strong> Parents dropped off due to financial security fears (submitting UPI ID) or complex multilingual layouts.</li>
                                <li><strong>3. Onboarding Traffic Shift:</strong> Sudden influx of low-intent or non-native cohorts with different device capability mix.</li>
                            </ul>
                        </div>
                        <div class="slide-card" style="background: rgba(59, 130, 246, 0.02); border-color: rgba(59, 130, 246, 0.15);">
                            <h3 style="font-weight: 700; color: var(--brand-secondary);">The Diagnostic Tool</h3>
                            <p style="font-size: 0.85rem; margin-bottom: 0.75rem; line-height: 1.5;">
                                We have built an interactive <strong>PM Diagnostic Tool</strong> inside this portal (Tab 3).
                            </p>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                                Go to the "Compliance PM Dashboard" tab to test hypotheses live, run telemetry queries, and find the real bottleneck.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 7 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Dashboard Design",
        title: "Compliance Dashboard: Internal PM Control Center",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Dashboard Design</span>
                    <h2>Compliance PM Monitoring Health</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div class="slide-card">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">Key Dashboard Sections</h3>
                            <ul class="bullet-list" style="font-size: 0.85rem;">
                                <li><strong>Real-time Funnel Visualizer:</strong> Tracks Conversion Rate from Landing -> Age Gate -> Notice Display -> Verification Sent -> Success.</li>
                                <li><strong>Language & Region Splits:</strong> Distribution of notice languages to optimize local content translation budgets.</li>
                                <li><strong>Grievance Escalation Logs:</strong> Tracks requests submitted to the Data Protection Officer (DPO) and resolution response times (DPDP Compliance requirement).</li>
                            </ul>
                        </div>
                        <div class="slide-card primary" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">Interactive View Available</h3>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">
                                The full monitoring dashboard with mock data and trendlines is built directly into Tab 3 of this portal.
                            </p>
                            <span style="font-size: 0.75rem; background: var(--brand-primary); color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-weight: 600; cursor: pointer;">Explore Tab 3 for Live Dashboard</span>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 8 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Rollout Plan",
        title: "Rollout & Validation: Safe Deployment Strategy",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Rollout Plan</span>
                    <h2>Phased Rollout & Validation Strategy</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-3">
                        <div class="slide-card">
                            <h3 style="color: var(--brand-primary); font-weight: 700;">Phase 1: Shadow testing (Week 1)</h3>
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary);">
                                Release UPI Penny-drop gateway to 5% traffic. Test bank response latency and refund reconciliation scripts in the background without blocking users.
                            </p>
                        </div>
                        <div class="slide-card">
                            <h3 style="color: var(--brand-secondary); font-weight: 700;">Phase 2: Regional Beta (Weeks 2-3)</h3>
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary);">
                                Deploy to K-12 cohorts in Hindi-speaking regions. Monitor adoption of multilingual notice page. Standard A/B test UI variations on the notice screen.
                            </p>
                        </div>
                        <div class="slide-card">
                            <h3 style="color: var(--success-color); font-weight: 700;">Phase 3: Production Scale (Week 4)</h3>
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary);">
                                100% rollout of the compliance architecture across all platforms (Web, Android, iOS). Establish final SLA alerts for NPCI/Aadhaar gateways.
                            </p>
                        </div>
                    </div>
                    <div class="slide-card" style="margin-top: 1rem; padding: 0.85rem 1.25rem;">
                        <h4 style="font-size: 0.85rem; color: var(--warning-color); display: flex; align-items: center; gap: 6px; font-weight: 700;">
                            <svg style="width:14px; height:14px; fill:currentColor;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            Compliance Testing Notice
                        </h4>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-top: 0.15rem;">
                            Note: The core compliance framework itself (notice layout, opt-in logic) cannot be A/B tested to bypass the law, but layout elements (button designs, explainer copy) can and will be tested to maximize conversion.
                        </p>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 9 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    },
    {
        tag: "Risks & Trade-offs",
        title: "Risks, Trade-offs & Edge Cases",
        html: `
            <div class="slide-layout-standard">
                <div class="slide-header">
                    <span class="slide-tag">Risks & Mitigations</span>
                    <h2>Mitigating Risks & Accepting Trade-offs</h2>
                </div>
                <div class="slide-body">
                    <div class="slide-grid-2">
                        <div class="slide-card">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">Key Technical Edge Cases</h3>
                            <ul class="bullet-list" style="font-size: 0.8rem;">
                                <li><strong>Child turns 18:</strong> The system automatically triggers an in-app notice on their 18th birthday to transition the account from parental authority to direct self-consent, satisfying Section 9.</li>
                                <li><strong>Failure Fallback:</strong> If both UPI & Aadhaar gateways time out, a "Support-Assisted Call" option triggers to let a verified support representative process consent manually over video call.</li>
                            </ul>
                        </div>
                        <div class="slide-card">
                            <h3 style="font-weight: 700; margin-bottom: 0.5rem;">Accepted Trade-offs</h3>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.4;">
                                <strong>Onboarding Velocity Drop:</strong> By introducing verifiable parental consent, we accept a nominal 3-5% drop in speed to guarantee 100% legal compliance.
                            </p>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                                <strong>Personalization Accuracy:</strong> Due to the profiling ban on children's data, algorithmic matching is less granular than adult feeds. We trade micro-targeting for complete child safety.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="slide-footer">
                    <span>Slide 10 of 10</span>
                    <span class="slide-footer-logo">Vedantu</span>
                </div>
            </div>
        `
    }
];

let currentSlideIndex = 0;

function initDeck() {
    renderSlideSelectors();
    renderSlide(0);
    
    document.getElementById("prev-slide").addEventListener("click", () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            renderSlide(currentSlideIndex);
        }
    });
    
    document.getElementById("next-slide").addEventListener("click", () => {
        if (currentSlideIndex < DECK_DATA.length - 1) {
            currentSlideIndex++;
            renderSlide(currentSlideIndex);
        }
    });
}

function renderSlideSelectors() {
    const container = document.getElementById("slide-selectors-container");
    container.innerHTML = "";
    
    DECK_DATA.forEach((slide, idx) => {
        const item = document.createElement("button");
        item.className = `slide-item ${idx === 0 ? 'active' : ''}`;
        item.setAttribute("data-slide-index", idx);
        
        item.innerHTML = `
            <div class="slide-num">${idx + 1}</div>
            <div class="slide-meta">
                <span class="slide-title-nav">${slide.tag}</span>
                <span class="slide-subtitle-nav">${slide.title.substring(0, 22)}...</span>
            </div>
        `;
        
        item.addEventListener("click", () => {
            currentSlideIndex = idx;
            renderSlide(idx);
        });
        
        container.appendChild(item);
    });
}

function renderSlide(index) {
    // Update active state in sidebar
    const items = document.querySelectorAll(".slide-item");
    items.forEach((item, idx) => {
        if (idx === index) {
            item.classList.add("active");
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove("active");
        }
    });
    
    // Render slide stage HTML
    const stage = document.getElementById("slide-stage");
    stage.innerHTML = DECK_DATA[index].html;
    
    // Update progress numbers & bar
    document.getElementById("slide-number-indicator").textContent = `Slide ${index + 1} of ${DECK_DATA.length}`;
    const progressPercent = ((index + 1) / DECK_DATA.length) * 100;
    document.getElementById("slide-progress-fill").style.width = `${progressPercent}%`;
}


/* ==========================================
   INTERACTIVE PROTOTYPE ENGINE
   ========================================== */
let activeFlow = "student-flow";
let parentConsentVerified = false;
let selectedVerificationMethod = "upi";
let minorStudentName = "Aarav Jaiswal";
let consentLanguages = {
    en: {
        title: "Consent Notice under Section 5",
        intro: "Vedantu requires processing minor's data strictly for academic delivery, live sessions, and learning performance feedback. Select what you allow:",
        item1_title: "Essential Live Learning (Mandatory)",
        item1_desc: "Data processed: Name, grade, attendance logs, and student feedback to deliver K-12 classes.",
        item2_title: "Learning Performance Insights (Optional)",
        item2_desc: "Processing test response analysis to identify weak subject areas and recommend special revision material.",
        item3_title: "Grievance Contact",
        item3_desc: "For questions, contact our DPO at dpo@vedantu.com in compliance with DPDP 2023.",
        allow: "I authorize data processing",
        deny: "Decline"
    },
    hi: {
        title: "धारा 5 के तहत सहमति सूचना",
        intro: "वेदांतु शैक्षणिक वितरण, लाइव सत्र और सीखने के प्रदर्शन प्रतिक्रिया के लिए सहमति मांगता है। चयन करें:",
        item1_title: "आवश्यक लाइव लर्निंग (अनिवार्य)",
        item1_desc: "संसाधित डेटा: कक्षाएं प्रदान करने के लिए नाम, ग्रेड, उपस्थिति लॉग और छात्र प्रतिक्रिया।",
        item2_title: "सीखने के प्रदर्शन अंतर्दृष्टि (वैकल्पिक)",
        item2_desc: "कमजोर विषय क्षेत्रों की पहचान करने और विशेष पुनरीक्षण सामग्री की सिफारिश करने के लिए परीक्षण प्रतिक्रिया विश्लेषण।",
        item3_title: "शिकायत संपर्क",
        item3_desc: "प्रश्नों के लिए, DPDP 2023 के अनुपालन में dpo@vedantu.com पर हमारे DPO से संपर्क करें।",
        allow: "मैं डेटा अधिकृत करता हूँ",
        deny: "अस्वीकार करें"
    }
};

let currentLanguage = "en";

function initPrototype() {
    // Flow selectors
    const flowButtons = document.querySelectorAll(".flow-btn");
    flowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            flowButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFlow = btn.getAttribute("data-flow");
            logSandbox(`[SYSTEM] Switched prototype flow to: ${activeFlow}`);
            renderPrototypeScreen();
        });
    });
    
    // Clear logs
    document.getElementById("clear-logs").addEventListener("click", () => {
        const consoleLogs = document.getElementById("sandbox-logs");
        consoleLogs.innerHTML = `<div class="log-line system">[SYSTEM] Activity logs cleared.</div>`;
    });
    
    // Modal close
    document.getElementById("modal-close-btn").addEventListener("click", closeModal);
    
    renderPrototypeScreen();
}

function renderPrototypeScreen() {
    const viewport = document.getElementById("mobile-viewport");
    viewport.innerHTML = "";
    
    if (activeFlow === "student-flow") {
        renderStudentScreen1(viewport);
    } else if (activeFlow === "parent-portal") {
        renderParentPortalHome(viewport);
    }
}

// Student flow Screen 1: Registration
function renderStudentScreen1(container) {
    logSandbox(`[FLOW] Loading Student Sign-up Form.`);
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Onboarding</span>
            </div>
            
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem; font-weight:700;">Create Student Account</h3>
            <p style="font-size: 0.725rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">Enter details to access the best online live classes.</p>
            
            <div class="form-group">
                <label>Student's Full Name</label>
                <input type="text" class="form-input" id="proto-reg-name" value="${minorStudentName}">
            </div>
            
            <div class="form-group">
                <label>Age (Age Gate Verification)</label>
                <input type="number" class="form-input" id="proto-reg-age" value="14" min="5" max="99">
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Grade / Standard</label>
                <select class="form-input" id="proto-reg-grade">
                    <option value="9">Grade 9 (CBSE)</option>
                    <option value="10">Grade 10 (CBSE)</option>
                    <option value="11">Grade 11 (JEE Main)</option>
                </select>
            </div>
            
            <button class="btn-primary" id="btn-submit-reg">
                Continue Signup
                <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
        </div>
    `;
    
    document.getElementById("btn-submit-reg").addEventListener("click", () => {
        const name = document.getElementById("proto-reg-name").value;
        const age = parseInt(document.getElementById("proto-reg-age").value);
        minorStudentName = name;
        
        logSandbox(`[ACTION] Student sign-up submitted. Name: ${name}, Age: ${age}`);
        
        if (age < 18) {
            logSandbox(`[COMPLIANCE] Age Gate Triggered: Minor account detected (Age ${age} < 18). Verifiable Parental Consent REQUIRED under DPDP Section 9.`);
            showToast("warning", "Minor account detected. Parent Verification Required.");
            renderStudentScreen2ParentGate(container);
        } else {
            logSandbox(`[COMPLIANCE] Adult account registered (Age ${age} >= 18). Standard consent notice applies.`);
            showToast("success", "Registration successful!");
            renderAdultSuccessScreen(container);
        }
    });
}

// Student flow Screen 2: Parent Gate Informational
function renderStudentScreen2ParentGate(container) {
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Consent Gate</span>
            </div>
            
            <div style="text-align: center; margin-bottom: 1.25rem;">
                <div style="background: rgba(225, 75, 48, 0.08); width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
                    <svg style="width: 28px; height: 28px; fill: var(--brand-primary);" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <h3 style="font-size: 1.15rem; font-weight:700;">Parental Consent Needed</h3>
                <p style="font-size: 0.725rem; color: var(--text-secondary); margin-top: 0.25rem; line-height: 1.4;">In compliance with India's DPDP Act 2023, a parent/guardian must verify this profile before class setup.</p>
            </div>
            
            <div style="background: var(--bg-primary); border: 1px solid var(--card-border); padding: 0.85rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.8rem; margin-bottom: 0.25rem; color: var(--text-primary); font-weight: 700;">Why is this required?</h4>
                <p style="font-size: 0.7rem; color: var(--text-secondary); line-height: 1.4;">
                    Vedantu takes minor safety seriously. We process basic classroom telemetry to deliver live interactive classes, but legally require validation to protect children's online rights.
                </p>
            </div>
            
            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label>Parent/Guardian's Mobile Number</label>
                <input type="tel" class="form-input" id="proto-parent-phone" placeholder="Enter Parent's 10-digit number" value="9876543210">
            </div>
            
            <button class="btn-primary" id="btn-trigger-consent-notice">
                Notify Parent & Verify
                <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
        </div>
    `;
    
    document.getElementById("btn-trigger-consent-notice").addEventListener("click", () => {
        const phone = document.getElementById("proto-parent-phone").value;
        if (!phone || phone.length < 10) {
            showToast("error", "Please enter a valid mobile number.");
            return;
        }
        
        logSandbox(`[ACTION] Parent mobile entered: ${phone}. Triggering multi-lingual Consent Notice (Section 5).`);
        renderStudentScreen3ConsentNotice(container);
    });
}

// Student flow Screen 3: Multi-lingual Itemised Consent Notice (Section 5/6)
function renderStudentScreen3ConsentNotice(container) {
    logSandbox(`[COMPLIANCE] Loading Consent Notice in Language: ${currentLanguage.toUpperCase()}`);
    
    const text = consentLanguages[currentLanguage];
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Consent Notice</span>
            </div>
            
            <h3 style="font-size: 1rem; margin-bottom: 0.4rem; font-weight:700;">${text.title}</h3>
            
            <!-- Language toggle -->
            <div class="consent-notice-box">
                <div class="notice-header">
                    <span style="font-weight: 700; font-size: 0.7rem; color: var(--brand-primary); letter-spacing: 0.5px;">ITEMISED PURPOSES</span>
                    <select class="notice-lang-select" id="notice-lang-toggle">
                        <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
                        <option value="hi" ${currentLanguage === 'hi' ? 'selected' : ''}>Hindi (हिन्दी)</option>
                    </select>
                </div>
                
                <div class="notice-scroll-body">
                    <p style="margin-bottom: 0.5rem; line-height:1.4;">${text.intro}</p>
                    
                    <div style="border-left: 2px solid var(--brand-primary); padding-left: 0.5rem; margin-bottom: 0.6rem;">
                        <h4 style="margin:0; font-weight:700;">${text.item1_title}</h4>
                        <p style="margin:0; font-size:0.7rem; line-height:1.3;">${text.item1_desc}</p>
                    </div>
                    
                    <div style="border-left: 2px solid var(--text-muted); padding-left: 0.5rem; margin-bottom: 0.6rem;">
                        <h4 style="margin:0; font-weight:700;">${text.item2_title}</h4>
                        <p style="margin:0; font-size:0.7rem; line-height:1.3;">${text.item2_desc}</p>
                        <div style="margin-top: 0.2rem; display: flex; align-items: center; gap: 6px;">
                            <input type="checkbox" id="personalization-opt-in" checked style="cursor:pointer;">
                            <label for="personalization-opt-in" style="font-size: 0.65rem; color: var(--text-primary); cursor: pointer; font-weight:600;">Enable personalization</label>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-tertiary); padding: 0.4rem; border-radius: 4px;">
                        <h4 style="margin:0; font-weight:700;">${text.item3_title}</h4>
                        <p style="margin:0; font-size:0.65rem; line-height:1.3;">${text.item3_desc}</p>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-secondary" id="btn-decline-consent" style="flex:1; margin-top:0;">${text.deny}</button>
                <button class="btn-primary" id="btn-accept-consent" style="flex:2;">
                    ${text.allow}
                </button>
            </div>
        </div>
    `;
    
    // Change language listener
    document.getElementById("notice-lang-toggle").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        logSandbox(`[ACTION] Switched consent notice language to: ${currentLanguage.toUpperCase()}`);
        renderStudentScreen3ConsentNotice(container);
    });
    
    document.getElementById("btn-decline-consent").addEventListener("click", () => {
        logSandbox(`[ACTION] Parent declined data consent. Blocking minor sign-up.`);
        showToast("error", "Data consent declined. Onboarding aborted.");
        renderStudentScreen1(container);
    });
    
    document.getElementById("btn-accept-consent").addEventListener("click", () => {
        const personalizationOptIn = document.getElementById("personalization-opt-in").checked;
        logSandbox(`[ACTION] Consent accepted. Personalization: ${personalizationOptIn ? 'ENABLED (Opt-in)' : 'DISABLED'}`);
        logSandbox(`[COMPLIANCE] Proceeding to identity validation (Verifiable Parental Consent).`);
        renderStudentScreen4VpcChoice(container);
    });
}

// Student flow Screen 4: Verifiable Parental Consent Verification Methods Selection
function renderStudentScreen4VpcChoice(container) {
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Identity Verification</span>
            </div>
            
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; font-weight:700;">Verifiable Consent (VPC)</h3>
            <p style="font-size: 0.725rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">Select a secure method to verify you are a parent/lawful guardian.</p>
            
            <!-- Option A: UPI Penny Drop -->
            <div class="verification-card active" data-method="upi" id="method-card-upi">
                <div class="v-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                </div>
                <div class="v-meta">
                    <h4>Refundable UPI Penny-Drop (₹1)</h4>
                    <p>Verified instantly via bank app. Refunded automatically.</p>
                </div>
            </div>
            
            <!-- Option B: Aadhaar OTP -->
            <div class="verification-card" data-method="aadhaar" id="method-card-aadhaar">
                <div class="v-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                </div>
                <div class="v-meta">
                    <h4>Aadhaar OTP (via DigiLocker)</h4>
                    <p>Verify legal relationship via national ID database.</p>
                </div>
            </div>
            
            <div style="flex:1"></div>
            
            <button class="btn-primary" id="btn-proceed-verification" style="margin-top: 1rem;">
                Proceed with UPI Verification
            </button>
        </div>
    `;
    
    const upiCard = document.getElementById("method-card-upi");
    const aadhaarCard = document.getElementById("method-card-aadhaar");
    const proceedBtn = document.getElementById("btn-proceed-verification");
    
    upiCard.addEventListener("click", () => {
        upiCard.classList.add("active");
        aadhaarCard.classList.remove("active");
        selectedVerificationMethod = "upi";
        proceedBtn.textContent = "Proceed with UPI Verification";
        logSandbox(`[ACTION] Selected verification method: UPI penny-drop.`);
    });
    
    aadhaarCard.addEventListener("click", () => {
        aadhaarCard.classList.add("active");
        upiCard.classList.remove("active");
        selectedVerificationMethod = "aadhaar";
        proceedBtn.textContent = "Proceed with Aadhaar OTP";
        logSandbox(`[ACTION] Selected verification method: Aadhaar OTP.`);
    });
    
    proceedBtn.addEventListener("click", () => {
        if (selectedVerificationMethod === "upi") {
            renderStudentScreen5UpiFlow(container);
        } else {
            renderStudentScreen5AadhaarFlow(container);
        }
    });
}

// Student flow Screen 5-A: UPI Penny-Drop Payment Page
function renderStudentScreen5UpiFlow(container) {
    logSandbox(`[FLOW] Launching UPI Penny-drop Verification Screen.`);
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">UPI Penny-Drop</span>
            </div>
            
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; font-weight:700;">Pay ₹1 (Instant Refund)</h3>
            <p style="font-size: 0.725rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">We will verify your bank-verified legal name through a ₹1 check. The amount is fully refunded in 30 seconds.</p>
            
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Enter Parent's UPI ID</label>
                <input type="text" class="form-input" id="proto-upi-id" placeholder="example@okhdfcbank" value="sunita.jaiswal@okaxis">
                <span style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.15rem;">Supported: GPay, PhonePe, Paytm, BHIM UPI.</span>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 8px; padding: 0.75rem; margin-bottom: 1.5rem; font-size: 0.725rem; color: var(--success-color);">
                <strong>🔒 Secure NPCI API Route</strong>
                <p style="margin-top: 0.15rem; line-height: 1.3; color: var(--text-secondary);">Vedantu never stores UPI passwords or banking details. This is processed securely via regulatory gateways.</p>
            </div>
            
            <button class="btn-primary" id="btn-trigger-upi-simulate">
                Verify & Pay ₹1
            </button>
            <button class="btn-secondary" id="btn-cancel-upi" style="margin-top:0.4rem;">Back</button>
        </div>
    `;
    
    document.getElementById("btn-cancel-upi").addEventListener("click", () => {
        renderStudentScreen4VpcChoice(container);
    });
    
    document.getElementById("btn-trigger-upi-simulate").addEventListener("click", () => {
        const upiId = document.getElementById("proto-upi-id").value;
        if (!upiId || !upiId.includes("@")) {
            showToast("error", "Please enter a valid UPI ID.");
            return;
        }
        
        logSandbox(`[ACTION] UPI authorization request sent to: ${upiId}`);
        logSandbox(`[SYSTEM] Mock payment app request triggered. Simulating parent authorization.`);
        
        // Open Modal to simulate payment app approval
        openModal("Simulate UPI Bank App Approving Payment", `
            <div style="text-align: center;">
                <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--text-secondary); line-height:1.45;">
                    A push notification is simulated on the parent's phone: <strong>"Authorize ₹1 verification pay to Vedantu Compliance"</strong>.
                </p>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button class="btn-secondary" id="modal-sim-decline" style="margin-top:0; font-size:0.75rem; padding: 0.5rem 1rem;">Decline</button>
                    <button class="btn-primary" id="modal-sim-approve" style="background: var(--success-color); font-size:0.75rem; padding: 0.5rem 1rem;">Approve Payment (Enter PIN)</button>
                </div>
            </div>
        `);
        
        document.getElementById("modal-sim-decline").addEventListener("click", () => {
            logSandbox(`[ACTION] Parent declined request inside UPI app.`);
            closeModal();
            showToast("error", "Verification payment declined.");
        });
        
        document.getElementById("modal-sim-approve").addEventListener("click", () => {
            logSandbox(`[SYSTEM] Payment authorized via bank token gateway.`);
            logSandbox(`[COMPLIANCE] NPCI response: ACCOUNT_HOLDER="Sunita Jaiswal", GATEWAY="NPCI_UPI_V1", TRANSACTION="SUCCESS_9182"`);
            logSandbox(`[COMPLIANCE] Parent verified: Sunita Jaiswal (UPI Linked Account). Valid legal consent locked.`);
            logSandbox(`[SYSTEM] Automatic refund request queued: ₹1 refund initiated to: ${upiId}`);
            
            closeModal();
            showToast("success", "Parent Identity Verified! Refund initiated.");
            parentConsentVerified = true;
            
            // Advance to Success screen
            renderStudentSuccessScreen(container);
        });
    });
}

// Student flow Screen 5-B: Aadhaar OTP Verification Page
function renderStudentScreen5AadhaarFlow(container) {
    logSandbox(`[FLOW] Launching Aadhaar Verification Screen.`);
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Aadhaar OTP</span>
            </div>
            
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; font-weight:700;">DigiLocker Integration</h3>
            <p style="font-size: 0.725rem; color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.4;">Verify your identity instantly using your Aadhaar number. A secure OTP will be sent to your registered mobile number.</p>
            
            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label>Parent's Aadhaar Number</label>
                <input type="text" class="form-input" id="proto-aadhaar-num" placeholder="XXXX - XXXX - XXXX" value="1234 5678 9101">
            </div>
            
            <button class="btn-primary" id="btn-send-aadhaar-otp">
                Request Security OTP
            </button>
            <button class="btn-secondary" id="btn-cancel-aadhaar" style="margin-top:0.4rem;">Back</button>
        </div>
    `;
    
    document.getElementById("btn-cancel-aadhaar").addEventListener("click", () => {
        renderStudentScreen4VpcChoice(container);
    });
    
    document.getElementById("btn-send-aadhaar-otp").addEventListener("click", () => {
        const aadhaarNum = document.getElementById("proto-aadhaar-num").value;
        if (!aadhaarNum || aadhaarNum.replace(/\s/g, '').length < 12) {
            showToast("error", "Please enter a valid 12-digit Aadhaar number.");
            return;
        }
        
        logSandbox(`[ACTION] Requesting OTP from UIDAI server for Aadhaar: ${aadhaarNum}`);
        logSandbox(`[SYSTEM] UIDAI Status: OTP sent successfully to mobile linked with Aadhaar ending in 3210.`);
        
        openModal("Enter 6-Digit Aadhaar OTP", `
            <div style="text-align: center;">
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1rem; line-height:1.4;">
                    Enter the mock OTP sent to parent's registered mobile number (use: <strong>123456</strong>):
                </p>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <input type="text" class="form-input" id="modal-otp-input" placeholder="000 000" style="text-align: center; font-size: 1.15rem; letter-spacing: 4px;">
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button class="btn-secondary" id="modal-otp-cancel" style="margin-top:0; font-size:0.75rem; padding: 0.5rem 1rem;">Cancel</button>
                    <button class="btn-primary" id="modal-otp-submit" style="font-size:0.75rem; padding: 0.5rem 1rem;">Submit OTP</button>
                </div>
            </div>
        `);
        
        document.getElementById("modal-otp-cancel").addEventListener("click", closeModal);
        document.getElementById("modal-otp-submit").addEventListener("click", () => {
            const otp = document.getElementById("modal-otp-input").value;
            if (otp === "123456" || otp === "1234") {
                logSandbox(`[COMPLIANCE] UIDAI validation successful: Guardian record verified. Relationship link active.`);
                logSandbox(`[COMPLIANCE] Parent verified: Sunita Jaiswal. Valid legal consent locked.`);
                
                closeModal();
                showToast("success", "Aadhaar authentication successful!");
                parentConsentVerified = true;
                
                renderStudentSuccessScreen(container);
            } else {
                logSandbox(`[ERROR] UIDAI validation failure: INVALID_OTP.`);
                showToast("error", "Incorrect OTP. Please enter 123456.");
            }
        });
    });
}

// Student flow Screen 6: Success State & Child Dashboard onboarding
function renderStudentSuccessScreen(container) {
    logSandbox(`[FLOW] Loading Student Dashboard (Setup Success).`);
    container.innerHTML = `
        <div class="proto-screen" style="justify-content: center; align-items: center; text-align: center;">
            <div style="background: rgba(16, 185, 129, 0.08); width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg style="width: 36px; height: 36px; fill: var(--success-color);" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            
            <h3 style="font-size: 1.25rem; margin-bottom: 0.4rem; font-weight:700;">Consent Verified!</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.4; padding:0 0.5rem;">
                Welcome <strong>Aarav</strong>! Your account has been securely set up with parental clearance.
            </p>
            
            <div style="background: var(--bg-primary); border: 1px solid var(--card-border); padding: 0.85rem; border-radius: 8px; text-align: left; width: 100%; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.725rem; margin-bottom: 0.4rem; border-bottom: 1px solid var(--card-border); padding-bottom: 0.2rem;">
                    <span style="color: var(--text-secondary);">Parent Account:</span>
                    <span style="font-weight:600; color:var(--text-primary);">Sunita Jaiswal</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.725rem; margin-bottom: 0.4rem; border-bottom: 1px solid var(--card-border); padding-bottom: 0.2rem;">
                    <span style="color: var(--text-secondary);">Method:</span>
                    <span style="font-weight:600; text-transform: uppercase; color:var(--text-primary);">${selectedVerificationMethod === 'upi' ? 'UPI Penny-drop' : 'Aadhaar OTP'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.725rem;">
                    <span style="color: var(--text-secondary);">Minor Profiling Ban:</span>
                    <span style="color: var(--success-color); font-weight:600;">ACTIVE (Strict Privacy)</span>
                </div>
            </div>
            
            <button class="btn-primary" id="btn-restart-onboarding" style="width: 100%;">
                Back to Sign-up
            </button>
        </div>
    `;
    
    document.getElementById("btn-restart-onboarding").addEventListener("click", () => {
        parentConsentVerified = false;
        renderStudentScreen1(container);
    });
}

function renderAdultSuccessScreen(container) {
    container.innerHTML = `
        <div class="proto-screen" style="justify-content: center; align-items: center; text-align: center;">
            <div style="background: rgba(16, 185, 129, 0.08); width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg style="width: 36px; height: 36px; fill: var(--success-color);" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            
            <h3 style="font-size: 1.25rem; margin-bottom: 0.4rem; font-weight:700;">Welcome to Vedantu!</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                Your adult student account has been created. Start exploring courses immediately.
            </p>
            
            <button class="btn-primary" id="btn-restart-adult" style="width: 100%;">
                Restart Simulator
            </button>
        </div>
    `;
    
    document.getElementById("btn-restart-adult").addEventListener("click", () => {
        renderStudentScreen1(container);
    });
}

// Parent Flow Screen 1: Parent Privacy Control Center (Right of Access, Erasure, Correction)
let consentState = "active"; // active or revoked

function renderParentPortalHome(container) {
    logSandbox(`[FLOW] Loading Parent Privacy Control Center.`);
    
    if (consentState === "revoked") {
        container.innerHTML = `
            <div class="proto-screen">
                <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                    <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                    <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Privacy Portal</span>
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <div style="background: rgba(239, 68, 68, 0.08); width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <svg style="width: 28px; height: 28px; fill: var(--error-color);" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                    <h3 style="font-size: 1.15rem; font-weight:700;">Consent Withdrawn</h3>
                    <p style="font-size: 0.725rem; color: var(--text-secondary); margin-top: 0.4rem; line-height: 1.4; padding: 0 0.5rem;">
                        Parent consent has been revoked for student: <strong>Aarav Jaiswal</strong>. Student account access is currently frozen, and all personal data is scheduled for erasure.
                    </p>
                    <button class="btn-primary" id="btn-regrant-consent" style="margin: 1.5rem auto 0; width: 80%;">
                        Re-grant Parental Consent
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById("btn-regrant-consent").addEventListener("click", () => {
            consentState = "active";
            logSandbox(`[ACTION] Parent re-granting consent. Restarting account access.`);
            showToast("success", "Parent consent active.");
            renderParentPortalHome(container);
        });
        return;
    }
    
    container.innerHTML = `
        <div class="proto-screen">
            <div class="proto-brand-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem;">
                <img src="https://www.vedantu.com/static/images/vedantu-logo.svg" alt="Vedantu" style="height: 18px; width: auto; display: block;">
                <span style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary); margin-left: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">Privacy Portal</span>
            </div>
            
            <div class="dash-heading">
                <h2>Parent Privacy Control</h2>
                <span style="font-size:0.7rem;">Manage permissions & data rights for Aarav Jaiswal</span>
            </div>
            
            <div class="parent-consent-card">
                <div class="consent-row-status">
                    <span style="font-size: 0.75rem; font-weight:600; color:var(--text-primary);">Consent Authorization</span>
                    <span class="status-badge active">ACTIVE & COMPLIANT</span>
                </div>
                <p style="font-size: 0.675rem; color: var(--text-secondary); line-height: 1.3;">
                    Authorized via UPI Penny-drop. Data processing strictly restricted to essential K-12 tutoring delivery.
                </p>
                <div class="action-row-btn">
                    <button class="btn-access" id="btn-right-access">Request Summary</button>
                    <button class="btn-revoke" id="btn-right-revoke">Revoke Consent</button>
                </div>
            </div>

            <!-- Self Serve Data Rights Options -->
            <div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.5px; font-weight:700;">Exercise Data Rights (Section 11-14)</h4>
                
                <!-- Correction card -->
                <div style="background: var(--bg-primary); border: 1px solid var(--card-border); padding: 0.75rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;" id="btn-right-correct">
                    <div>
                        <h5 style="font-size: 0.8rem; color: var(--text-primary); font-weight:700;">Right to Correct/Complete</h5>
                        <p style="font-size: 0.65rem; color: var(--text-secondary);">Request updates to student spelling or grade records.</p>
                    </div>
                    <svg style="width: 14px; height: 14px; fill: var(--text-muted);" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </div>

                <!-- Nominate card -->
                <div style="background: var(--bg-primary); border: 1px solid var(--card-border); padding: 0.75rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;" id="btn-right-nominate">
                    <div>
                        <h5 style="font-size: 0.8rem; color: var(--text-primary); font-weight:700;">Right to Nominate Representative</h5>
                        <p style="font-size: 0.65rem; color: var(--text-secondary);">Nominate a legal representative to manage minor settings.</p>
                    </div>
                    <svg style="width: 14px; height: 14px; fill: var(--text-muted);" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
            </div>
        </div>
    `;
    
    // Wire rights events
    document.getElementById("btn-right-access").addEventListener("click", () => {
        logSandbox(`[ACTION] Parent requested data summary (Right of Access, Section 11).`);
        
        openModal("Section 11: Minor Data Summary", `
            <div style="font-size: 0.75rem;">
                <p style="margin-bottom: 0.75rem; color: var(--text-secondary);">Active processing data list for minor: <strong>Aarav Jaiswal</strong></p>
                
                <table style="width:100%; border-collapse: collapse; margin-bottom: 1.25rem; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--card-border); color: var(--text-primary); font-weight:700;">
                            <th style="padding: 0.4rem 0;">Data Type</th>
                            <th style="padding: 0.4rem 0;">Storage Limit</th>
                            <th style="padding: 0.4rem 0;">Purpose</th>
                        </tr>
                    </thead>
                    <tbody style="color: var(--text-secondary);">
                        <tr style="border-bottom: 1px solid var(--card-border);">
                            <td style="padding: 0.35rem 0; color:var(--text-primary);">Class Attendance</td>
                            <td style="padding: 0.35rem 0;">90 Days</td>
                            <td style="padding: 0.35rem 0;">Session Attendance</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--card-border);">
                            <td style="padding: 0.35rem 0; color:var(--text-primary);">Quiz Analytics</td>
                            <td style="padding: 0.35rem 0;">180 Days</td>
                            <td style="padding: 0.35rem 0;">Performance report</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.35rem 0; color:var(--text-primary);">Live Chat Logs</td>
                            <td style="padding: 0.35rem 0;">30 Days</td>
                            <td style="padding: 0.35rem 0;">Teacher interaction</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn-primary" onclick="closeModal()" style="width:100%; font-size:0.75rem; padding:0.5rem 1rem;">Close Summary</button>
            </div>
        `);
    });
    
    document.getElementById("btn-right-revoke").addEventListener("click", () => {
        logSandbox(`[ACTION] Parent clicked Revoke Consent.`);
        
        openModal("Section 6(4): Revoke Parent Consent", `
            <div style="text-align: center;">
                <p style="font-size: 0.8rem; margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.4;">
                    WARNING: Revoking consent will freeze Aarav's access immediately. In compliance with DPDP Right to Erasure, all active classroom telemetry and quiz records will be permanently purged within 7 business days.
                </p>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button class="btn-secondary" onclick="closeModal()" style="margin-top:0; font-size:0.75rem; padding: 0.5rem 1rem;">Cancel</button>
                    <button class="btn-primary" id="modal-confirm-revoke" style="background: var(--error-color); font-size:0.75rem; padding: 0.5rem 1rem;">Revoke & Delete Data</button>
                </div>
            </div>
        `);
        
        document.getElementById("modal-confirm-revoke").addEventListener("click", () => {
            logSandbox(`[COMPLIANCE] Parent Consent REVOKED. User account blocked. Queued data purge job on DB.`);
            consentState = "revoked";
            closeModal();
            showToast("error", "Consent revoked. Purge initiated.");
            renderParentPortalHome(container);
        });
    });
    
    document.getElementById("btn-right-correct").addEventListener("click", () => {
        logSandbox(`[ACTION] Parent requested data correction (Section 12).`);
        
        openModal("Section 12: Request Data Correction", `
            <div style="font-size: 0.75rem;">
                <p style="margin-bottom: 0.75rem; color: var(--text-secondary);">Request updates to profile records:</p>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Corrected Student Name</label>
                    <input type="text" class="form-input" id="correct-name-val" value="${minorStudentName}">
                </div>
                <button class="btn-primary" id="btn-submit-correct" style="width:100%; font-size:0.75rem; padding:0.5rem 1rem;">Submit Correction</button>
            </div>
        `);
        
        document.getElementById("btn-submit-correct").addEventListener("click", () => {
            const val = document.getElementById("correct-name-val").value;
            minorStudentName = val;
            logSandbox(`[COMPLIANCE] Name correction request approved: New Name="${val}"`);
            closeModal();
            showToast("success", "Profile corrected successfully.");
            renderParentPortalHome(container);
        });
    });
    
    document.getElementById("btn-right-nominate").addEventListener("click", () => {
        logSandbox(`[ACTION] Parent requested representative nomination (Section 14).`);
        
        openModal("Section 14: Nominate Representative", `
            <div style="font-size: 0.75rem;">
                <p style="margin-bottom: 0.75rem; color: var(--text-secondary);">Nominate a legal guardian to act on your behalf:</p>
                <div class="form-group" style="margin-bottom: 0.85rem;">
                    <label>Representative's Full Name</label>
                    <input type="text" class="form-input" id="nominee-name" placeholder="Enter Full Name">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Mobile Number</label>
                    <input type="tel" class="form-input" id="nominee-phone" placeholder="10-digit number">
                </div>
                <button class="btn-primary" id="btn-submit-nominate" style="width:100%; font-size:0.75rem; padding:0.5rem 1rem;">Nominate & Lock</button>
            </div>
        `);
        
        document.getElementById("btn-submit-nominate").addEventListener("click", () => {
            const name = document.getElementById("nominee-name").value;
            if (!name) {
                showToast("error", "Please enter nominee name.");
                return;
            }
            logSandbox(`[COMPLIANCE] Nominee representative registered: ${name}`);
            closeModal();
            showToast("success", "Representative nominated!");
        });
    });
}

// Sandbox Logging Helper
function logSandbox(message) {
    const sandboxLogs = document.getElementById("sandbox-logs");
    if (!sandboxLogs) return;
    
    const div = document.createElement("div");
    div.className = "log-line";
    
    if (message.includes("[SYSTEM]")) {
        div.className = "log-line system";
    } else if (message.includes("[COMPLIANCE]")) {
        div.className = "log-line success";
    } else if (message.includes("[ACTION]")) {
        div.className = "log-line user";
    } else if (message.includes("[ERROR]")) {
        div.className = "log-line error";
    }
    
    div.textContent = message;
    sandboxLogs.appendChild(div);
    sandboxLogs.scrollTop = sandboxLogs.scrollHeight;
}


/* ==========================================
   PM COMPLIANCE & ANALYTICS DASHBOARD
   ========================================== */
function initDashboard() {
    renderDashboardCharts();
    
    // Diagnostic toggle button
    const startDiagBtn = document.getElementById("start-diagnostic");
    const diagWorkspace = document.getElementById("diagnostic-workspace");
    
    startDiagBtn.addEventListener("click", () => {
        if (diagWorkspace.classList.contains("hidden")) {
            diagWorkspace.classList.remove("hidden");
            startDiagBtn.textContent = "Close Diagnostic Workspace";
            logSandbox(`[SYSTEM] Interactive Hypothesis Tree Explorer activated.`);
            initHypothesisTree();
        } else {
            diagWorkspace.classList.add("hidden");
            startDiagBtn.textContent = "Initialize Diagnostic Mode";
            logSandbox(`[SYSTEM] Closed Diagnostic Workspace.`);
        }
    });
}

function renderDashboardCharts() {
    // 1. Consent Conversion Line Graph (SVG) - Minimal Light Styling
    const lineContainer = document.getElementById("trend-chart-container");
    if (lineContainer) {
        lineContainer.innerHTML = `
            <svg viewBox="0 0 500 220" class="chart-line-svg">
                <!-- Grid Lines (Clean Light Theme) -->
                <line x1="40" y1="20" x2="480" y2="20" stroke="#F1F5F9" stroke-width="1.5"></line>
                <line x1="40" y1="60" x2="480" y2="60" stroke="#F1F5F9" stroke-width="1.5"></line>
                <line x1="40" y1="100" x2="480" y2="100" stroke="#F1F5F9" stroke-width="1.5"></line>
                <line x1="40" y1="140" x2="480" y2="140" stroke="#F1F5F9" stroke-width="1.5"></line>
                <line x1="40" y1="180" x2="480" y2="180" stroke="#E2E8F0" stroke-width="1.5"></line>
                
                <!-- Target Line (Goal: 78%) -->
                <line x1="40" y1="64" x2="480" y2="64" stroke="#10B981" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6"></line>
                <text x="430" y="56" fill="#10B981" font-size="8" font-weight="700">GOAL: 78%</text>

                <!-- Y Axis Labels -->
                <text x="15" y="24" fill="#94A3B8" font-size="8">100%</text>
                <text x="15" y="64" fill="#94A3B8" font-size="8">80%</text>
                <text x="15" y="104" fill="#94A3B8" font-size="8">60%</text>
                <text x="15" y="144" fill="#94A3B8" font-size="8">40%</text>
                <text x="15" y="184" fill="#94A3B8" font-size="8">20%</text>

                <!-- Chart Line: Showing metric drop around day 20 -->
                <path d="M 40,68 
                         L 80,67 
                         L 120,68 
                         L 160,65 
                         L 200,68 
                         L 240,66 
                         L 280,69 
                         L 320,67 
                         L 360,118 
                         L 400,122 
                         L 440,124 
                         L 480,123" 
                      fill="none" stroke="var(--brand-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                
                <!-- Highlight Drop Area -->
                <rect x="340" y="15" width="140" height="175" fill="rgba(239, 68, 68, 0.03)" rx="4"></rect>
                <line x1="340" y1="20" x2="340" y2="180" stroke="rgba(239, 68, 68, 0.25)" stroke-width="1.25" stroke-dasharray="2,2"></line>
                <text x="348" y="32" fill="#EF4444" font-size="8" font-weight="700">METRIC DROP DETECTED (-15.4%)</text>
                
                <!-- X Axis Labels (Days) -->
                <text x="40" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 1</text>
                <text x="120" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 7</text>
                <text x="200" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 14</text>
                <text x="280" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 21</text>
                <text x="360" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 28</text>
                <text x="440" y="200" fill="#94A3B8" font-size="8" text-anchor="middle">Day 30</text>
            </svg>
        `;
    }

    // 2. Language Notice Distribution Bar Chart (SVG) - Minimal Light Styling
    const pieContainer = document.getElementById("pie-chart-container");
    if (pieContainer) {
        pieContainer.innerHTML = `
            <svg viewBox="0 0 320 220" class="chart-line-svg">
                <!-- English (45%) -->
                <rect x="30" y="30" width="130" height="14" fill="var(--brand-primary)" rx="3"></rect>
                <text x="175" y="41" fill="var(--text-primary)" font-size="9" font-weight="600">English (45%)</text>
                
                <!-- Hindi (35%) -->
                <rect x="30" y="65" width="101" height="14" fill="var(--brand-secondary)" rx="3"></rect>
                <text x="145" y="76" fill="var(--text-primary)" font-size="9" font-weight="600">Hindi (35%)</text>
                
                <!-- Telugu (10%) -->
                <rect x="30" y="100" width="29" height="14" fill="var(--warning-color)" rx="3"></rect>
                <text x="70" y="111" fill="var(--text-primary)" font-size="9" font-weight="600">Telugu (10%)</text>
                
                <!-- Tamil (6%) -->
                <rect x="30" y="135" width="17" height="14" fill="var(--success-color)" rx="3"></rect>
                <text x="58" y="146" fill="var(--text-primary)" font-size="9" font-weight="600">Tamil (6%)</text>
                
                <!-- Others (4%) -->
                <rect x="30" y="170" width="11" height="14" fill="var(--text-muted)" rx="3"></rect>
                <text x="50" y="181" fill="var(--text-primary)" font-size="9" font-weight="600">Others (4%)</text>
            </svg>
        `;
    }
}

/* ==========================================
   PM INTERACTIVE DIAGNOSTIC EXPLORER (HYPOTHESIS TREE)
   ========================================== */
const HYPOTHESIS_TREE_DATA = {
    id: "drop-root",
    title: "15% Conversion Drop",
    type: "root",
    assessment: "The North Star Metric dropped on Day 19 of launch without any releases. Examine Level 1 sub-branches.",
    children: [
        {
            id: "tech-fail",
            title: "Technical Failures",
            type: "category",
            assessment: "Investigate if technical gateways or communications platforms failed parents during registration.",
            children: [
                {
                    id: "upi-timeout",
                    title: "UPI Gateway Timeouts",
                    type: "leaf",
                    query: `SELECT date_trunc('hour', timestamp) AS hr, 
       status, 
       count(*), 
       avg(latency_ms) 
FROM gateway_logs 
WHERE timestamp > '2026-06-20' 
  AND provider = 'NPCI_UPI' 
GROUP BY hr, status 
ORDER BY hr DESC;`,
                    data: `
                        <table style="width:100%; border-collapse: collapse; font-size: 0.775rem; text-align: left;">
                            <thead>
                                <tr style="color:var(--text-primary); border-bottom: 1px solid var(--card-border); font-weight:700;">
                                    <th style="padding:0.4rem 0;">Hour</th>
                                    <th>Status</th>
                                    <th>Avg Latency</th>
                                    <th style="color:var(--error-color);">Timeout Rate</th>
                                </tr>
                            </thead>
                            <tbody style="color:var(--text-secondary);">
                                <tr style="border-bottom: 1px solid var(--card-border);">
                                    <td style="padding:0.35rem 0;">2026-06-25 17:00</td>
                                    <td style="color:var(--warning-color); font-weight:600;">TIMEOUT_E301</td>
                                    <td>12.4s</td>
                                    <td style="color:var(--error-color); font-weight:700;">28.4%</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--card-border);">
                                    <td style="padding:0.35rem 0;">2026-06-25 18:00</td>
                                    <td style="color:var(--warning-color); font-weight:600;">TIMEOUT_E301</td>
                                    <td>14.1s</td>
                                    <td style="color:var(--error-color); font-weight:700;">32.1%</td>
                                </tr>
                                <tr>
                                    <td style="padding:0.35rem 0;">2026-06-25 19:00</td>
                                    <td style="color:var(--success-color); font-weight:600;">SUCCESS</td>
                                    <td>1.8s</td>
                                    <td>2.1%</td>
                                </tr>
                            </tbody>
                        </table>
                    `,
                    assessment: `🚨 <strong>ROOT CAUSE CONFIRMED!</strong><br>
                                 The telemetry data reveals a massive spike in bank timeout exceptions (up to 32%) on our primary UPI validation partner routes during peak after-school hours (4 PM - 8 PM IST). Parents attempting validation faced endless load times, leading to high drop-offs.<br><br>
                                 <strong>Action Plan:</strong> Enable automatic fallback to secondary bank routing provider. Trigger Aadhaar OTP option dynamically if UPI latency exceeds 4 seconds.`
                },
                {
                    id: "otp-delivery",
                    title: "OTP SMS Latency",
                    type: "leaf",
                    query: `SELECT provider, 
       delivery_success_rate, 
       avg_delivery_seconds 
FROM sms_gateway_telemetry 
WHERE date_filter = 'LAST_14_DAYS';`,
                    data: `
                        <div style="font-size:0.775rem; color:var(--text-secondary); line-height: 1.4;">
                            <p><strong>Primary SMS Provider (Gupshup):</strong></p>
                            <p>• Delivery Success Rate: <strong style="color:var(--success-color);">98.6%</strong></p>
                            <p>• Average Delivery Delay: <strong>2.1 seconds</strong></p>
                            <p style="margin-top: 0.5rem; color: var(--text-muted);">Conclusion: SMS delivery rails remain fully green. No delivery block detected.</p>
                        </div>
                    `,
                    assessment: `❌ <strong>Hypothesis Refuted.</strong><br>
                                 The SMS gateway telemetry shows OTP delivery times remained well within SLA parameters (&lt;3s). OTP delivery latency was not responsible for the conversion decline.`
                }
            ]
        },
        {
            id: "user-experience",
            title: "User Experience Issues",
            type: "category",
            assessment: "Analyze if the user flow layouts or notice lengths created user drop-offs due to fatigue.",
            children: [
                {
                    id: "notice-fatigue",
                    title: "Consent Notice Fatigue",
                    type: "leaf",
                    query: `SELECT page_section, 
       bounce_rate, 
       avg_scroll_depth 
FROM google_analytics_consent_page 
LIMIT 5;`,
                    data: `
                        <div style="font-size:0.775rem; color:var(--text-secondary); line-height: 1.4;">
                            <p>• Notice Modal Scroll Depth: <strong>92.4% completed</strong></p>
                            <p>• Bounce Rate on Notice screen: <strong>2.4% (Flat vs. Control)</strong></p>
                            <p style="margin-top:0.5rem; color: var(--text-muted);">Note: Parents are scrolling and reading the notice. Multilingual translation support keeps bounces low.</p>
                        </div>
                    `,
                    assessment: `❌ <strong>Hypothesis Refuted.</strong><br>
                                 There is no sign of notice page exhaustion or fatigue. The itemised notice UI design performed efficiently, and bounce rates were completely flat.`
                },
                {
                    id: "modal-dismissals",
                    title: "Notice Modal Dismissals",
                    type: "leaf",
                    query: `SELECT count(event), 
       browser_agent 
FROM amplitude_events 
WHERE event = 'dismiss_consent_notice' 
GROUP BY browser_agent;`,
                    data: `
                        <div style="font-size:0.775rem; color:var(--text-secondary); line-height: 1.4;">
                            <p>• Total Dismiss Events: <strong>142 occurrences</strong></p>
                            <p>• Dismiss / Load Ratio: <strong>1.1%</strong></p>
                            <p style="margin-top:0.5rem; color:var(--text-muted);">Conclusion: Dismiss rates remain minor and unchanged.</p>
                        </div>
                    `,
                    assessment: `❌ <strong>Hypothesis Refuted.</strong><br>
                                 Dismissal stats did not increase. Users did not close the window due to design annoyance.`
                }
            ]
        },
        {
            id: "trust-friction",
            title: "Trust & Compliance Friction",
            type: "category",
            assessment: "Investigate if parents hesitated to submit financial UPI detail verification.",
            children: [
                {
                    id: "upi-fear",
                    title: "UPI Security Suspicion",
                    type: "leaf",
                    query: `SELECT topic, 
       count(*) 
FROM support_tickets 
WHERE timestamp > '2026-06-15' 
GROUP BY topic;`,
                    data: `
                        <div style="font-size:0.775rem; color:var(--text-secondary); line-height: 1.4;">
                            <p>• Ticket: "Why UPI required?" -> <strong>12 issues</strong></p>
                            <p>• Ticket: "Aadhaar authentication failed" -> <strong>8 issues</strong></p>
                            <p>• Ticket: "Refund delay queries" -> <strong>19 issues</strong></p>
                            <p style="margin-top:0.5rem; color:var(--text-muted);">Conclusion: Privacy concerns represent less than 0.2% of total support volume.</p>
                        </div>
                    `,
                    assessment: `❌ <strong>Hypothesis Refuted.</strong><br>
                                 Parent ticket submissions regarding safety, fraud or suspicion of the UPI mechanism were negligible. Clear explanation copy inside the UI successfully mitigates security fears.`
                }
            ]
        }
    ]
};

function initHypothesisTree() {
    const container = document.getElementById("hypothesis-tree");
    container.innerHTML = "";
    
    // Render Root Node
    const rootNode = document.createElement("div");
    rootNode.className = "tree-node root";
    rootNode.innerHTML = `
        <div class="node-box root-node" id="node-${HYPOTHESIS_TREE_DATA.id}">
            <span>${HYPOTHESIS_TREE_DATA.title}</span>
            <span class="node-status-dot"></span>
        </div>
    `;
    container.appendChild(rootNode);
    
    // Add Click listener for root
    document.getElementById(`node-${HYPOTHESIS_TREE_DATA.id}`).addEventListener("click", () => {
        selectNode(HYPOTHESIS_TREE_DATA);
    });

    // Render Sub-branches
    HYPOTHESIS_TREE_DATA.children.forEach(category => {
        const catNode = document.createElement("div");
        catNode.className = "tree-node";
        catNode.style.marginLeft = "1.5rem";
        catNode.innerHTML = `
            <div class="node-box" id="node-${category.id}" style="border-left: 2px solid var(--brand-secondary);">
                <span><strong>L1:</strong> ${category.title}</span>
                <span class="node-status-dot"></span>
            </div>
        `;
        container.appendChild(catNode);
        
        document.getElementById(`node-${category.id}`).addEventListener("click", () => {
            selectNode(category);
        });
        
        // Render Leafs under category
        category.children.forEach(leaf => {
            const leafNode = document.createElement("div");
            leafNode.className = "tree-node";
            leafNode.style.marginLeft = "3rem";
            
            let classText = "";
            if (leaf.id === "upi-timeout") {
                classText = "class='node-box verified-cause'";
            } else {
                classText = "class='node-box'";
            }
            
            leafNode.innerHTML = `
                <div ${classText} id="node-${leaf.id}">
                    <span><strong>L2:</strong> ${leaf.title}</span>
                    <span class="node-status-dot"></span>
                </div>
            `;
            container.appendChild(leafNode);
            
            document.getElementById(`node-${leaf.id}`).addEventListener("click", () => {
                selectNode(leaf);
            });
        });
    });
}

function selectNode(node) {
    const allNodeBoxes = document.querySelectorAll(".node-box");
    allNodeBoxes.forEach(box => box.classList.remove("selected"));
    
    const targetBox = document.getElementById(`node-${node.id}`);
    if (targetBox) {
        targetBox.classList.add("selected");
    }
    
    // Show details in inspector
    document.getElementById("inspector-empty").classList.add("hidden");
    
    const contentPanel = document.getElementById("inspector-content");
    contentPanel.classList.remove("hidden");
    
    document.getElementById("node-title").textContent = `Selected Node: ${node.title}`;
    
    const queryBlock = document.querySelector(".query-block");
    const nodeQuery = document.getElementById("node-query");
    const dataDisplay = document.getElementById("node-data-display");
    const assessmentBox = document.getElementById("node-pm-assessment");
    
    if (node.type === "leaf") {
        queryBlock.classList.remove("hidden");
        nodeQuery.textContent = node.query;
        dataDisplay.innerHTML = node.data;
        assessmentBox.innerHTML = node.assessment;
        
        if (node.id === "upi-timeout") {
            assessmentBox.className = "pm-assessment success-box";
        } else {
            assessmentBox.className = "pm-assessment";
        }
    } else {
        queryBlock.classList.add("hidden");
        dataDisplay.innerHTML = `<p style="color:var(--text-secondary);">${node.assessment}</p>`;
        assessmentBox.innerHTML = `<strong>Category Assessment:</strong> Click on L2 sub-leaf nodes under <em>${node.title}</em> to perform diagnostic metrics queries.`;
        assessmentBox.className = "pm-assessment";
    }
    
    logSandbox(`[ACTION] Investigated diagnostic branch: ${node.title}`);
}


/* ==========================================
   GLOBAL COMMON UI HELPERS (MODALS & TOASTS)
   ========================================== */
function openModal(title, bodyHtml) {
    const overlay = document.getElementById("modal-overlay");
    const titleEl = document.getElementById("modal-title");
    const bodyEl = document.getElementById("modal-body");
    
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    overlay.classList.remove("hidden");
}

function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.classList.add("hidden");
}

function showToast(type, message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let typeLabel = "Info";
    if (type === "success") typeLabel = "Success";
    if (type === "error") typeLabel = "Error";
    if (type === "warning") typeLabel = "Warning";
    
    toast.innerHTML = `
        <div>
            <strong>${typeLabel}:</strong> ${message}
        </div>
        <span style="cursor:pointer; opacity:0.7; font-size:1.15rem; margin-left:0.5rem;" onclick="this.parentElement.remove()">&times;</span>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}
