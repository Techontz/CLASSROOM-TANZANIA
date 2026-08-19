import type { PastPaper } from "@/types";

/**
 * Extracted verbatim from the original index.html (PAST_PAPERS).
 * Covers both real past papers (kind: "pastPaper") and mock exams (kind: "mock").
 */
export const SEED_PAST_PAPERS: Record<string, PastPaper> = {
  "bio-f2-2024": {
    id: "bio-f2-2024",
    kind: "pastPaper",
    subject: "Biology",
    title: "Form Two National Assessment",
    year: 2024,
    board: "NECTA",
    duration: "2:30 hours",
    totalMarks: 100,
    mcq: [{
      num: "1(i)",
      q: "During an experiment a student observed an organism's cell that had a nucleus not bounded by a membrane. Which organism was the cell taken from?",
      options: ["Human being", "A maize plant", "Bacterium", "Virus"],
      correct: 2
    }, {
      num: "1(ii)",
      q: "Food chain: Shrubs \u2192 Wildebeests \u2192 Hyena \u2192 Fungi. Which trophic level is occupied by the wildebeests?",
      options: ["Primary consumer", "Secondary consumer", "Producer", "Tertiary consumer"],
      correct: 0
    }, {
      num: "1(iii)",
      q: "Which organisms belong to the Division Bryophyta?",
      options: ["Paramecium and euglena", "Ferns and liverworts", "Liverworts and amoeba", "Liverworts and mosses"],
      correct: 3
    }, {
      num: "1(iv)",
      q: "In which specific part of the mammalian respiratory system does trapping of dust and microorganisms take place?",
      options: ["Alveolus", "Epiglottis", "Nose", "Diaphragm"],
      correct: 2
    }, {
      num: "1(v)",
      q: "Which part of the microscope should one use to regulate the amount of light passing from the mirror to the condenser?",
      options: ["Stage clip", "Diaphragm", "Hinge screw", "Ocular tube"],
      correct: 1
    }, {
      num: "1(vi)",
      q: "Which blood vessel transports deoxygenated blood from the heart to the lungs?",
      options: ["Pulmonary vein", "Pulmonary artery", "Mesenteric artery", "Coronary vein"],
      correct: 1
    }, {
      num: "1(vii)",
      q: "How can HIV/AIDS be prevented from spreading?",
      options: ["By sharing skin-piercing instruments", "By touching people's blood with a bare hand", "By transfusion using unscreened blood", "By abstaining from sexual intercourse"],
      correct: 3
    }, {
      num: "1(viii)",
      q: "Why is it dangerous to put kerosene in places where children play?",
      options: ["It can cause death when taken into the body", "It can cause injury when poured on the skin", "It emits harmful radiation which can cause damage", "It contains microorganisms which cause diseases"],
      correct: 0
    }, {
      num: "1(ix)",
      q: "Your friend complains of passing out hard and dry faeces. Which practice would you advise them to treat the problem?",
      options: ["Limiting the amount of fruits in the diet", "Ignoring the urge to go for a long call", "Taking an adequate amount of fibres in the diet", "Reducing the intake of vegetables and fruits"],
      correct: 2
    }, {
      num: "1(x)",
      q: "Diseases: (i) Malaria and bilharzia (ii) Syphilis and gonorrhoea (iii) Tuberculosis and plague (iv) Hepatitis B and AIDS. Which diseases are transmitted through unprotected sexual intercourse?",
      options: ["(iii) and (iv)", "(i) and (ii)", "(i) and (iv)", "(ii) and (iv)"],
      correct: 3
    }],
    matching: {
      prompt: "Match each use of a First Aid component in List A with its corresponding component in List B.",
      listA: [{
        id: "i",
        label: "Reducing muscle pain"
      }, {
        id: "ii",
        label: "Cleaning and drying wounds"
      }, {
        id: "iii",
        label: "Covering small wounds"
      }, {
        id: "iv",
        label: "Securing bandages"
      }, {
        id: "v",
        label: "Treating burns and scalds"
      }],
      listB: [{
        id: "A",
        label: "Sterile gloves"
      }, {
        id: "B",
        label: "Adhesive bandage"
      }, {
        id: "C",
        label: "Cotton wool"
      }, {
        id: "D",
        label: "Liniment"
      }, {
        id: "E",
        label: "Petroleum jelly"
      }, {
        id: "F",
        label: "Pain killers"
      }, {
        id: "G",
        label: "Scissors"
      }, {
        id: "H",
        label: "Safety pins"
      }],
      correct: {
        i: "D",
        ii: "C",
        iii: "B",
        iv: "H",
        v: "E"
      }
    },
    written: [{
      num: "Q3",
      marks: 10,
      prompt: "(a) Outline seven steps for carrying out a scientific investigation.\n(b) State the sense organ used in making each observation: (i) a colour change during a food test, (ii) identifying the smell of a flower, (iii) identifying the texture of sand.",
      model: "(a) 1) Identify a problem/observation  2) State the problem clearly  3) Formulate a hypothesis  4) Plan and carry out the experiment  5) Collect and record data  6) Analyse the results  7) Draw a conclusion and communicate findings.\n(b) (i) Eyes (sight)  (ii) Nose (smell)  (iii) Skin (touch)"
    }, {
      num: "Q4",
      marks: 10,
      prompt: "Briefly explain five methods of preventing the spread of malaria.",
      model: "1) Sleep under insecticide-treated mosquito nets  2) Drain or remove stagnant water where mosquitoes breed  3) Clear bushes and grass around homes  4) Spray indoor residual insecticides  5) Use mosquito repellents and screen doors/windows."
    }, {
      num: "Q5",
      marks: 10,
      prompt: "(a) State the four major requirements for photosynthesis to take place.\n(b) In three points, support the statement that photosynthesis is an important process to living organisms.",
      model: "(a) Sunlight, carbon dioxide, water, chlorophyll.\n(b) 1) Produces oxygen needed for respiration  2) Produces food (glucose) that forms the base of food chains  3) Removes carbon dioxide from the air, helping regulate the atmosphere."
    }, {
      num: "Q6",
      marks: 10,
      prompt: "How does gaseous exchange occur across the alveolus? Briefly explain by giving five points.",
      model: "1) Alveoli have thin, one-cell-thick walls \u2014 short diffusion distance  2) Alveoli have a large total surface area  3) Alveoli are surrounded by a dense network of capillaries  4) Oxygen diffuses from alveolar air into the blood  5) Carbon dioxide diffuses from the blood into the alveolar air to be exhaled  6) Moist alveolar walls help gases dissolve and diffuse."
    }, {
      num: "Q7",
      marks: 10,
      prompt: "(a) Describe the external structure of a plant leaf, naming its four main parts.\n(b) State one function of any two of the parts you named.",
      model: "(a) Lamina (leaf blade), midrib, petiole (leaf stalk), veins/leaf margin.\n(b) e.g. Lamina \u2014 broad surface where most photosynthesis and gas exchange happen. Petiole \u2014 attaches the leaf to the stem and carries water and nutrients to and from the leaf."
    }, {
      num: "Q8",
      marks: 10,
      prompt: "(a) Classify Plasmodium, Amoeba and Mushroom from Kingdom to Phylum level.\n(b) State one disadvantage to humans of (i) Amoeba and (ii) Mushroom.",
      model: "(a) Plasmodium \u2014 Kingdom Protista, Phylum Sporozoa. Amoeba \u2014 Kingdom Protista, Phylum Rhizopoda. Mushroom \u2014 Kingdom Fungi, Phylum Basidiomycota.\n(b) (i) Some Amoeba (e.g. Entamoeba histolytica) cause amoebic dysentery.  (ii) Some mushrooms are poisonous and can cause illness or death if eaten."
    }, {
      num: "Q9",
      marks: 10,
      prompt: "A figure shows the arrangement of vascular bundles in a monocotyledonous root, labelled A, B, C and D.\n(a) Name the parts labelled A, B, C and D.\n(b) State the functions of the parts labelled A, B and C.",
      model: "Typical monocot root cross-section, outside to inside: A \u2014 epidermis (with root hairs), B \u2014 xylem, C \u2014 phloem, D \u2014 cortex.\nFunctions: Epidermis (A) absorbs water and mineral salts. Xylem (B) transports water and mineral salts upward. Phloem (C) transports manufactured food to and from the root.\nNote: check labelling against your own textbook diagram, as figures can vary."
    }, {
      num: "Q10",
      marks: 15,
      prompt: "Why is blood circulation important in animals? Explain by giving six points.",
      model: "1) Transports oxygen from the lungs to body cells  2) Transports digested food/nutrients from the gut to cells  3) Carries carbon dioxide and other wastes to excretory organs  4) Transports hormones from glands to target organs  5) Helps distribute heat and regulate body temperature  6) Carries white blood cells and antibodies that defend the body against disease."
    }]
  },
  "geo-f4-2026-dar": {
    id: "geo-f4-2026-dar",
    kind: "mock",
    subject: "Geography",
    title: "Mock form iv 2026 - Dar",
    year: 2026,
    board: "Dar es Salaam Region (PMO-RALG)",
    duration: "3:00 hours",
    totalMarks: 100,
    mcq: [
      { num: "1(i)", q: "Which of the following is NOT an effect of the rotation of the earth?", options: ["Deflection of wind and ocean currents", "Occurrence of tides", "Changes in day and night", "The four seasons of the year"], correct: 3 },
      { num: "1(ii)", q: "A match kicks off at 11:00 pm on Wednesday in Madrid (40\u00b0N, 15\u00b0E). What time and day is it in Dar es Salaam (7\u00b0S, 45\u00b0E) at kick-off?", options: ["7:00 am Thursday", "7:00 pm Wednesday", "1:00 pm Wednesday", "1:00 am Thursday"], correct: 3 },
      { num: "1(iii)", q: "Mamdonga is a pastoralist who rears a small number of animals kept at home. Which form of livestock keeping does he practise?", options: ["Mixed farming", "Sedentary livestock keeping", "Transhumance", "Nomadic pastoralism"], correct: 1 },
      { num: "1(iv)", q: "Which of the following is a selection of three non-metallic minerals?", options: ["Gold, natural gas, and diamond", "Natural gas, silver and diamond", "Oil, diamond and coal", "Copper, silver and Oil"], correct: 2 },
      { num: "1(v)", q: "In an area of Auvergne, France, carbon dioxide gas is emitted from the ground. What is this volcanic feature called?", options: ["Solfatara", "Geysers", "Moffette", "Hot spring"], correct: 2 },
      { num: "1(vi)", q: "A coral reef with a circular/elliptical shape enclosing a lagoon in the Indian Ocean is best described as a(n)?", options: ["Fringing reef", "Barrier reef", "Lagoon", "Atoll"], correct: 3 },
      { num: "1(vii)", q: "During a flood, large boulders in a river collide with each other and gradually break into smaller, rounder particles. Which river erosion process is this?", options: ["Corrosion", "Attrition", "Hydraulic action", "Saltation"], correct: 1 },
      { num: "1(viii)", q: "Which of the following is a correct set of pull factors for migration?", options: ["Good climate, relief, employment opportunity and political stability", "Good climate, relief, employment opportunity and political instability", "Good soil, relief, social services and presence of diseases", "Good climate, relief, soil and availability of natural calamities"], correct: 0 },
      { num: "1(ix)", q: "An area has scattered trees, tall grass, scrubs and some bushes, with moderate rainfall. What vegetation type is this?", options: ["Equatorial vegetation", "Tropical vegetation", "Hot desert vegetation", "Mountain vegetation"], correct: 1 },
      { num: "1(x)", q: "Research carried out to explain the achievement of a coastal ecosystem conservation project in reducing biodiversity loss is known as?", options: ["Evaluative research", "Qualitative research", "Quantitative research", "Applied research"], correct: 0 },
    ],
    matching: {
      prompt: "Match each description of mass wasting in List A with its correct name in List B.",
      listA: [
        { id: "i", label: "Rapid movement of saturated soil mixed with gravel and boulders down the slope" },
        { id: "ii", label: "Individual rock moving down the slope at very low speed" },
        { id: "iii", label: "Rapid movement of saturated materials from the earth's surface" },
        { id: "iv", label: "Slowest and unnoticeable movement of soil down a gentle slope" },
        { id: "v", label: "Slow and gentle movement of broken rock particles of different sizes" },
        { id: "vi", label: "Movement of gravel mixed with water-saturated soil down a slope" },
      ],
      listB: [
        { id: "A", label: "Soil creep" }, { id: "B", label: "Earth flow" },
        { id: "C", label: "Rock slump" }, { id: "D", label: "Mud flow" },
        { id: "E", label: "Solifluction" }, { id: "F", label: "Talus creep" },
        { id: "G", label: "Rock fall" }, { id: "H", label: "Rock creep" },
      ],
      correct: { i: "D", ii: "H", iii: "B", iv: "A", v: "F", vi: "E" },
    },
    written: [
      { num: "Q3", marks: 12, prompt: "A map extract of Kigoma (Sheet 92/3) is provided.\n(a) How long, in kilometres, is the railway line from grid reference 023577 to grid reference 980612?\n(b) State three factors that have influenced the location of Kigoma town.\n(c) Explain, with evidence, three economic activities likely to take place in the area.\n(d) Giving reasons, identify the rock structure of the mapped area.", model: "(a) This needs the actual map: count grid squares along the railway between the two references and convert using the map's scale (e.g. count squares \u00d7 grid square length in km). Practise this on your own map extract.\n(b) Likely factors: location on the shore of Lake Tanganyika (natural harbour for trade with DRC, Burundi, Zambia); being a railway terminus (Central Line) linking it to Dar es Salaam; and relatively favourable relief along the lake shore for settlement.\n(c) Likely activities: fishing (from Lake Tanganyika); trade/commerce (import-export through the port); and transport services (railway and lake transport hub).\n(d) Read the map's relief and drainage: steep valley sides near a rift lake usually suggest resistant crystalline/metamorphic basement rock, while flat lake-shore land may suggest sedimentary deposits. Check any rock symbols in the map key to confirm." },
      { num: "Q4", marks: 8, prompt: "Madenge conducted a research study on the impact of climate change in Tanzania. He purposively selected seven experts from the Tanzania Meteorological Authority (TMA) and held in-depth discussions with them.\n(a) Identify the research approach used.\n(b) Explain the data collection method applied.\n(c) Outline three advantages and three disadvantages of the method used.", model: "(a) Qualitative research approach (purposive sampling of experts, in-depth exploration of views).\n(b) Data collection method: in-depth (key informant) interviews \u2014 open discussion with knowledgeable individuals to gather detailed information.\n(c) Advantages: gathers rich, detailed information; allows follow-up and clarification; well suited to specialist/expert knowledge.\nDisadvantages: time-consuming; small sample limits how far results generalise; interviewer bias is possible." },
      { num: "Q5", marks: 6, prompt: "While travelling to Mtwara, Anna saw the Rufiji River with a feature shaped like a crescent.\n(a) Name the feature Anna saw.\n(b) Using a well-labelled diagram, illustrate how this feature is formed.", model: "(a) An oxbow lake.\n(b) Formation: a river meander is eroded on its outer bank and material is deposited on its inner bank, narrowing the neck of the loop. During a flood, the river cuts straight through the narrow neck, taking the shorter path. Deposition then seals off the old loop, leaving it as a crescent-shaped oxbow lake separate from the main channel. (Sketch: a looping river channel, a narrow neck, an arrow showing the flood cutting through, and the abandoned loop shown as a separate crescent lake.)" },
      { num: "Q6", marks: 10, prompt: "Study the photograph of the dam (provided in the paper) and answer:\n(a) With two reasons, suggest the type of photograph.\n(b) Name the main activity taking place in the area.\n(c) Describe three contributions of that activity.\n(d) Mention two places in Tanzania where such a photograph might have been taken.\n(e) Mention two physical features shown in the photograph.", model: "(a) Likely an oblique (ground-level, angled) photograph \u2014 taken from an elevated viewpoint with the horizon visible, showing depth across the landscape.\n(b) Main activity: hydroelectric power generation (a dam holding back a river).\n(c) Contributions: generates electricity for the national grid; supports irrigation and water storage; creates jobs during construction and operation.\n(d) Major hydro-dam sites in Tanzania include the Julius Nyerere Hydropower Project on the Rufiji River, and others such as Kihansi, Mtera, and Kidatu \u2014 check which one matches the photo caption in your paper.\n(e) Physical features likely shown: the river/reservoir, and the valley or gorge the dam is built across." },
      { num: "Q7", marks: 8, prompt: "Surveyors taking linear measurements along a traverse suddenly found a forest blocking their line of sight, because a pre-visit survey had not been done.\n(a) What step or procedure was skipped before the survey work?\n(b) Explain, using a diagram, how this obstacle can be overcome.", model: "(a) Reconnaissance survey \u2014 an initial site visit to identify obstacles and plan the survey before detailed measurement begins.\n(b) One common method is the random-line (auxiliary line) method: the surveyor sets out an auxiliary line around the obstruction at a measured angle, takes offsets/measurements along it, and uses these to calculate the true distance across the blocked section. (Sketch: the main traverse line interrupted by a forest block, with a dashed auxiliary line drawn around it reconnecting to the main line on the far side.)" },
      { num: "Q8", marks: 10, prompt: "A shop recorded phone sales (Samsung, Tecno, Infinix, iPhone) for 2019\u20132022.\n(a) Present the data using a compound bar graph.\n(b) Explain two advantages and two disadvantages of a compound bar graph.\n(c) Name two other methods that could present this data.", model: "(a) Draw one bar per year (2019\u20132022); divide each bar into four segments (one per phone brand, using the actual sales figures), and include a colour-coded legend.\n(b) Advantages: shows both the yearly total and the breakdown by brand at a glance; makes comparing categories across years easy. Disadvantages: individual segment values (other than the bottom one) can be hard to read precisely; the graph gets cluttered with too many categories or years.\n(c) Other methods: a line graph, or a pie chart for each year." },
      { num: "Q9", marks: 15, prompt: "The form one class was taught that the African continent has major relief features. Giving examples for each, explain the five major relief features taught.", model: "1) Plateaus \u2014 e.g. the East African Plateau.\n2) Mountains \u2014 e.g. Mount Kilimanjaro, Mount Kenya.\n3) Rift valleys \u2014 e.g. the Great East African Rift Valley.\n4) River basins/plains \u2014 e.g. the Congo Basin, the Nile Basin.\n5) Coastal plains \u2014 e.g. the plains along the Indian Ocean and Atlantic coastlines." },
      { num: "Q10", marks: 15, prompt: "Describe six ways in which transport contributes to development in Tanzania.", model: "1) Moves goods to markets, boosting trade.\n2) Moves raw materials to industries.\n3) Supports tourism by linking attractions to visitors.\n4) Creates employment (drivers, mechanics, transport staff).\n5) Improves access to social services like health and education in remote areas.\n6) Promotes national integration by connecting regions, and attracts investment." },
      { num: "Q11", marks: 15, prompt: "Dar es Salaam is the largest city in Tanzania, but Joyine is not encouraged to live there because of problems linked to its growth. Using six points, describe this statement.", model: "1) Traffic congestion.\n2) Housing shortages and high cost of living.\n3) Unemployment, since rural-urban migration can outpace available jobs.\n4) Pollution (air, water, and noise).\n5) Higher crime rates.\n6) Strain on social services (healthcare, schools, water supply) and growth of informal settlements/slums." },
    ],
  },
};


export let PAST_PAPERS: Record<string, PastPaper> = SEED_PAST_PAPERS;

/** Called by the content store once the catalogue has been fetched. */
export function setPastPapers(papers: Record<string, PastPaper>): void {
  PAST_PAPERS = papers;
}

export function papersOfKind(kind: PastPaper["kind"]): PastPaper[] {
  return Object.values(PAST_PAPERS).filter((p) => p.kind === kind);
}

export function findPaper(paperId: string): PastPaper | undefined {
  return PAST_PAPERS[paperId];
}
