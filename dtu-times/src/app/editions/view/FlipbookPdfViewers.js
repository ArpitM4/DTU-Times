"use client";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Page, pdfjs } from "react-pdf";

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

import { useRef } from "react";

export function FlipbookViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goToPrev = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };
  const goToNext = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };
  const onFlip = (e) => setCurrentPage(e.data);

  const FIXED_WIDTH = 1100;
  const FIXED_HEIGHT = 700  ;

  return (
    <div className="flex items-center justify-center w-full" style={{overflow: 'visible'}}>
      {/* Left Arrow Button */}
      <button
        onClick={goToPrev}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-2xl font-bold shadow mx-2 text-white"
        aria-label="Previous Page"
      >
        &#8592;
      </button>
      <div className="flex flex-col items-center">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading="Loading PDF..."
        >
          {numPages && (
            <HTMLFlipBook
              ref={flipBookRef}
              width={FIXED_WIDTH}
              height={FIXED_HEIGHT}
              showCover={true}
              useMouseEvents={true}
              className="shadow-lg rounded-lg"
              onFlip={onFlip}
            >
              {Array.from({ length: numPages }).map((_, idx) => (
                <div key={idx} className="bg-white">
                  <Page
                    pageNumber={idx + 1}
                    width={FIXED_WIDTH}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
      {/* Right Arrow Button */}
      <button
        onClick={goToNext}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-2xl font-bold shadow mx-2 text-white"
        aria-label="Next Page"
      >
        &#8594;
      </button>
    </div>
  );
}

export function ScrollPdfViewer({ file, maxWidth = 900, scale = 1, maxHeight = 700 }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div
      className="flex flex-col items-center overflow-y-auto"
      style={{ maxHeight: maxHeight, minHeight: 200 }}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Loading PDF..."
      >
        {numPages &&
          Array.from({ length: numPages }).map((_, idx) => (
            <div
              key={idx}
              className="mb-4 bg-white rounded shadow border"
              style={{ borderColor: "var(--border-color)" }}
            >
              <Page
                pageNumber={idx + 1}
                width={Math.round(maxWidth * Math.min(scale, 1))}
                scale={scale > 1 ? scale : 1}
              />
            </div>
          ))}
      </Document>
    </div>
  );
}
