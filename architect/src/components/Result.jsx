import { useRef, useEffect, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactMarkdown from "react-markdown";
import { useGeneratedArchitecture } from "../context/ArchitectureContext";

// Define a forwardRef wrapper for ReactMarkdown
const MarkdownWrapper = forwardRef(({ children }, ref) => (
  <div ref={ref}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
));

const ResultPage = () => {
  const { generatedArchitecture } = useGeneratedArchitecture();
  const pdfContentRef = useRef(null);
  const [isMarkdownRendered, setIsMarkdownRendered] = useState(false);

  useEffect(() => {
    // Check if ReactMarkdown has rendered content into pdfContentRef
    if (pdfContentRef.current) {
      setIsMarkdownRendered(true);
    }
  }, [generatedArchitecture]);

  const handleDownloadPdf = () => {
    if (!isMarkdownRendered) {
      return; // Exit early if Markdown content is not rendered yet
    }

    const doc = new jsPDF();

    // Add a heading
    doc.setFontSize(18);
    doc.text("Architecture Document", 105, 20, { align: "center" });

    // Add a border
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287); // Border around the entire page

    // Get the text content of the markdown rendered content
    const content = pdfContentRef.current;
    const text = content.innerText;

    // Split the text into lines that fit within the PDF's width
    const lines = doc.splitTextToSize(text, 285); // Adjust width to fit the text properly

    // Add the paragraph text
    doc.setFontSize(12);
    doc.text(lines, 10, 30); // Adjust starting y-coordinate if necessary

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 200, 285, { align: "right" });
    }

    // Save the PDF
    doc.save("architecture.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 mb-8">
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-4xl text-center font-bold text-white mb-4">
          Architecture
        </h2>
        <div className="flex flex-col w-full text-2xl text-white ">
          <MarkdownWrapper ref={pdfContentRef}>
            {generatedArchitecture}
          </MarkdownWrapper>

          <Link to="/">
            <button className="w-full bg-gradient-to-r mt-16 text-2xl from-indigo-500 to-blue-700 text-xl text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150">
              Generate Another
            </button>
          </Link>
          <button
            onClick={handleDownloadPdf}
            className="bg-gradient-to-r text-2xl from-indigo-500 to-blue-700 text-xl text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150"
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
