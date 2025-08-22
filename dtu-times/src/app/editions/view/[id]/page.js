"use client";


import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { apiFetch } from "../../../../utils/api";

const FlipbookViewer = dynamic(() => import("../FlipbookPdfViewers").then(mod => mod.FlipbookViewer), { ssr: false });
const ScrollPdfViewer = dynamic(() => import("../FlipbookPdfViewers").then(mod => mod.ScrollPdfViewer), { ssr: false });


export default function EditionViewPage() {
  const params = useParams();
  const router = useRouter();

  const [currentEdition, setCurrentEdition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("magazine"); // 'magazine' | 'scroll'
  const [scale, setScale] = useState(1);

  const viewerShellRef = useRef(null);

  // Build PDF source (use proxy if BACKEND is set)
  const pdfSrc =
    currentEdition?.pdfUrl &&
    (process.env.NEXT_PUBLIC_BACKEND_URL
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pdf-proxy?url=${encodeURIComponent(
          currentEdition.pdfUrl
        )}`
      : currentEdition.pdfUrl);

  useEffect(() => {
    async function fetchEdition() {
      setIsLoading(true);
      try {

  const res = await apiFetch(`/edition/search?editionNumber=${params?.id}`);
  const edition = res?.edition;

        if (edition) {
          const uploaded = edition.uploadDate ? new Date(edition.uploadDate) : null;
          setCurrentEdition({
            id: edition._id,
            title: edition.title || `Edition ${edition.editionNumber}`,
            pdfUrl: edition.pdfUrl,
            coverPicUrl: edition.coverPicUrl,
            uploadDate: uploaded ? uploaded.toLocaleDateString() : "",
            uploadTime: uploaded ? uploaded.toLocaleTimeString() : "",
          });
        } else {
          setCurrentEdition(null);
        }
      } catch {
        setCurrentEdition(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEdition();
  }, [params?.id]);

  const goToPreviousEdition = () => {
    const current = parseInt(params?.id, 10) || 1;
    const prevId = Math.max(1, current - 1);
    router.push(`/editions/view/${prevId}`);
  };

  const goToNextEdition = () => {
    const current = parseInt(params?.id, 10) || 1;
    const nextId = current + 1;
    router.push(`/editions/view/${nextId}`);
  };

  const goToAllEditions = () => {
    router.push("/editions");
  };

  const zoomIn = () => setScale((s) => Math.min(2, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)));
  const goFullscreen = () => {
    const el = viewerShellRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen pt-20 flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div
          className="text-2xl font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Loading Edition...
        </div>
      </div>
    );
  }

  if (!currentEdition || !pdfSrc) {
    return (
      <div
        className="min-h-screen pt-20 flex flex-col items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div
          className="text-2xl font-medium mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Edition not found or PDF missing.
        </div>
        <button
          onClick={() => router.push("/editions")}
          className="px-6 py-3 cursor-pointer rounded-lg bg-accent text-white font-semibold text-lg shadow hover:scale-105 transition-transform duration-200"
          style={{ backgroundColor: "var(--accent)" }}
        >
          ← Back to All Editions
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Top Bar */}
      <div
        className="py-4 px-6 border-b"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={goToAllEditions}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
          >
            ← All Editions
          </button>

          <h1
            className="text-xl md:text-2xl font-semibold text-center"
            style={{ color: "var(--text-primary)" }}
          >
            {currentEdition.title}
          </h1>

          <div className="w-24" />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Viewer Shell */}
          <div
            ref={viewerShellRef}
            className="rounded-2xl overflow-hidden mb-8 border"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Controls */}
            <div
              className="px-6 py-4 border-b flex items-center justify-between gap-4"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-primary)",
              }}
            >
              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("magazine")}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor:
                      viewMode === "magazine"
                        ? "var(--accent)"
                        : "var(--bg-secondary)",
                    color:
                      viewMode === "magazine" ? "white" : "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  📖 Magazine
                </button>
                <button
                  onClick={() => setViewMode("scroll")}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor:
                      viewMode === "scroll"
                        ? "var(--accent)"
                        : "var(--bg-secondary)",
                    color: viewMode === "scroll" ? "white" : "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  📜 Scroll
                </button>
              </div>

              {/* Zoom / Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Zoom Out
                </button>
                <button
                  onClick={zoomIn}
                  className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Zoom In
                </button>
                <button
                  onClick={goFullscreen}
                  className="px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Fullscreen
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="p-4">
              {viewMode === "magazine" ? (
                <FlipbookViewer file={pdfSrc} scale={scale} />
              ) : (
                <ScrollPdfViewer file={pdfSrc} scale={scale} />
              )}
            </div>
          </div>

          {/* Bottom Nav & Details */}
          <div className="flex items-center justify-between gap-8 py-2">
            <button
              onClick={goToPreviousEdition}
              disabled={(parseInt(params?.id, 10) || 1) <= 1}
              className="flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                ←
              </span>
              <span className="text-sm font-medium">Previous</span>
            </button>

            <div
              className="text-center px-6 py-3 rounded-full"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  📅
                </span>
                <div
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentEdition.uploadDate}
                </div>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  •
                </span>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {currentEdition.uploadTime?.split(":").slice(0, 2).join(":")}
                </div>
              </div>
            </div>

            <button
              onClick={goToNextEdition}
              className="flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 group cursor-pointer"
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <span className="text-sm font-medium">Next</span>
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
