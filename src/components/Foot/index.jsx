function Foot() {
  const footStyle = {
    backgroundColor: "#f6f8ea",
    padding: "30px 0",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "500",
  };
  return (
    <div style={footStyle}>
      <p>》CITE US: , DOI: 10.11</p>
      <p>
        © 2022 Copyright: <a href="https://www.hzau.edu.cn/" target="_blank">Huazhong Agricultural University </a> 
        & <a href="https://croplab.hzau.edu.cn/" target="_blank">National Key Laboratory of Crop Genetic Improvement </a> 
        & <a href="https://hbhs.hzau.edu.cn/index.htm" target="_blank">Hubei Hongshan Laboratory </a> 
        & <a href="https://cotton.hzau.edu.cn/" target="_blank">Group of Cotton Genetic Improvement </a> 
        & <a href="http://jinlab.hzau.edu.cn/GenomeEditingPlatform/" target="_blank">Genome Editing Platform @HZAU</a>
      </p>
      <p>Jointly developed with Beijing Bio Huaxing Gene Technology Co., LTD</p>
    </div>
  );
}

export default Foot;
