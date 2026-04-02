// help
export const helpItems = [
    { id: 'crisprone', question: "What is CRISPRone?", answer: "CRISPRone is a comprehensive web-based tool for CRISPR-based genome editing design. It integrates various CRISPR systems including Cas9, Cas12, Cas13, Base Editors, Prime Editors, and more." },
    { id: 'characteristics', question: "What are the characteristics of CRISPRone?", answer: "CRISPRone features include: multi-system support, intuitive interface, comprehensive analysis tools, and real-time design validation. It supports various organisms and provides detailed guide RNA predictions." },
    { id: 'enzymes', question: "Notes on enzymes", answer: "answer" },
    { id: 'genomes', question: "Notes on genomes", answer: "answer" },
    { id: 'cas9', question: "How do you use Cas9 design?", answer: "answer" },
    { id: 'cas12_cpf1', question: "How do you use Cas12 Cpf1 design?", answer: "answer" },
    { id: 'cas12_c2c1', question: "How do you use Cas12 C2c1 design?", answer: "answer" },
    { id: 'cas13', question: "How do you use Cas13 design?", answer: "answer" },
    { id: 'base_editor', question: "How do you use Base Editor design?", answer: "answer" },
    { id: 'prime_editor', question: "How do you use Prime Editor design?", answer: "answer" },
    { id: 'prime_editing', question: "How prime editing works?", answer: "answer" },
    { id: 'prime_editor_design', question: "Using the Prime Editor design tool in CRISPRone", answer: "answer" },
    { id: 'crispr_knockin', question: "How do you use CIRSPRa design?", answer: "answer" },
    { id: 'crispr_knockin2', question: "How do you use CIRSPR Knock-in design?", answer: "answer" },
    { id: 'epigenome', question: "How do you use CIRSPR Epigenome design?", answer: "answer" },
    { id: 'fragment_editor', question: "How do you use Fragment Editor design?", answer: "The Fragment Editor allows you to edit larger DNA sequences. Steps include: 1) Input your target sequence 2) Select modification type 3) Design and validate your editing strategy 4) Review predicted outcomes" }
];

// CRISPR Knowledge Base Q&A
export const crisprQA = [
    { 
        id: 'q1', 
        question: "CRISPR/Cas12b（C2c1）与Cas9相比，在PAM序列和切割末端方面有何主要区别？", 
        answer: "AacCas12b的PAM序列为5'-TTN-3'（位于靶位点上游），而Cas9的PAM通常为NGG。Cas12b切割产生6-8 nt的粘性末端，是目前所有CRISPR-Cas系统中最长的粘性末端，而Cas9产生平末端。此外，Cas12b需要同时依赖crRNA和tracrRNA形成的嵌合sgRNA。" 
    },
    { 
        id: 'q2', 
        question: "在棉花中应用CRISPR/Cas12b系统时，哪个温度条件和处理时间获得了最高的编辑效率？", 
        answer: "在45°C处理4天时，转化外植体表现出最高的编辑效率（17.14%）。研究表明，AacCas12b在40-55°C范围内具有有效切割活性，低于40°C则无法完成切割。" 
    },
    { 
        id: 'q3', 
        question: "CRISPR/Cpf1（Cas12a）相比Cas9在PAM识别上有什么优势，用于棉花基因组编辑时选择了哪种Cpf1？", 
        answer: "Cpf1的PAM序列为5'-TTTV-3'，偏好A/T含量较高的序列，而Cas9偏好G/C含量较高的PAM位点，因此两者在靶位点选择上形成互补。棉花（异源四倍体）研究中使用的是来自Lachnospiraceae bacterium ND2006的LbCpf1，研究表明其编辑效率高于AsCpf1和SpCas9。" 
    },
    { 
        id: 'q4', 
        question: "REPAIR系统是什么？它如何实现RNA编辑？", 
        answer: "REPAIR（RNA Editing for Programmable A to I Replacement）是一种基于催化失活Cas13（dCas13）的RNA碱基编辑系统。dCas13通过crRNA引导定位到目标RNA转录本，将腺苷脱氨酶ADAR2招募到靶位点，催化腺苷（A）到肌苷（I）的转换（读码框中类似鸟苷G）。该系统无严格序列限制，可编辑含致病突变的全长转录本。" 
    },
    { 
        id: 'q5', 
        question: "SHINE检测平台相比传统两步SHERLOCK方法的主要改进是什么？", 
        answer: "SHINE（Streamlined Highlighting of Infections to Navigate Epidemics）将RT-RPA扩增与Cas13检测整合为单步反应，同时结合改进版HUDSON（加入RNase抑制剂）实现无需核酸提取的直接检测。其检测灵敏度为10 cp/μL（荧光读出），并配套智能手机应用程序实现自动化结果判读，总检测时间约50分钟。" 
    },
    { 
        id: 'q6', 
        question: "dCas9-SunTag-TET1系统如何实现靶向DNA去甲基化？其去甲基化效率如何？", 
        answer: "该系统由两个模块组成：dCas9融合多拷贝GCN4肽重复序列（SunTag），以及抗GCN4的单链抗体（scFv）融合TET1催化结构域。通过sgRNA引导dCas9到特定位点，SunTag招募多拷贝scFv-TET1，TET1催化5-甲基胞嘧啶氧化启动去甲基化。将连接子从5 aa优化为22 aa后，系统在9个测试位点中7个实现了>50%去甲基化效率，其中4个位点效率超过90%。" 
    },
    { 
        id: 'q7', 
        question: "dCas9-DNMT3A系统用于靶向DNA甲基化的作用机制及实验证明的功能效果是什么？", 
        answer: "dCas9-DNMT3A由催化失活的Cas9（dCas9）融合DNA甲基转移酶DNMT3A催化结构域构成，通过sgRNA引导至特定位点实现~35 bp范围内的CpG甲基化。实验证明，靶向IL6ST和BACH2基因启动子的更大区域（多个sgRNA协同）实现了较宽范围的CpG甲基化，并导致对应基因表达下调，且甲基化可通过有丝分裂稳定遗传。" 
    },
    { 
        id: 'q8', 
        question: "转座子编码的CRISPR-Cas系统（以V. cholerae Tn6677为例）实现RNA引导DNA整合的机制是什么？", 
        answer: "Tn6677系统通过Cascade（I-F亚型）识别靶序列（需要5'-CC-3' PAM），并与转座子特异蛋白TniQ形成复合体，将异源转座酶TnsABC招募到靶位点下游，指导转座子在Cascade靶位点下游约46-55 bp处进行位点特异性DNA整合。整合过程不需要同源重组，且99%以上的读取来自靶标整合位点，不依赖于DSB修复途径。" 
    },
    { 
        id: 'q9', 
        question: "Cpf1（Cas12a）的pre-crRNA自我加工特性有何实际应用价值？", 
        answer: "Cpf1能自行将前体crRNA（pre-crRNA）加工成成熟crRNA，无需tracrRNA参与。这一特性使得多重基因编辑更为简便——可将多个crRNA序列串联在一个阵列（array）中，由单个Cas12a蛋白依次处理，从而用一个表达盒实现多位点同时编辑，大大简化了多重编辑的载体构建。" 
    },
    { 
        id: 'q10', 
        question: "在Arabidopsis中使用CRISPR-Cas12b系统进行基因组编辑时，选用了哪些Cas12b直系同源蛋白？在脱靶效应方面有何发现？", 
        answer: "研究选用了BvCas12b（来自Beta vulgaris）和BhCas12b v4（工程改造版本）两种直系同源蛋白，成功在拟南芥中实现了靶向突变、多重基因组编辑和大片段缺失。在潜在脱靶位点检测中未发现显著突变，表明CRISPR-Cas12b系统在拟南芥中具有较高的特异性。" 
    },
    { 
        id: 'q11', 
        question: "CRISPR/Cas13a用于干扰RNA病毒时，靶向哪些区域最有效？", 
        answer: "在干扰芜菁花叶病毒（TuMV）的研究中，靶向HC-Pro（辅助成分蛋白酶）和GFP序列的crRNA表现出最佳干扰效果，优于靶向外壳蛋白（CP）序列的crRNA。这表明靶标区域的选择对Cas13a介导的病毒干扰效率有显著影响。" 
    },
    { 
        id: 'q12', 
        question: "利用CRISPR/Cas9进行大片段缺失时，相比单个切割位点有何优势？实验中如何实现快速基因组编辑？", 
        answer: "双gRNA联合使用可引导Cas9在目标区域两端分别切割，从而删除两切割位点之间的大段序列（数百至数千bp），比单位点产生的小Indel更有效地破坏基因功能。利用瞬时转染（如RNP或mRNA形式递送Cas9和gRNA），可避免外源DNA的随机整合，减少脱靶风险，并实现更快速的编辑筛选。" 
    },
    { 
        id: 'q13', 
        question: "CRISPR/Cas12b系统的温度诱导特性在棉花中有何实际意义？", 
        answer: "棉花是嗜热植物，在许多棉花产区7月末气温可超过40°C。AacCas12b在40-55°C范围内具有最佳切割活性，这与棉花的生长温度天然匹配。因此无需额外热处理装置，可利用自然高温条件诱导基因组编辑，同时由于低温下Cas12b活性受抑制，还可能降低非目标时期的脱靶效应。" 
    },
    { 
        id: 'q14', 
        question: "在SARS-CoV-2的单步SHERLOCK检测中，添加RNase H的作用是什么？最终的检测灵敏度如何？", 
        answer: "RNase H通过降解逆转录过程中产生的DNA:RNA杂合中间体，提高了逆转录酶的效率，从而将初始单步检测的LOD从10^6 cp/μL提升约10倍至10^5 cp/μL。经过进一步优化缓冲液、镁离子和引物浓度后，最终优化的单步SHERLOCK荧光检测灵敏度达到10 cp/μL，侧流层析比色读出为100 cp/μL。" 
    },
    { 
        id: 'q15', 
        question: "Cas12b与Cas12a（Cpf1）都属于V型CRISPR系统，两者在引导RNA需求上有何关键差异？", 
        answer: "Cas12a（Cpf1）仅需要crRNA即可完成双链DNA切割，且能自我加工pre-crRNA；而Cas12b需要同时依赖crRNA和tracrRNA（类似Cas9），二者碱基配对形成嵌合sgRNA后才能与Cas12b蛋白结合形成有活性的复合体。此外，Cas12b还缺乏Cas12a具有的Nuc结构域。" 
    },
    { 
        id: 'q16', 
        question: "在异源四倍体棉花（G. hirsutum）中进行CRISPR/Cpf1编辑时，T0代和T1代的遗传结果如何？", 
        answer: "在T0代中，CRISPR/Cpf1系统成功产生靶基因突变，表型和遗传编辑均可观察到。更重要的是，T0代发生的遗传编辑能够忠实遗传至T1代后代，并在T1代中获得了纯合突变体。全基因组测序（WGS）将用于后续评估脱靶效应。" 
    },
    { 
        id: 'q17', 
        question: "dCas9-SunTag系统在哺乳动物细胞和体内（in vivo）应用的实验证据是什么？", 
        answer: "研究在胚胎干细胞（ESC）、癌细胞系和原代神经前体细胞等多种体外培养体系中均证实了靶向去甲基化活性及相关基因上调（1.7至50倍）。更重要的是，该研究首次报道了基于CRISPR的表观基因组操纵可在小鼠胎儿体内（in vivo）发挥作用，证明了该系统在活体治疗应用方面的潜力。" 
    },
    { 
        id: 'q18', 
        question: "转座子编码CRISPR系统在基因工程中相比传统CRISPR-Cas9的主要优势是什么？", 
        answer: "传统Cas9进行精确基因插入需依赖同源重组（HDR），效率低且仅在分裂细胞中有效。转座子编码CRISPR系统（如V. cholerae Tn6677）可在不产生DSB的情况下实现RNA引导的位点特异性DNA整合，无需同源模板，在16/16个测试位点中均显示~95%的靶向特异性，且整合位置高度可预测（靶位点下游46-55 bp）。" 
    },
    { 
        id: 'q19', 
        question: 'Cas13作为RNA靶向工具，其"附带切割"（collateral cleavage）活性在诊断中如何被利用？', 
        answer: "Cas13在识别并结合目标RNA后，会被激活并非特异性地切割附近的单链RNA（collateral cleavage）。在诊断应用（如SHERLOCK）中，反应体系中加入带有荧光基团和淬灭剂的ssRNA报告分子，当Cas13被靶RNA激活后，附带切割将报告分子切断，荧光基团与淬灭剂分离，产生可检测的荧光信号，从而实现超灵敏的核酸检测。" 
    },
    { 
        id: 'q20', 
        question: "RNA靶向CRISPR-Cas系统分为哪些主要类型？它们各自的靶向特点是什么？", 
        answer: "根据文献综述，能够靶向RNA的CRISPR-Cas系统主要包括：(1) III型（Csm/Cmr复合物）：靶向单链RNA，由多效应蛋白复合物介导，在原核生物免疫中发挥作用；(2) VI型（Cas13）：单效应子RNA引导核糖核酸酶，以ssRNA为靶标，具有附带切割活性，已广泛应用于RNA敲低、编辑和诊断；(3) II型（Cas9）：主要靶向DNA，但也可在特定条件下靶向RNA（如PAM-presenting RNA）。其中VI型Cas13因其强大的可编程性和灵敏性在诊断和治疗领域应用最为广泛。" 
    }
];
