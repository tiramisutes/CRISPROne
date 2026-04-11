import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import bannerImg from "../../assets/images/home/banner.png";
import sgRNADesignImg from "../../assets/images/home/sgRNADesign.png";
import editingImg from "../../assets/images/home/editing-analysis.png";

const hotspotPoints = [
  { id: "1", left: "91%", top: "54%", href: "/cas9", title: "Cas9" },
  { id: "2", left: "95%", top: "68%", href: "/cas12/cpf1", title: "Cas12" },
  { id: "3", left: "50%", top: "59%", href: "/cas13", title: "Cas13" },
  {
    id: "4",
    left: "49%",
    top: "18.5%",
    href: "/base-editor",
    title: "Base Editor",
  },
  {
    id: "5",
    left: "95%",
    top: "22%",
    href: "/primer-editor",
    title: "Primer Editor",
  },
  { id: "6", left: "48%", top: "88%", href: "/crispra", title: "CRISPRa" },
  {
    id: "7",
    left: "10%",
    top: "60%",
    href: "/edited-analysis/editing-analysis",
    title: "Edited Analysis",
  },
  {
    id: "8",
    left: "71%",
    top: "52%",
    href: "/chat-crispr",
    title: "ChatCRISPR",
  },
  {
    id: "9",
    left: "36%",
    top: "12%",
    href: "/fragment-editor/deletion",
    title: "Fragment Editor",
  },
  {
    id: "10",
    left: "4%",
    top: "92%",
    href: "/crispr-knockin",
    title: "CRISPR Knock-in",
  },
  {
    id: "11",
    left: "80%",
    top: "10%",
    href: "/crispr-epigenome",
    title: "CRISPR Epigenome",
  },
  {
    id: "12",
    left: "24%",
    top: "92%",
    href: "/TnpB",
    title: "TnpB/IscB",
  },
  { id: "13", left: "30%", top: "88%", href: "/FanZor", title: "FanZor" },
  {
    id: "14",
    left: "82%",
    top: "88%",
    href: "/edited-analysis/off-target",
    title: "Off-target Analysis",
  },
];

const designFeatures = [
  {
    title: "🧬 High-Quality Genomes & Flexible PAM Settings",
    description:
      "Integrated T2T genomes, multiple Cas systems, and customizable PAM settings ensure high accuracy and strong scalability.",
  },
  {
    title: "⚡ Real-Time, Multi-Parameter Off-Target Evaluation",
    description:
      "Fast genome-wide scanning with functional annotation such as exon and intron context enables precise and meaningful off-target evaluation.",
  },
  {
    title: "🔬 Multi-Dimensional sgRNA Screening Strategies",
    description:
      "Combines conserved domains with ATAC-seq, ChIP-seq, and Hi-C data for biologically informed sgRNA selection.",
  },
  {
    title: "🎯 Personalized Design for Different Editing Scenarios",
    description:
      "Tailored design for different Cas systems and applications, including functional evaluation for base editing.",
  },
  {
    title: "🚀 In Summary",
    description: "CRISPRone combines scalability, speed, and biological insight to deliver a next-generation sgRNA design experience that helps researchers achieve high precision, low off-target effects, and context-aware editing outcomes."
  }
];

const analysisFeatures = [
  {
    title: "🧬 Barcode-Based Detection",
    description:
      "Supports multiplex detection using barcode primers and high-throughput sequencing for efficient analysis of multiple samples.",
  },
  {
    title: "📊 Mutation Profiling",
    description:
      "Outputs editing efficiency, mutation types, and frequencies for each sample in pooled datasets.",
  },
  {
    title: "🌾 Polyploid Support",
    description:
      "Automatically distinguishes subgenomes and identifies mutation patterns using homologous chromosome sequences.",
  },
  {
    title: "🎯 Editing Accuracy Assessment",
    description:
      "Uses deep resequencing (>50×) and genome-wide variation analysis to evaluate editing precision, with local tools for efficient processing of large datasets.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const heroStyle = {
    height: "100%",
    position: "relative",
    marginBottom: "60px",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const backgroundImageStyle = {
    width: "100vw",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  };

  const introStyle = {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "40px",
  };

  const introImageStyle = {
    width: "35vw",
    height: "auto",
    borderRadius: "8px",
    overflow: "hidden",
    flexShrink: 0,
  };

  const introTextStyle = {
    backgroundColor: "#f7fcfb",
    width: "35vw",
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#333",
    boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, .15)",
    padding: "28px",
    borderRadius: "18px",
  };

  return (
    <div>
      <div className="hero-section" style={heroStyle}>
        <img
          src={bannerImg}
          alt="CRISPR Tools Interactive Map"
          style={backgroundImageStyle}
        />

        {hotspotPoints.map((point) => (
          <div
            key={point.id}
            className="point"
            style={{ left: point.left, top: point.top }}
            onClick={() => navigate(point.href)}
            title={point.title}
          >
            <div className="pulse-wrapper">
              <div className="pulse-core"></div>
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay"></div>
            </div>
            <div className="point-label">{point.title}</div>
          </div>
        ))}

        <div className="banner-text">
          <h1 className="main-title">CRISPRone</h1>
          <h2 className="sub-title">
            Comprehensive gene editing tools provide convenience for gene
            editing work, and ChatCRISPR intelligently answers questions
          </h2>
        </div>
      </div>

      <div className="intro-section" style={introStyle}>
        <div className="intro-image" style={introImageStyle}>
          <img
            src={sgRNADesignImg}
            alt="sgRNA design overview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={introTextStyle} className="intro-text">
          <h2 className="home-section-title">Why Use CRISPRone for sgRNA Design?</h2>
          <p className="home-lead">
            CRISPRone is a comprehensive tool set that can meet diverse CRISPR
            research needs. It integrates <strong>sgRNA design</strong> across
            different CRISPR systems together with {" "}
            <strong>
              <a
                className="home-inline-link"
                href="/edited-analysis/editing-analysis"
                target="_blank"
                rel="noopener noreferrer"
              >
                editing analysis ↗
              </a>
            </strong>
            {" "}for transgenic plant studies.
          </p>

          <div className="home-text-list">
            {designFeatures.map((feature) => (
              <p key={feature.title} className="home-text-item">
                <p><strong>{feature.title}: </strong></p>
                {feature.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="intro-section" style={introStyle}>
        <div className="intro-image" style={introImageStyle}>
          <img
            src={editingImg}
            alt="editing analysis overview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={introTextStyle} className="intro-text">
          <h2 className="home-section-title">What is Editing Analysis?</h2>
          <p className="home-lead">
            Editing analysis evaluates CRISPR experiments by measuring editing
            efficiency and mutation patterns across multiple samples, helping
            identify successfully edited plants.
          </p>

          <div className="home-text-list">
            {analysisFeatures.map((feature) => (
              <p key={feature.title} className="home-text-item">
                <p><strong>{feature.title}: </strong></p>
                {feature.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
