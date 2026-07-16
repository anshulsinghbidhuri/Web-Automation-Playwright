import { Before, BeforeStep, AfterStep, After, AfterAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'reports');
const screenshotsDir = path.join(reportsDir, 'screenshots');
const reportJsonPath = path.join(reportsDir, 'cucumber-report.json');
const reportHtmlPath = path.join(reportsDir, 'index.html');

const scenarioReports = [];

function ensureReportDirs() {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  fs.mkdirSync(reportsDir, { recursive: true });
}

function sanitizeFileName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'scenario';
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDuration(durationMs) {
  return typeof durationMs === 'number' && durationMs >= 0 ? `${durationMs} ms` : '—';
}

function getStatusClass(status) {
  const normalized = String(status || '').toLowerCase();
  if (normalized === 'passed') return 'passed';
  if (normalized === 'failed') return 'failed';
  if (normalized === 'skipped') return 'skipped';
  return 'pending';
}

function buildStatusChart(summary) {
  const bars = ['PASSED', 'FAILED', 'SKIPPED', 'PENDING'].map((label) => {
    const value = summary[label.toLowerCase()] || 0;
    const total = summary.total || 1;
    const width = Math.max(8, Math.round((value / total) * 100));
    return `
      <div class="bar-row">
        <div class="bar-label">${escapeHtml(label)}</div>
        <div class="bar-track">
          <div class="bar-fill ${label.toLowerCase()}" style="width:${width}%"></div>
        </div>
        <div class="bar-value">${value}</div>
      </div>`;
  }).join('');

  return `<div class="chart">${bars}</div>`;
}

function writeReportFiles() {
  ensureReportDirs();
  fs.writeFileSync(reportJsonPath, JSON.stringify(scenarioReports, null, 2));

  const summary = {
    total: scenarioReports.length,
    passed: scenarioReports.filter((item) => String(item.status).toUpperCase() === 'PASSED').length,
    failed: scenarioReports.filter((item) => String(item.status).toUpperCase() === 'FAILED').length,
    skipped: scenarioReports.filter((item) => String(item.status).toUpperCase() === 'SKIPPED').length,
    pending: scenarioReports.filter((item) => String(item.status).toUpperCase() === 'PENDING').length,
  };

  const timeline = scenarioReports.map((item) => {
    const time = item.startedAt ? new Date(item.startedAt).toLocaleString() : '—';
    return `<li><span class="timeline-dot ${getStatusClass(item.status)}"></span><strong>${escapeHtml(item.name)}</strong><br/>${escapeHtml(item.feature || '')}<br/><small>${escapeHtml(time)} · ${escapeHtml(item.status)}</small></li>`;
  }).join('');

  const details = scenarioReports.map((item) => {
    const steps = (item.steps || []).map((step) => `
      <li class="step-item">
        <div class="step-top">
          <span class="badge ${getStatusClass(step.status)}">${escapeHtml(step.status)}</span>
          <strong>${escapeHtml(step.name)}</strong>
        </div>
        <div class="step-meta">${escapeHtml(formatDuration(step.durationMs))}</div>
        ${step.error ? `<pre>${escapeHtml(step.error)}</pre>` : ''}
      </li>`).join('');

    const screenshotLink = item.screenshot ? `<a href="${item.screenshot}" target="_blank">Open screenshot</a>` : '—';
    const errorBlock = item.error ? `<pre>${escapeHtml(item.error)}</pre>` : '—';

    return `
      <details class="scenario-card" open>
        <summary>
          <span class="badge ${getStatusClass(item.status)}">${escapeHtml(item.status)}</span>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="scenario-meta">${escapeHtml(item.feature || '')}</span>
        </summary>
        <div class="scenario-body">
          <div class="scenario-grid">
            <div><strong>Feature:</strong> ${escapeHtml(item.feature || '')}</div>
            <div><strong>Duration:</strong> ${escapeHtml(formatDuration(item.durationMs))}</div>
            <div><strong>Tags:</strong> ${escapeHtml((item.tags || []).join(', ') || '—')}</div>
            <div><strong>Screenshot:</strong> ${screenshotLink}</div>
          </div>
          <h4>Execution steps</h4>
          <ul class="steps-list">${steps || '<li>No steps recorded</li>'}</ul>
          <h4>Error</h4>
          ${errorBlock}
        </div>
      </details>`;
  }).join('');

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Automation Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 24px; background: #f4f6fb; color: #111827; }
        h1 { margin-bottom: 8px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 18px 0 24px; }
        .card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
        .card h3 { margin: 0 0 8px; font-size: 13px; text-transform: uppercase; color: #6b7280; }
        .card p { margin: 0; font-size: 24px; font-weight: 700; }
        .chart { margin-bottom: 24px; background: white; border-radius: 12px; padding: 16px; box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
        .bar-row { display: grid; grid-template-columns: 80px 1fr 40px; gap: 10px; align-items: center; margin: 8px 0; }
        .bar-track { height: 10px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
        .bar-fill { height: 100%; }
        .bar-fill.passed { background: #22c55e; }
        .bar-fill.failed { background: #ef4444; }
        .bar-fill.skipped { background: #f59e0b; }
        .bar-fill.pending { background: #6b7280; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .panel { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
        .timeline { list-style: none; padding: 0; margin: 0; }
        .timeline li { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .timeline-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }
        .timeline-dot.passed { background: #22c55e; }
        .timeline-dot.failed { background: #ef4444; }
        .timeline-dot.skipped { background: #f59e0b; }
        .timeline-dot.pending { background: #6b7280; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-right: 8px; }
        .badge.passed { background: #dcfce7; color: #166534; }
        .badge.failed { background: #fee2e2; color: #991b1b; }
        .badge.skipped, .badge.pending { background: #fef3c7; color: #92400e; }
        .scenario-card { margin-bottom: 12px; background: white; border-radius: 12px; padding: 12px 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .scenario-meta { color: #6b7280; font-size: 12px; margin-left: 8px; }
        .scenario-body { margin-top: 10px; }
        .scenario-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-bottom: 10px; }
        .steps-list { list-style: none; padding: 0; margin: 0; }
        .step-item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px; margin-bottom: 8px; }
        .step-top { display: flex; align-items: center; gap: 8px; }
        .step-meta { font-size: 12px; color: #6b7280; margin-top: 4px; }
        pre { white-space: pre-wrap; word-break: break-word; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>Automation Test Report</h1>
      <p>Detailed pass/fail summary with screenshots, timeline, and executed steps.</p>
      <div class="summary">
        <div class="card"><h3>Total</h3><p>${summary.total}</p></div>
        <div class="card"><h3>Passed</h3><p>${summary.passed}</p></div>
        <div class="card"><h3>Failed</h3><p>${summary.failed}</p></div>
        <div class="card"><h3>Skipped</h3><p>${summary.skipped}</p></div>
        <div class="card"><h3>Pending</h3><p>${summary.pending}</p></div>
      </div>
      ${buildStatusChart(summary)}
      <div class="grid">
        <div class="panel">
          <h2>Execution Timeline</h2>
          <ul class="timeline">${timeline || '<li>No executions yet</li>'}</ul>
        </div>
        <div class="panel">
          <h2>Scenario Details</h2>
          ${details || '<p>No scenario details yet.</p>'}
        </div>
      </div>
    </body>
  </html>`;

  fs.writeFileSync(reportHtmlPath, html);
}

function createScenarioReport(scenario) {
  return {
    name: scenario.pickle?.name || 'Unnamed scenario',
    feature: scenario.pickle?.uri || '',
    uri: scenario.pickle?.uri || '',
    tags: (scenario.pickle?.tags || []).map((tag) => tag.name),
    status: 'PENDING',
    durationMs: 0,
    startedAt: new Date().toISOString(),
    error: '',
    stack: '',
    screenshot: '',
    steps: []
  };
}

export function registerReportHooks() {
  Before(async function (scenario) {
    this.scenarioReport = createScenarioReport(scenario);
    scenarioReports.push(this.scenarioReport);
  });

  BeforeStep(async function (step) {
    const currentScenario = this.scenarioReport;
    const stepTitle = step.pickleStep?.text || step.text || 'Step';
    currentScenario?.steps.push({
      name: stepTitle,
      status: 'PENDING',
      durationMs: 0,
      startedAt: new Date().toISOString(),
      error: ''
    });
    this.currentStepReport = currentScenario?.steps[currentScenario.steps.length - 1];
  });

  AfterStep(async function (step) {
    const stepReport = this.currentStepReport;
    if (!stepReport) return;
    const result = step.result;
    stepReport.status = String(result?.status || 'UNKNOWN').toUpperCase();
    if (result?.duration) {
      stepReport.durationMs = result.duration.toMillis ? result.duration.toMillis() : Number(result.duration);
    }
    if (result?.exception) {
      stepReport.error = result.exception.message || String(result.exception);
    }

    if (stepReport.status === 'FAILED' && this.page && this.scenarioReport && !this.scenarioReport.screenshot) {
      const fileName = `${sanitizeFileName(this.scenarioReport.name)}-${Date.now()}.png`;
      const screenshotPath = path.join(screenshotsDir, fileName);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      this.scenarioReport.screenshot = `screenshots/${fileName}`;
      writeReportFiles();
    }
  });

  After(async function (scenario) {
    const report = this.scenarioReport;
    if (!report) return;

    const result = scenario.result;
    const status = result?.status || 'UNKNOWN';
    report.status = String(status).toUpperCase();
    if (result?.duration) {
      report.durationMs = result.duration.toMillis ? result.duration.toMillis() : Number(result.duration);
    }

    if (result?.exception) {
      report.error = result.exception.message || String(result.exception);
      report.stack = result.exception.stack || '';
    }

    if (report.status === 'FAILED' && !report.screenshot && this.page) {
      const fileName = `${sanitizeFileName(report.name)}-${Date.now()}.png`;
      const screenshotPath = path.join(screenshotsDir, fileName);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      report.screenshot = `screenshots/${fileName}`;
    }

    writeReportFiles();
  });

  AfterAll(async function () {
    writeReportFiles();
  });
}

registerReportHooks();
