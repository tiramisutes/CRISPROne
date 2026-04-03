import React, { useState, useEffect } from "react";
import "./index.scss";
import genomeCSV from "./genome_metadata.csv?url";

// Q&A
const helpItems = [
  {
    id: "crisprone",
    question: "What is CRISPRone?",
    answer:
      "CRISPRone is a comprehensive and integrated web-based platform for CRISPR genome editing design, optimization, and analysis, specifically tailored for plant systems. It supports a wide range of genome editing technologies including CRISPR/Cas9, Cas12 (Cpf1, C2c1), Cas13 (RNA editing), Base Editors (CBE/ABE), Prime Editors (PE), and emerging systems such as IscB, TnpB, and Fanzor.\n\nThe platform provides a complete workflow including:\n1) Target sequence input and genome selection\n2) sgRNA/crRNA/pegRNA design\n3) On-target efficiency prediction\n4) Off-target analysis across the genome\n5) Editing outcome simulation and validation\n\nCRISPRone is particularly optimized for complex plant genomes such as polyploid species, enabling high-precision and scalable genome editing design.",
  },

  {
    id: "characteristics",
    question: "What are the characteristics of CRISPRone?",
    answer:
      "CRISPRone offers several advanced features:\n\n1) Multi-system support:\nSupports diverse CRISPR systems including DNA-targeting, RNA-targeting, base editing, and prime editing.\n\n2) High-precision design:\nProvides optimized sgRNA selection based on efficiency scoring models and sequence features.\n\n3) Comprehensive off-target analysis:\nPerforms genome-wide off-target prediction with mismatch tolerance and ranking.\n\n4) Integrated editing analysis:\nSupports downstream mutation detection, editing efficiency estimation, and variant profiling.\n\n5) Plant genome optimization:\nDesigned for complex genomes (e.g., polyploid cotton), accounting for homologous sequences.\n\n6) User-friendly interface:\nInteractive visualization, real-time feedback, and intuitive workflows.",
  },

  {
    id: "enzymes",
    question: "Notes on enzymes",
    answer:
      "Different CRISPR-associated nucleases (Cas proteins) exhibit distinct biochemical properties that directly affect editing outcomes.\n\nKey considerations:\n\n1) PAM requirement:\nEach enzyme recognizes specific PAM sequences (e.g., Cas9: NGG; Cas12a: TTTV).\n\n2) Cleavage pattern:\nCas9 generates blunt double-strand breaks, while Cas12a produces staggered cuts.\n\n3) Target type:\nCas9/Cas12 target DNA, whereas Cas13 targets RNA.\n\n4) Editing compatibility:\nCertain enzymes are optimized for base editing or prime editing systems.\n\n5) Size and delivery:\nCompact enzymes (e.g., Cas12b, TnpB) are advantageous for delivery systems.\n\nUsers should select enzymes based on experimental goals, PAM availability, and species-specific efficiency.",
  },

  {
    id: "genomes",
    question: "Notes on genomes",
    answer:
      "Genome selection is critical for accurate CRISPR design and analysis.\n\nImportant factors:\n\n1) Reference genome version:\nAlways use the latest and most accurate genome assembly.\n\n2) Annotation quality:\nEnsure gene models (GFF/GTF) are correctly matched.\n\n3) Polyploidy:\nIn species like cotton, homologous genes may lead to unintended edits.\n\n4) Off-target risk:\nHighly repetitive regions increase off-target probability.\n\n5) Subgenome specificity:\nDesign sgRNAs that distinguish between A/D subgenomes when necessary.\n\nAccurate genome selection significantly improves editing specificity and experimental success.",
  },

  {
    id: "cas9",
    question: "How do you use Cas9 design?",
    answer:
      "Cas9 is the most widely used CRISPR system for genome editing.\n\nWorkflow:\n\n1) Input target sequence or gene ID\n2) Select reference genome\n3) Define PAM type (e.g., NGG)\n4) Run sgRNA design\n5) Evaluate results based on:\n   - On-target efficiency score\n   - GC content (optimal: 40–70%)\n   - Secondary structure\n6) Perform off-target analysis\n7) Select top sgRNAs for experimental validation\n\nTips:\n- Avoid SNP regions\n- Prefer sgRNAs near functional domains\n- Use multiple sgRNAs for redundancy",
  },

  {
    id: "cas12_cpf1",
    question: "How do you use Cas12 (Cpf1) design?",
    answer:
      "Cas12a (Cpf1) differs from Cas9 in PAM recognition and cleavage pattern.\n\nSteps:\n\n1) Input target DNA sequence\n2) Select Cas12a system\n3) Choose T-rich PAM (TTTV)\n4) Run design pipeline\n5) Evaluate:\n   - Cutting position (distal from PAM)\n   - Efficiency score\n   - Off-target profile\n\nAdvantages:\n- Sticky ends (useful for knock-in)\n- Self-processing crRNA arrays\n\nBest used in AT-rich genomic regions.",
  },

  {
    id: "cas12_c2c1",
    question: "How do you use Cas12b (C2c1) design?",
    answer:
      "Cas12b is a compact CRISPR nuclease suitable for certain delivery systems.\n\nSteps:\n\n1) Input sequence\n2) Select Cas12b enzyme\n3) Define PAM requirement\n4) Run sgRNA design\n5) Evaluate efficiency and specificity\n\nNotes:\n- Some Cas12b variants are temperature-sensitive\n- Suitable for compact vector systems",
  },

  {
    id: "cas13",
    question: "How do you use Cas13 design?",
    answer:
      "Cas13 targets RNA rather than DNA, enabling transcript-level regulation.\n\nWorkflow:\n\n1) Input mRNA/transcript sequence\n2) Select Cas13 subtype\n3) Design crRNA\n4) Evaluate:\n   - Target accessibility\n   - RNA secondary structure\n   - Off-target transcripts\n\nApplications:\n- RNA knockdown\n- RNA editing\n- Viral RNA targeting",
  },

  {
    id: "base_editor",
    question: "How do you use Base Editor design?",
    answer:
      "Base editors enable single-nucleotide changes without double-strand breaks.\n\nSteps:\n\n1) Input DNA sequence\n2) Select editor type:\n   - CBE (C→T)\n   - ABE (A→G)\n3) Define editing window (typically positions 4–8)\n4) Identify editable bases\n5) Evaluate:\n   - Editing efficiency\n   - Bystander effects\n\nImportant:\n- Avoid multiple editable bases in window\n- Check strand orientation carefully",
  },

  {
    id: "prime_editor",
    question: "How do you use Prime Editor design?",
    answer:
      "Prime editing allows versatile and precise genome modifications.\n\nSteps:\n\n1) Input target sequence\n2) Define desired edit (insertion/deletion/substitution)\n3) Design pegRNA:\n   - Spacer sequence\n   - PBS (primer binding site)\n   - RT template\n4) Design nicking sgRNA (optional)\n5) Evaluate predicted editing efficiency\n\nOptimization:\n- Adjust PBS length (8–15 nt)\n- Optimize RT template length",
  },

  {
    id: "prime_editing",
    question: "How does prime editing work?",
    answer:
      "Prime editing uses a Cas9 nickase fused to reverse transcriptase.\n\nMechanism:\n\n1) pegRNA binds target DNA\n2) Cas9 nickase creates single-strand break\n3) Reverse transcriptase copies edit sequence from pegRNA\n4) Edited strand is incorporated into genome\n\nAdvantages:\n- No double-strand breaks\n- No donor DNA required\n- High precision editing",
  },

  {
    id: "crispr_knockin2",
    question: "How do you use CRISPR Knock-in design?",
    answer:
      "Knock-in introduces new DNA sequences at specific loci.\n\nSteps:\n\n1) Select target insertion site\n2) Design sgRNA\n3) Prepare donor template:\n   - Homology arms (500–1000 bp)\n4) Choose repair pathway (HDR/NHEJ-based)\n5) Validate insertion by sequencing\n\nTips:\n- Use high-efficiency sgRNAs\n- Optimize donor design",
  },

  {
    id: "epigenome",
    question: "How do you use CRISPR Epigenome design?",
    answer:
      "CRISPR epigenome editing modifies gene expression without altering DNA sequence.\n\nSteps:\n\n1) Select regulatory region (promoter/enhancer)\n2) Design sgRNA targeting region\n3) Use dCas9 fusion:\n   - Activation (CRISPRa)\n   - Repression (CRISPRi)\n   - Methylation/demethylation\n\nApplications:\n- Gene regulation studies\n- Epigenetic modification",
  },

  {
    id: "fragment_editor",
    question: "How do you use Fragment Editor design?",
    answer:
      "Fragment Editor supports large-scale genome modifications.\n\nSteps:\n\n1) Input large DNA sequence\n2) Define modification type:\n   - Deletion\n   - Insertion\n   - Replacement\n3) Design editing strategy\n4) Simulate structural outcomes\n5) Validate with sequencing\n\nSuitable for:\n- Gene cluster editing\n- Synthetic biology applications",
  },
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genomeData, setGenomeData] = useState([]);

  // ✅ 加载 CSV
  useEffect(() => {
    fetch(genomeCSV)
      .then((res) => {
        if (!res.ok) throw new Error("CSV load failed");
        return res.text();
      })
      .then((text) => {
        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        if (lines.length < 2) return;

        const headers = lines[0].split(",");

        const data = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = {};

          headers.forEach((h, i) => {
            obj[h] = values[i] || "";
          });

          return obj;
        });

        setGenomeData(data);
      })
      .catch((err) => {
        console.error("CSV ERROR:", err);
      });
  }, []);

  // 搜索
  const filteredHelpItems = helpItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help">
      <h1>CRISPRone Documentation Center</h1>
      <div className="divider"></div>

      <div className="help-content">
        {/* Sidebar */}
        <div className="help-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <h3>Contents</h3>
          <div className="help-sidebar-list">
            {filteredHelpItems.map((item) => (
              <div key={item.id} className="sidebar-item">
                <a href={`#${item.id}`}>{item.question}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="help-main">
          {filteredHelpItems.map((item) => (
            <div key={item.id} id={item.id} className="help-item">
              <h2>{item.question}</h2>
              <hr />

              <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>

              {/* ✅ genomes 表格 */}
              {item.id === "genomes" && (
                <div style={{ marginTop: "30px" }}>
                  <h3>Genome Reference Table Used in this CRISPRone</h3>

                  {genomeData.length === 0 ? (
                    <p>Loading...</p>
                  ) : (
                    <table className="genome-table">
                      <thead>
                        <tr>
                          {Object.keys(genomeData[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {genomeData.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((val, i) => (
                              <td key={i}>
                                {typeof val === "string" &&
                                val.startsWith("http") ? (
                                  <a
                                    href={val}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Download
                                  </a>
                                ) : (
                                  val
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;