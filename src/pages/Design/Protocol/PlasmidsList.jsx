import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Anchor, Badge } from "antd";
import { ExperimentOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import cas9Image from "@/assets/images/plasmids/cas9.jpg";
import cas12aImage from "@/assets/images/plasmids/cas12a.jpg";
import cas12bImage from "@/assets/images/plasmids/cas12b.jpg";
import cas13Image from "@/assets/images/plasmids/cas13.png";
// import knockinImage from "@/assets/images/plasmids/knockin.png";
import cbeImage from "@/assets/images/plasmids/cbe.png";
import abeImage from "@/assets/images/plasmids/abe.png";
// import cbeAbeImage from "@/assets/images/plasmids/cbe_abe.png";
// import primeImage from "@/assets/images/plasmids/prime_editing.png";
import crisprAImage from "@/assets/images/plasmids/crispr_activation.jpg";
import epiImage from "@/assets/images/plasmids/epigeneticsmrna.jpg";

// 质粒数据
const plasmidsData = [
  {
    id: 1,
    name: "CRISPR/Cas9",
    description: "The most widely used CRISPR system for genome editing. Cas9 creates double-strand breaks at specific genomic locations guided by sgRNA.",
    image: cas9Image,
    link: "https://onlinelibrary.wiley.com/doi/10.1111/pbi.12755",
    external: true,
  },
  {
    id: 2,
    name: "CRISPR-Cas12a (Cpf1)",
    description: "An alternative CRISPR system with T-rich PAM recognition. Cas12a generates staggered cuts and processes its own crRNA array.",
    image: cas12aImage,
    link: "https://onlinelibrary.wiley.com/doi/10.1002/imt2.209",
    external: true,
  },
  {
    id: 3,
    name: "CRISPR-Cas12b (C2c1)",
    description: "A compact Cas12 variant suitable for AAV delivery. Recognizes T-rich PAM sequences and provides efficient genome editing.",
    image: cas12bImage,
    link: "https://onlinelibrary.wiley.com/doi/10.1111/pbi.13417",
    external: true,
  },
  {
    id: 4,
    name: "CRISPR Cas13",
    description: "RNA-targeting CRISPR system for RNA knockdown, editing, and detection. Does not require PAM sequences.",
    image: cas13Image,
    link: "https://link.springer.com/article/10.1186/s13059-024-03448-8",
    external: true,
  },
  // {
  //   id: 5,
  //   name: "CRISPR Knock-ins",
  //   description: "Precise insertion of DNA sequences at targeted genomic locations using homology-directed repair mechanisms.",
  //   image: knockinImage,
  // },
  {
    id: 6,
    name: "GhCBE",
    description: "Cytosine Base Editor for cotton (Gossypium hirsutum). Enables C-to-T conversion without double-strand breaks.",
    image: cbeImage,
    link: "https://link.springer.com/article/10.1186/s13059-025-03849-3",
    external: true,
  },
  {
    id: 7,
    name: "GhABE",
    description: "Adenine Base Editor for cotton. Facilitates A-to-G base conversion with high precision and efficiency.",
    image: abeImage,
    link: "https://link.springer.com/article/10.1186/s13059-024-03189-8",
    external: true,
  },
  // {
  //   id: 8,
  //   name: "GhCBE + GhABE",
  //   description: "Dual base editing system combining both cytosine and adenine base editors for versatile genome modification.",
  //   image: cbeAbeImage,
  // },
  // {
  //   id: 9,
  //   name: "Prime Editing",
  //   description: "Advanced genome editing technology enabling precise insertions, deletions, and base conversions without DSBs or donor DNA.",
  //   image: primeImage,
  // },
  {
    id: 10,
    name: "CRISPR activation",
    description: "CRISPRa system for transcriptional activation. Uses catalytically dead Cas9 fused with activation domains.",
    image: crisprAImage,
    link: "https://www.cell.com/plant-communications/fulltext/S2590-3462(23)00111-6",
    external: true,
  },
  {
    id: 11,
    name: "CRISPR Epigenetics (mRNA)",
    description: "Epigenome editing tools for modulating DNA methylation and histone modifications without altering DNA sequence.",
    image: epiImage,
    link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202401118",
    external: true,
  },
];

const PlasmidsList = () => {
  const navigate = useNavigate();
  const [activePlasmid, setActivePlasmid] = useState("");
  const cardRefs = useRef({});

  // 生成锚点链接
  const anchorItems = plasmidsData.map((plasmid) => ({
    key: plasmid.id,
    href: `#plasmid-${plasmid.id}`,
    title: plasmid.name,
  }));

  // 监听滚动,更新活动锚点
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const plasmid of plasmidsData) {
        const element = cardRefs.current[plasmid.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActivePlasmid(`plasmid-${plasmid.id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReadMore = (plasmid) => {
    if (plasmid.external || plasmid.link.startsWith("http")) {
      window.open(plasmid.link, "_blank"); // ✅ 外链
    } else {
      navigate(plasmid.link); // ✅ 内部路由
    }
  };

  return (
    <div className={styles.plasmidsContainer}>
      {/* 标题 */}
      <div className={styles.plasmidsHeader}>
        <h1>
          Plasmids Used in Our Labs
        </h1>
        <div className={styles.divider}></div>
        <div
          style={{
            marginLeft: "120px",
            marginRight: "120px",
            background: "linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)",
            borderLeft: "5px solid #52c41a",
            borderRight: "5px solid #52c41a",
            padding: "14px 18px",
            borderRadius: "8px",
            fontSize: "20px",
            lineHeight: "1.7",
            marginTop: "12px",
            marginBottom: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}
        >
          <span style={{ fontWeight: 600, color: "#389e0d" }}>
            Cotton
          </span>{" "}
          is a{" "}
          <span
            style={{
              background: "#f0f5ff",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            perennial woody plant
          </span>{" "}
          rich in{" "}
          <span style={{ color: "#722ed1", fontWeight: 500 }}>
            diverse secondary metabolites
          </span>
          .
          <br />
          Gene editing plasmids optimized in cotton demonstrate{" "}
          <span style={{ color: "#1677ff", fontWeight: 600 }}>
            strong applicability
          </span>{" "}
          and{" "}
          <span style={{ color: "#fa8c16", fontWeight: 600 }}>
            effectiveness
          </span>{" "}
          across a wide range of{" "}
          <span
            style={{
              background: "#fff7e6",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            complex plant species
          </span>
          .
        </div>
      </div>

      <div className={styles.plasmidsContent}>
        {/* 左侧目录 */}
        <div className={styles.plasmidsSidebar}>
          <div className={styles.sidebarSticky}>
            <h3>
              Plasmids Catalog
            </h3>
            <Anchor
              affix={false}
              getCurrentAnchor={() => `#${activePlasmid}`}
              items={anchorItems}
              offsetTop={100}
            />
          </div>
        </div>

        {/* 右侧卡片网格 */}
        <div className={styles.plasmidsGrid}>
          {plasmidsData.map((plasmid, index) => (
            <div
              key={plasmid.id}
              id={`plasmid-${plasmid.id}`}
              ref={(el) => (cardRefs.current[plasmid.id] = el)}
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <Card
                className={styles.plasmidCard}
                hoverable
                cover={
                  <div className={styles.cardImageWrapper}>
                    <img
                      alt={plasmid.name}
                      src={plasmid.image}
                      className={styles.cardImage}
                    />
                  </div>
                }
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    <Badge 
                      count={plasmid.id} 
                      style={{ 
                        backgroundColor: "#52c41a",
                        marginRight: "8px"
                      }} 
                    />
                    {plasmid.name}
                  </h3>
                  <p className={styles.cardDescription}>{plasmid.description}</p>
                  <Button
                    type="primary"
                    className={styles.readMoreBtn}
                    onClick={() => handleReadMore(plasmid)}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlasmidsList;