"use client";

import { useMemo, useState, useEffect } from "react";
import { RequireAuth } from "@/components/require-auth";
import { apiRequest } from "@/lib/api-client";

const templates = ["Molekül Sahnesi", "Laboratuvar Akışı", "3D Hücre Modeli", "Eğitim İnfografiği"];
const colors = ["#6b16e2", "#0f766e", "#f59e0b", "#dc2626"];

const escapeSvgText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type VisualProject = {
  id: string;
  title: string;
  template: string;
  sceneJson: {
    label: string;
    template: string;
    color: string;
  };
  isWatermarked: boolean;
  exportedAt?: string;
};

type VisualCredit = {
  freeExportsUsed: number;
  freeExportsLimit: number;
  isPro: boolean;
};

export function VisualStudioEditor() {
  const [template, setTemplate] = useState(templates[0]);
  const [label, setLabel] = useState("Kubiyogen Biyoloji Görseli");
  const [color, setColor] = useState(colors[0]);
  
  const [credits, setCredits] = useState<VisualCredit | null>(null);
  const [projects, setProjects] = useState<VisualProject[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  // Determine if watermarked based on Pro status (fetched from backend credits)
  const isProUser = credits?.isPro ?? false;

  const svg = useMemo(() => {
    const safeLabel = escapeSvgText(label);
    const safeTemplate = escapeSvgText(template);
    const watermark = isProUser ? "" : '<text x="425" y="330" fill="#1e1b2e" opacity="0.22" font-size="24" font-weight="700">KUBİYOGEN ÜCRETSİZ</text>';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#f7f5fb"/><rect x="26" y="26" width="588" height="308" rx="18" fill="#ffffff" stroke="#e7e1f2"/><circle cx="178" cy="190" r="72" fill="${color}" opacity="0.16"/><circle cx="320" cy="162" r="92" fill="${color}" opacity="0.26"/><circle cx="456" cy="214" r="58" fill="${color}" opacity="0.36"/><path d="M178 190 C250 90 360 272 456 214" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/><path d="M132 236 C216 164 296 270 386 186" fill="none" stroke="#1e1b2e" stroke-width="2" stroke-dasharray="6 8" opacity="0.24"/><text x="52" y="70" fill="#1e1b2e" font-size="28" font-weight="700">${safeLabel}</text><text x="52" y="102" fill="#64748b" font-size="16">${safeTemplate}</text><text x="52" y="306" fill="${color}" font-size="14" font-weight="700">Önizleme alanı</text>${watermark}</svg>`;
  }, [color, label, isProUser, template]);

  const previewSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  const loadData = async () => {
    const creditsRes = await apiRequest<VisualCredit>("/visual-studio/credits");
    if (creditsRes.data) setCredits(creditsRes.data);

    const projectsRes = await apiRequest<VisualProject[]>("/visual-studio/projects");
    if (projectsRes.data) setProjects(projectsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveProject = async () => {
    setSaveLoading(true);
    setMessage("");
    const payload = {
      title: label,
      template,
      sceneJson: { label, template, color }
    };

    if (currentProjectId) {
      const result = await apiRequest<VisualProject>(`/visual-studio/projects/${currentProjectId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      setSaveLoading(false);
      if (result.error) {
        setMessage(result.error);
        return;
      }
      setMessage("Proje başarıyla güncellendi.");
    } else {
      const result = await apiRequest<VisualProject>("/visual-studio/projects", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setSaveLoading(false);
      if (result.error || !result.data) {
        setMessage(result.error ?? "Proje kaydedilemedi.");
        return;
      }
      setCurrentProjectId(result.data.id);
      setMessage("Proje başarıyla kaydedildi.");
    }
    loadData();
  };

  const handleExport = async () => {
    setMessage("");
    let targetProjectId = currentProjectId;

    // Save project first if it hasn't been saved yet
    if (!targetProjectId) {
      setSaveLoading(true);
      const payload = {
        title: label,
        template,
        sceneJson: { label, template, color }
      };
      const result = await apiRequest<VisualProject>("/visual-studio/projects", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setSaveLoading(false);
      if (result.error || !result.data) {
        setMessage(result.error ?? "Dışa aktarmadan önce proje kaydedilemedi.");
        return;
      }
      targetProjectId = result.data.id;
      setCurrentProjectId(result.data.id);
    }

    // Call export endpoint
    const exportResult = await apiRequest<{ project: VisualProject; export: { watermarked: boolean } }>(
      `/visual-studio/projects/${targetProjectId}/export`,
      { method: "POST" }
    );

    if (exportResult.error || !exportResult.data) {
      setMessage(exportResult.error ?? "Dışa aktarma işlemi tamamlanamadı.");
      return;
    }

    // Generate exported SVG (using watermarked flag from backend)
    const backendWatermarked = exportResult.data.export.watermarked;
    const finalWatermark = backendWatermarked
      ? '<text x="425" y="330" fill="#1e1b2e" opacity="0.22" font-size="24" font-weight="700">KUBİYOGEN ÜCRETSİZ</text>'
      : '';
    const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#f7f5fb"/><rect x="26" y="26" width="588" height="308" rx="18" fill="#ffffff" stroke="#e7e1f2"/><circle cx="178" cy="190" r="72" fill="${color}" opacity="0.16"/><circle cx="320" cy="162" r="92" fill="${color}" opacity="0.26"/><circle cx="456" cy="214" r="58" fill="${color}" opacity="0.36"/><path d="M178 190 C250 90 360 272 456 214" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/><path d="M132 236 C216 164 296 270 386 186" fill="none" stroke="#1e1b2e" stroke-width="2" stroke-dasharray="6 8" opacity="0.24"/><text x="52" y="70" fill="#1e1b2e" font-size="28" font-weight="700">${escapeSvgText(label)}</text><text x="52" y="102" fill="#64748b" font-size="16">${escapeSvgText(template)}</text><text x="52" y="306" fill="${color}" font-size="14" font-weight="700">Önizleme alanı</text>${finalWatermark}</svg>`;

    const blob = new Blob([finalSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${label.toLowerCase().replace(/[^a-z0-9çğıöşü]+/g, "-") || "kubiyogen-görsel"}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Görsel başarıyla dışa aktarıldı ve indirildi.");
    loadData();
  };

  const loadSavedProject = (proj: VisualProject) => {
    setCurrentProjectId(proj.id);
    setLabel(proj.sceneJson?.label ?? proj.title);
    setTemplate(proj.sceneJson?.template ?? proj.template);
    setColor(proj.sceneJson?.color ?? colors[0]);
    setMessage(`"${proj.title}" projesi yüklendi.`);
  };

  const startNewProject = () => {
    setCurrentProjectId(null);
    setLabel("Yeni Görsel Tasarımı");
    setTemplate(templates[0]);
    setColor(colors[0]);
    setMessage("Yeni tasarıma başlandı.");
  };

  return (
    <RequireAuth title="Görsel Stüdyo için giriş gerekli">
      <div className="rounded-lg border border-line bg-white p-6 shadow-card">
        {credits ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-sm font-semibold text-slate-600">
            <div>
              Hesap Durumu:{" "}
              {credits.isPro ? (
                <span className="text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">Pro Üye</span>
              ) : (
                <span className="text-slate-700 bg-soft px-2.5 py-1 rounded-lg">Ücretsiz Üye</span>
              )}
            </div>
            {!credits.isPro && (
              <div>
                Kalan Ücretsiz Hak:{" "}
                <span className="text-ink bg-soft px-2.5 py-1 rounded-lg">
                  {credits.freeExportsLimit - credits.freeExportsUsed} / {credits.freeExportsLimit}
                </span>
              </div>
            )}
          </div>
        ) : null}

        <div className="mb-6">
          <p className="text-sm font-semibold text-brand-700">Görsel Editörü</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-ink">Bilimsel görsel oluştur</h2>
            <button onClick={startNewProject} className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-soft">
              Yeni Proje
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            <label className="text-sm font-semibold text-ink">
              Başlık
              <input value={label} onChange={(event) => setLabel(event.target.value)} className="mt-2 w-full rounded-lg border border-line px-4 py-3" />
            </label>
            <div>
              <p className="text-sm font-semibold text-ink">Şablon</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {templates.map((item) => (
                  <button key={item} onClick={() => setTemplate(item)} className={`rounded-lg border px-3 py-2.5 text-left text-xs font-semibold ${template === item ? "border-brand-700 bg-brand-50 text-brand-800" : "border-line text-ink"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Renk</p>
              <div className="mt-2 flex gap-2">
                {colors.map((item) => (
                  <button key={item} aria-label={item} onClick={() => setColor(item)} className={`h-8 w-8 rounded-lg border ${color === item ? "border-brand-700 scale-105" : "border-line"}`} style={{ background: item }} />
                ))}
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              <button disabled={saveLoading} onClick={saveProject} className="flex-1 rounded-lg border border-line px-4 py-3 font-semibold text-ink hover:bg-soft disabled:opacity-60">
                {saveLoading ? "Kaydediliyor..." : currentProjectId ? "Güncelle" : "Kaydet"}
              </button>
              <button onClick={handleExport} className="flex-1 rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white hover:bg-brand-800">
                SVG İndir
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-soft p-4 flex flex-col justify-between">
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink">Canlı Tuval</p>
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  640 x 360 SVG
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewSrc} alt="Görsel Stüdyo önizleme tuvali" className="block w-full rounded-lg border border-line bg-white" />
            </div>
            {message ? <p className="mt-4 rounded-lg bg-white border border-line p-3 text-xs text-slate-700 font-semibold">{message}</p> : null}
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="text-sm font-bold text-ink mb-4">Kaydedilmiş Tasarımlarınız</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => loadSavedProject(proj)}
                  className={`rounded-lg border p-4 text-left transition hover:bg-soft ${currentProjectId === proj.id ? "border-brand-700 bg-brand-50" : "border-line bg-white"}`}
                >
                  <p className="font-semibold text-sm text-ink truncate">{proj.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{proj.template}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </RequireAuth>
  );
}
