import "./index.scss";

function News() {
  return (
    <div className="news">
      <h1>CRISPRone Development Timeline</h1>
      <div className="divider"></div>
      <ul className="timeline">
        <li className="timeline-item">
          <h5>Concept Initiation</h5>
          <p className="date">March 1, 2022</p>
          <p className="description">
            The initial concept of CRISPRone was proposed to develop an integrated platform 
            for CRISPR-based genome editing in plants, aiming to improve efficiency, accuracy, 
            and usability for complex crop genomes.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Framework Development</h5>
          <p className="date">March 19, 2022</p>
          <p className="description">
            The core architecture of the CRISPRone platform was established, including 
            front-end interface design and backend computational pipelines.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Cas9 Module Deployment</h5>
          <p className="date">June 24, 2022</p>
          <p className="description">
            Completed sgRNA design and off-target prediction modules for CRISPR/Cas9, 
            enabling efficient genome editing analysis in plant systems.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Expansion to Prime Editing and Diverse Cas Systems</h5>
          <p className="date">2023</p>
          <p className="description">
            Integrated Prime Editing (PE) technology and expanded support for multiple 
            CRISPR/Cas systems, significantly enhancing editing flexibility and precision 
            across different genomic contexts.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Integration of Cas13 and Base Editing Technologies</h5>
          <p className="date">2024</p>
          <p className="description">
            Introduced RNA-targeting CRISPR/Cas13 systems and single-base editing tools 
            (CBE and ABE), enabling both DNA and RNA-level precise modifications in plants.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Next-Generation Systems and Editing Detection Module</h5>
          <p className="date">2025</p>
          <p className="description">
            Incorporated emerging genome editing systems including IscB, TnpB, and 
            Fanzor, alongside the development of a comprehensive editing detection 
            module for accurate assessment of editing efficiency and mutation profiles.
          </p>
        </li>

        <li className="timeline-item">
          <h5>Full Platform Integration and Optimization</h5>
          <p className="date">2026</p>
          <p className="description">
            Completed the full integration of all CRISPRone modules, delivering a 
            comprehensive, user-friendly platform covering sgRNA design, multi-system 
            editing, off-target analysis, and editing validation. The platform now 
            supports end-to-end workflows for genome editing research in complex plant species.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default News;
