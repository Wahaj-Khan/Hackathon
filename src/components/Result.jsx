import { useRef, useEffect, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactMarkdown from "react-markdown";
import { useGeneratedArchitecture } from "../context/ArchitectureContext";
import "./styles.css";

const MarkdownWrapper = forwardRef(({ children }, ref) => (
  <div ref={ref} className="markdown">
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
));

const ResultPage = () => {
  const { generatedArchitecture } = useGeneratedArchitecture();
  const pdfContentRef = useRef(null);
  const [isMarkdownRendered, setIsMarkdownRendered] = useState(false);

  useEffect(() => {
    if (pdfContentRef.current) {
      setIsMarkdownRendered(true);
    }
  }, [generatedArchitecture]);

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Architecture Document", 105, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287);

    const content = pdfContentRef.current;
    const text = content.innerText;

    const lines = doc.splitTextToSize(text, 280);

    let cursorY = 30;
    const lineHeight = 5;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;

    doc.setFontSize(12);
    for (let i = 0; i < lines.length; i++) {
      if (cursorY + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        doc.setLineWidth(0.5);
        doc.rect(5, 5, 200, 287);
        cursorY = 20;
      }
      doc.text(lines[i], 10, cursorY);
      cursorY += lineHeight;
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 200, 285, { align: "right" });
    }

    doc.save("architecture.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 mb-8">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-center font-bold text-white mb-4">
          Architecture
        </h2>
        <div className="flex flex-col w-full text-white ">
          <MarkdownWrapper ref={pdfContentRef}>
            {generatedArchitecture}
          </MarkdownWrapper>

          <Link to="/">
            <button className="w-full bg-gradient-to-r mt-16 from-indigo-500 to-blue-700 text-lg text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150">
              Generate Another
            </button>
          </Link>
          <button
            onClick={handleDownloadPdf}
            className="bg-gradient-to-r from-indigo-500 to-blue-700 text-lg text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150"
          >
            Download
            <FaFilePdf className="inline ml-2" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
