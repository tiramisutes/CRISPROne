import "./index.css";

function Foot() {
  const footStyle = {
    backgroundColor: "#f6f8ea",
    padding: "30px 0",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "500",
  };

  return (
    <div className="app-footer" style={footStyle}>
      <p>》CITE US: , DOI: 10.11</p>
      <p className="app-footer__links">
        © 2022 Copyright: {" "}
        <a
          className="app-footer__link"
          href="https://www.hzau.edu.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Huazhong Agricultural University
        </a>{" "}
        & {" "}
        <a
          className="app-footer__link"
          href="https://croplab.hzau.edu.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          National Key Laboratory of Crop Genetic Improvement
        </a>{" "}
        & {" "}
        <a
          className="app-footer__link"
          href="https://hbhs.hzau.edu.cn/index.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubei Hongshan Laboratory
        </a>{" "}
        & {" "}
        <a
          className="app-footer__link"
          href="https://cotton.hzau.edu.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Group of Cotton Genetic Improvement
        </a>{" "}
        & {" "}
        <a
          className="app-footer__link"
          href="http://jinlab.hzau.edu.cn/GenomeEditingPlatform/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Genome Editing Platform @HZAU
        </a>
      </p>
      <p>Jointly developed with Beijing Bio Huaxing Gene Technology Co., LTD</p>
    </div>
  );
}

export default Foot;
