import type { QuizTest } from "@/types";

/**
 * Extracted verbatim from the original index.html (QUIZZES).
 * Keyed by subject id; each subject has an ordered list of tests.
 * Offline fallback only — see the note in src/data/subjects.ts.
 */
const SEED_QUIZ_CONTENT: Record<string, Omit<QuizTest, "id" | "subjectId" | "index">[]> = {
  math: [
    { name: "Test 1", topic: "Algebra", questions: [
      { q: "Solve for x: 2x + 3 = 11", options: ["x = 3", "x = 4", "x = 5", "x = 8"], correct: 1 },
      { q: "Simplify: 3(x + 2)", options: ["3x + 2", "x + 6", "3x + 6", "3x + 5"], correct: 2 },
      { q: "If x = 5, evaluate 2x \u2212 3", options: ["6", "7", "8", "10"], correct: 1 },
      { q: "Solve for x: x / 3 = 4", options: ["x = 7", "x = 9", "x = 12", "x = 15"], correct: 2 },
      { q: "Factorise: x\u00b2 \u2212 9", options: ["(x \u2212 3)(x + 3)", "(x \u2212 9)(x + 1)", "(x \u2212 3)\u00b2", "(x + 9)(x \u2212 1)"], correct: 0 },
    ]},
    { name: "Test 2", topic: "Linear Equations", questions: [
      { q: "Solve: 3x \u2212 5 = 10", options: ["3", "4", "5", "6"], correct: 2 },
      { q: "Solve: 5x + 2 = 22", options: ["2", "3", "4", "5"], correct: 2 },
      { q: "Solve: 7 \u2212 x = 2", options: ["3", "4", "5", "6"], correct: 2 },
      { q: "Solve: x / 4 = 5", options: ["16", "18", "20", "24"], correct: 2 },
      { q: "Solve: 2(x \u2212 1) = 8", options: ["4", "5", "6", "7"], correct: 1 },
    ]},
    { name: "Test 3", topic: "Factorisation", questions: [
      { q: "Factorise: x\u00b2 + 5x + 6", options: ["(x+1)(x+6)", "(x+2)(x+3)", "(x+3)(x+4)", "(x+6)(x+1)"], correct: 1 },
      { q: "Factorise: x\u00b2 \u2212 4", options: ["(x\u22122)(x+2)", "(x\u22124)(x+1)", "(x\u22122)\u00b2", "(x+4)(x\u22121)"], correct: 0 },
      { q: "Take out the common factor: 6x + 9", options: ["3(2x + 3)", "2(3x + 3)", "3(2x + 9)", "9(x + 6)"], correct: 0 },
      { q: "Factorise: x\u00b2 \u2212 7x + 12", options: ["(x\u22123)(x\u22124)", "(x\u22122)(x\u22126)", "(x\u22121)(x\u221212)", "(x+3)(x+4)"], correct: 0 },
      { q: "Factorise: 2x\u00b2 + 4x", options: ["2x(x + 2)", "2x(x + 4)", "x(2x + 2)", "4x(x + 1)"], correct: 0 },
    ]},
  ],
  eng: [
    { name: "Test 1", topic: "Grammar basics", questions: [
      { q: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
      { q: "What is the plural of \u201cchild\u201d?", options: ["childs", "childes", "children", "child"], correct: 2 },
      { q: "Which sentence is correct?", options: ["He don't know the answer.", "He doesn't know the answer.", "He not knows the answer.", "He no knows the answer."], correct: 1 },
      { q: "Choose the synonym for \u201chappy\u201d.", options: ["angry", "joyful", "tired", "afraid"], correct: 1 },
      { q: "Which word is a noun?", options: ["quickly", "run", "book", "beautiful"], correct: 2 },
    ]},
    { name: "Test 2", topic: "Parts of Speech", questions: [
      { q: "Which word is a verb?", options: ["happy", "quickly", "run", "table"], correct: 2 },
      { q: "Which word is an adjective?", options: ["dog", "beautiful", "slowly", "jump"], correct: 1 },
      { q: "Which word is an adverb?", options: ["quick", "quickly", "quickness", "quicken"], correct: 1 },
      { q: "Identify the pronoun: \u201cShe went to the market.\u201d", options: ["She", "went", "to", "market"], correct: 0 },
      { q: "Which is a preposition?", options: ["under", "run", "happy", "quickly"], correct: 0 },
    ]},
    { name: "Test 3", topic: "Sentence Structure", questions: [
      { q: "Which is a complete sentence?", options: ["Running fast.", "The dog runs.", "Because it rained.", "Under the table."], correct: 1 },
      { q: "Identify the subject: \u201cThe teacher explained the lesson.\u201d", options: ["teacher", "explained", "lesson", "the"], correct: 0 },
      { q: "Identify the object: \u201cAmina reads a book.\u201d", options: ["Amina", "reads", "a book", "book club"], correct: 2 },
      { q: "Which sentence has correct word order?", options: ["Book Amina reads a.", "Amina a reads book.", "Amina reads a book.", "Reads Amina a book."], correct: 2 },
      { q: "What type of sentence is \u201cClose the door!\u201d?", options: ["Statement", "Question", "Command", "Exclamation"], correct: 2 },
    ]},
  ],
  kisw: [
    { name: "Test 1", topic: "Sarufi ya msingi", questions: [
      { q: "Nomino ni neno linaloelezea nini?", options: ["Kitendo", "Jina la kitu, mtu au mahali", "Sifa ya kitu", "Wakati wa tukio"], correct: 1 },
      { q: "\u201cKitabu\u201d ni aina gani ya neno?", options: ["Kivumishi", "Kitenzi", "Nomino", "Kielezi"], correct: 2 },
      { q: "Kinyume cha neno \u201ckubwa\u201d ni?", options: ["Kidogo", "Refu", "Nzuri", "Nzito"], correct: 0 },
      { q: "Umoja wa \u201cvitabu\u201d ni?", options: ["Vitabu", "Kitabu", "Chitabu", "Kivitabu"], correct: 1 },
      { q: "Katika sentensi \u201cMtoto anacheza\u201d, kitenzi ni neno gani?", options: ["Mtoto", "Anacheza", "Mtoto anacheza", "Hakuna kitenzi"], correct: 1 },
    ]},
    { name: "Test 2", topic: "Aina za Maneno", questions: [
      { q: "\u201cKitenzi\u201d ni neno linaloonyesha nini?", options: ["Kitendo", "Jina", "Sifa", "Idadi"], correct: 0 },
      { q: "\u201cMzuri\u201d ni aina gani ya neno?", options: ["Nomino", "Kitenzi", "Kivumishi", "Kielezi"], correct: 2 },
      { q: "Chagua nomino sahihi:", options: ["Mtoto", "Anacheza", "Kubwa", "Haraka"], correct: 0 },
      { q: "Chagua kitenzi sahihi:", options: ["Kitabu", "Anasoma", "Nzuri", "Polepole"], correct: 1 },
      { q: "Chagua kielezi sahihi:", options: ["Mtoto", "Taratibu", "Mzuri", "Nyumba"], correct: 1 },
    ]},
    { name: "Test 3", topic: "Muundo wa Sentensi", questions: [
      { q: "Kiima cha sentensi \u201cBaba anapika chakula\u201d ni yupi?", options: ["Baba", "anapika", "chakula", "Hakuna"], correct: 0 },
      { q: "Kiarifu cha sentensi hiyo ni kipi?", options: ["Baba", "anapika chakula", "chakula", "Hakuna"], correct: 1 },
      { q: "Sentensi sahihi ni ipi?", options: ["Chakula baba anapika", "Anapika baba chakula", "Baba anapika chakula", "Chakula anapika baba"], correct: 2 },
      { q: "Sentensi \u201cMvua inanyesha\u201d ina maneno mangapi?", options: ["1", "2", "3", "4"], correct: 1 },
      { q: "Alama gani huweka mwisho wa sentensi ya kawaida?", options: ["!", "?", ".", "\u2014"], correct: 2 },
    ]},
  ],
  bio: [
    { name: "Test 1", topic: "The cell", questions: [
      { q: "What is the basic unit of life?", options: ["Tissue", "Organ", "Cell", "Organism"], correct: 2 },
      { q: "Which structure is known as the \u201cpowerhouse of the cell\u201d?", options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"], correct: 1 },
      { q: "Which structure is found in plant cells but not animal cells?", options: ["Cell membrane", "Cytoplasm", "Cell wall", "Nucleus"], correct: 2 },
      { q: "The process by which plants make their own food is called?", options: ["Respiration", "Digestion", "Photosynthesis", "Excretion"], correct: 2 },
      { q: "What is the green pigment in plant leaves called?", options: ["Melanin", "Chlorophyll", "Carotene", "Xanthophyll"], correct: 1 },
    ]},
    { name: "Test 2", topic: "Plant vs Animal Cells", questions: [
      { q: "Which structure is unique to plant cells?", options: ["Nucleus", "Cell wall", "Cytoplasm", "Cell membrane"], correct: 1 },
      { q: "What do chloroplasts do?", options: ["Store water", "Carry out photosynthesis", "Produce energy from food", "Control the cell"], correct: 1 },
      { q: "Which cell type usually has an irregular shape?", options: ["Plant cell", "Animal cell", "Both", "Neither"], correct: 1 },
      { q: "What is the large fluid-filled structure common in plant cells?", options: ["Vacuole", "Nucleus", "Ribosome", "Mitochondria"], correct: 0 },
      { q: "Which cells get energy directly from sunlight?", options: ["Animal cells", "Plant cells", "Bacteria only", "Fungi only"], correct: 1 },
    ]},
    { name: "Test 3", topic: "Cell Organelles", questions: [
      { q: "Which organelle builds proteins?", options: ["Mitochondria", "Ribosome", "Nucleus", "Vacuole"], correct: 1 },
      { q: "Which organelle controls the cell's activities?", options: ["Nucleus", "Ribosome", "Cytoplasm", "Cell membrane"], correct: 0 },
      { q: "Where does most energy release happen in a cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cell wall"], correct: 1 },
      { q: "What surrounds and protects the cell's contents?", options: ["Nucleus", "Cell membrane", "Ribosome", "Chloroplast"], correct: 1 },
      { q: "Which structure holds genetic material?", options: ["Mitochondria", "Ribosome", "Nucleus", "Vacuole"], correct: 2 },
    ]},
  ],
  chem: [
    { name: "Test 1", topic: "Atoms and elements", questions: [
      { q: "What is the smallest particle of an element that retains its properties?", options: ["Molecule", "Atom", "Ion", "Compound"], correct: 1 },
      { q: "What is the chemical symbol for sodium?", options: ["So", "Sd", "Na", "Sn"], correct: 2 },
      { q: "What is the chemical formula for water?", options: ["HO2", "H2O", "H2O2", "HO"], correct: 1 },
      { q: "The number of protons in an atom determines its?", options: ["Mass", "Element identity", "Charge only", "Colour"], correct: 1 },
      { q: "Which state of matter has a fixed shape and fixed volume?", options: ["Gas", "Liquid", "Solid", "Plasma"], correct: 2 },
    ]},
    { name: "Test 2", topic: "The Periodic Table", questions: [
      { q: "Elements in the periodic table are arranged mainly by?", options: ["Colour", "Atomic number", "Price", "Weight only"], correct: 1 },
      { q: "Elements in the same group usually have similar?", options: ["Names", "Chemical properties", "Colours", "Prices"], correct: 1 },
      { q: "What is a horizontal row in the periodic table called?", options: ["Group", "Period", "Family", "Series"], correct: 1 },
      { q: "What is a vertical column in the periodic table called?", options: ["Row", "Group", "Period", "Level"], correct: 1 },
      { q: "Which of these is a metal on the periodic table?", options: ["Oxygen", "Sodium", "Chlorine", "Neon"], correct: 1 },
    ]},
    { name: "Test 3", topic: "States of Matter", questions: [
      { q: "Which state of matter has a fixed volume but no fixed shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], correct: 1 },
      { q: "What happens to particles when a solid is heated enough to melt?", options: ["They stop moving", "They move further apart", "They disappear", "They combine"], correct: 1 },
      { q: "What is the process called when a liquid turns into a gas?", options: ["Melting", "Freezing", "Evaporation", "Condensation"], correct: 2 },
      { q: "What is the process called when a gas turns into a liquid?", options: ["Melting", "Evaporation", "Condensation", "Sublimation"], correct: 2 },
      { q: "Which state of matter takes the shape and volume of its container?", options: ["Solid", "Liquid", "Gas", "None"], correct: 2 },
    ]},
  ],
  phy: [
    { name: "Test 1", topic: "Force and motion", questions: [
      { q: "What is the SI unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"], correct: 1 },
      { q: "Speed is calculated as?", options: ["Distance \u00d7 time", "Distance \u00f7 time", "Time \u00f7 distance", "Distance + time"], correct: 1 },
      { q: "Which force opposes motion between two surfaces?", options: ["Gravity", "Friction", "Tension", "Magnetism"], correct: 1 },
      { q: "What is the SI unit of energy?", options: ["Newton", "Watt", "Joule", "Ampere"], correct: 2 },
      { q: "Acceleration due to gravity on Earth is approximately?", options: ["3.8 m/s\u00b2", "6.6 m/s\u00b2", "9.8 m/s\u00b2", "12.4 m/s\u00b2"], correct: 2 },
    ]},
    { name: "Test 2", topic: "Newton's Laws", questions: [
      { q: "Newton's First Law is also called the law of?", options: ["Gravity", "Inertia", "Motion", "Energy"], correct: 1 },
      { q: "According to Newton's Second Law, force equals?", options: ["mass + acceleration", "mass \u00d7 acceleration", "mass \u00f7 acceleration", "mass \u2212 acceleration"], correct: 1 },
      { q: "Newton's Third Law states every action has an equal and opposite?", options: ["Force", "Reaction", "Mass", "Speed"], correct: 1 },
      { q: "An object at rest stays at rest unless acted on by a?", options: ["Force", "Colour", "Sound", "Shadow"], correct: 0 },
      { q: "Which law explains why a seatbelt is needed in a moving car?", options: ["First law", "Second law", "Third law", "None"], correct: 0 },
    ]},
    { name: "Test 3", topic: "Speed and Velocity", questions: [
      { q: "Speed is calculated as distance divided by?", options: ["Mass", "Time", "Force", "Volume"], correct: 1 },
      { q: "What additional information does velocity include that speed does not?", options: ["Time", "Mass", "Direction", "Distance"], correct: 2 },
      { q: "What is the SI unit for speed?", options: ["kg", "m/s", "N", "J"], correct: 1 },
      { q: "If a car travels 100m in 20s, what is its speed?", options: ["2 m/s", "5 m/s", "10 m/s", "20 m/s"], correct: 1 },
      { q: "An object moving at constant velocity has?", options: ["Changing speed only", "Changing direction only", "Constant speed and direction", "No motion"], correct: 2 },
    ]},
  ],
  hist: [
    { name: "Test 1", topic: "Tanzania's independence", questions: [
      { q: "Who was the first President of Tanzania?", options: ["Julius Nyerere", "Abeid Karume", "Ali Hassan Mwinyi", "Benjamin Mkapa"], correct: 0 },
      { q: "Tanzania was formed by the union of Tanganyika and which other territory?", options: ["Kenya", "Uganda", "Zanzibar", "Malawi"], correct: 2 },
      { q: "In what year did the union that formed Tanzania take place?", options: ["1961", "1963", "1964", "1967"], correct: 2 },
      { q: "Nyerere's philosophy of self-reliance is known as?", options: ["Harambee", "Ujamaa", "Negritude", "Pan-Africanism"], correct: 1 },
      { q: "In what year did Tanganyika gain independence?", options: ["1959", "1960", "1961", "1963"], correct: 2 },
    ]},
    { name: "Test 2", topic: "The Union of Tanzania", questions: [
      { q: "What two territories united to form Tanzania?", options: ["Kenya and Uganda", "Tanganyika and Zanzibar", "Tanganyika and Kenya", "Zanzibar and Uganda"], correct: 1 },
      { q: "In what year was the Union formed?", options: ["1961", "1963", "1964", "1967"], correct: 2 },
      { q: "Who was Zanzibar's leader at the time of the Union?", options: ["Julius Nyerere", "Abeid Karume", "Ali Hassan Mwinyi", "Edward Moringe"], correct: 1 },
      { q: "What is the name of the united country formed in 1964?", options: ["Tanganyika", "United Republic of Tanzania", "East African Federation", "Zanzibar Republic"], correct: 1 },
      { q: "Which part of Tanzania kept its own government for internal matters after the Union?", options: ["Dodoma", "Zanzibar", "Arusha", "Mwanza"], correct: 1 },
    ]},
    { name: "Test 3", topic: "Ujamaa and Nyerere", questions: [
      { q: "What does \u201cUjamaa\u201d mean?", options: ["Freedom", "Familyhood", "Independence", "Unity"], correct: 1 },
      { q: "Ujamaa policy focused on which kind of community living?", options: ["Individual farms", "Cooperative villages", "Foreign-owned estates", "City-only development"], correct: 1 },
      { q: "Who introduced the Ujamaa policy?", options: ["Abeid Karume", "Julius Nyerere", "Ali Hassan Mwinyi", "Edward Sokoine"], correct: 1 },
      { q: "Ujamaa is often described as a form of African?", options: ["Capitalism", "Socialism", "Monarchy", "Colonialism"], correct: 1 },
      { q: "What declaration is closely linked to Ujamaa?", options: ["Arusha Declaration", "Zanzibar Declaration", "Dodoma Charter", "Dar Accord"], correct: 0 },
    ]},
  ],
  civ: [
    { name: "Test 1", topic: "Government and citizenship", questions: [
      { q: "What form of government does Tanzania have?", options: ["Monarchy", "Republic", "Dictatorship", "Colony"], correct: 1 },
      { q: "How many main arms of government are there?", options: ["Two", "Three", "Four", "Five"], correct: 1 },
      { q: "The right of citizens to vote is called?", options: ["Suffrage", "Sovereignty", "Suffrage rights", "Citizenship"], correct: 0 },
      { q: "The document that sets out citizens' rights and duties is the?", options: ["Constitution", "Bylaw", "Treaty", "Manifesto"], correct: 0 },
      { q: "At the local level, a village is usually led by a?", options: ["Regional Commissioner", "Village Chairperson", "Member of Parliament", "District Judge"], correct: 1 },
    ]},
    { name: "Test 2", topic: "Arms of Government", questions: [
      { q: "Which arm of government makes laws?", options: ["Executive", "Legislature", "Judiciary", "Police"], correct: 1 },
      { q: "Which arm of government interprets laws and settles disputes?", options: ["Executive", "Legislature", "Judiciary", "Parliament"], correct: 2 },
      { q: "Which arm of government implements and enforces laws?", options: ["Executive", "Legislature", "Judiciary", "Citizens"], correct: 0 },
      { q: "Why are government powers separated into three arms?", options: ["To confuse citizens", "To prevent abuse of power", "To reduce taxes", "To increase elections"], correct: 1 },
      { q: "In Tanzania, who heads the Executive?", options: ["Chief Justice", "Speaker of Parliament", "The President", "Regional Commissioner"], correct: 2 },
    ]},
    { name: "Test 3", topic: "Citizens' Rights and Duties", questions: [
      { q: "Which of these is a citizen's right?", options: ["Paying taxes", "Freedom of speech", "Obeying laws", "Serving on jury only"], correct: 1 },
      { q: "Which of these is a citizen's duty?", options: ["Freedom of worship", "Right to vote", "Obeying the law", "Freedom of movement"], correct: 2 },
      { q: "The right to choose leaders through elections is called?", options: ["Suffrage", "Sovereignty", "Diplomacy", "Federation"], correct: 0 },
      { q: "What document outlines citizens' rights and duties?", options: ["A newspaper", "The Constitution", "A textbook", "A manifesto"], correct: 1 },
      { q: "Why do rights and duties need to work together?", options: ["They don't need to", "To keep society fair and functioning", "To reduce voting", "To limit freedom"], correct: 1 },
    ]},
  ],
  rel: [
    { name: "Test 1", topic: "Values and moral education", questions: [
      { q: "Being truthful and not deceiving others is called?", options: ["Honesty", "Jealousy", "Pride", "Laziness"], correct: 0 },
      { q: "Giving help to those in need is an example of?", options: ["Selfishness", "Charity", "Rivalry", "Indifference"], correct: 1 },
      { q: "Treating elders with respect is considered a?", options: ["Legal requirement only", "Moral value", "Punishment", "Business rule"], correct: 1 },
      { q: "Following the laws and rules of your community reflects?", options: ["Weakness", "Responsibility", "Rebellion", "Confusion"], correct: 1 },
      { q: "Working peacefully alongside people of different faiths reflects?", options: ["Tolerance", "Conflict", "Isolation", "Competition"], correct: 0 },
    ]},
    { name: "Test 2", topic: "Compassion and Charity", questions: [
      { q: "What does compassion mean?", options: ["Ignoring others' pain", "Caring about others' wellbeing", "Seeking wealth", "Avoiding responsibility"], correct: 1 },
      { q: "Charity is best described as?", options: ["Keeping wealth to yourself", "Helping those in need", "Competing with others", "Avoiding community"], correct: 1 },
      { q: "Which action best shows charity?", options: ["Donating food to the needy", "Boasting about wealth", "Ignoring a beggar", "Refusing to share"], correct: 0 },
      { q: "Why do many moral and religious teachings value charity?", options: ["It has no value", "It helps build a caring community", "It's required by law only", "It's optional and unimportant"], correct: 1 },
      { q: "Compassion is most closely linked to?", options: ["Empathy for others", "Personal ambition", "Material wealth", "Isolation"], correct: 0 },
    ]},
    { name: "Test 3", topic: "Respect and Tolerance", questions: [
      { q: "What does tolerance mean?", options: ["Rejecting different beliefs", "Accepting people who are different from you", "Avoiding all disagreement", "Forcing others to agree"], correct: 1 },
      { q: "Respect for others is shown by?", options: ["Valuing their dignity regardless of differences", "Mocking their beliefs", "Ignoring their opinions", "Excluding them"], correct: 0 },
      { q: "Living peacefully with people of different faiths requires?", options: ["Conflict", "Tolerance", "Isolation", "Competition"], correct: 1 },
      { q: "Why is respect important in a community?", options: ["It divides people", "It helps people live together peacefully", "It has no real effect", "It only matters at school"], correct: 1 },
      { q: "Which behaviour shows disrespect?", options: ["Listening to others", "Mocking someone's beliefs", "Greeting politely", "Helping a neighbour"], correct: 1 },
    ]},
  ],
  acc: [
    { name: "Test 1", topic: "Accounting Basics", questions: [
      { q: "What does the accounting equation state?", options: ["Assets = Liabilities + Equity", "Assets = Liabilities \u2212 Equity", "Assets + Liabilities = Equity", "Equity = Assets + Liabilities"], correct: 0 },
      { q: "Which of these is an asset?", options: ["Bank loan", "Cash in hand", "Creditors", "Capital"], correct: 1 },
      { q: "In double-entry bookkeeping, every transaction affects at least how many accounts?", options: ["One", "Two", "Three", "Four"], correct: 1 },
      { q: "What is \u201cequity\u201d in accounting?", options: ["Money owed to suppliers", "The owner's claim on the business", "A type of expense", "A bank loan"], correct: 1 },
      { q: "Which of these is a liability?", options: ["Cash", "Equipment", "Accounts payable (creditors)", "Inventory"], correct: 2 },
    ]},
    { name: "Test 2", topic: "Journals and Ledgers", questions: [
      { q: "Which book records credit sales?", options: ["Purchases Journal", "Sales Journal", "Cash Book", "General Journal"], correct: 1 },
      { q: "Which book records cash and bank transactions?", options: ["Sales Journal", "Purchases Journal", "Cash Book", "General Journal"], correct: 2 },
      { q: "Adjustments that don't fit other journals are recorded in the?", options: ["Sales Journal", "Cash Book", "General Journal", "Purchases Journal"], correct: 2 },
      { q: "Books of original entry are also known as?", options: ["Ledgers", "Journals", "Trial balances", "Financial statements"], correct: 1 },
      { q: "What happens after a transaction is recorded in a journal?", options: ["It's deleted", "It's posted to the ledger", "It's ignored", "It's sent to the bank"], correct: 1 },
    ]},
    { name: "Test 3", topic: "Trial Balance & Financial Statements", questions: [
      { q: "What does a trial balance check?", options: ["That profit is high", "That total debits equal total credits", "That the business is registered", "That taxes are paid"], correct: 1 },
      { q: "The Income Statement shows?", options: ["Assets and liabilities only", "Revenue minus expenses (profit or loss)", "Bank balance only", "Owner's personal spending"], correct: 1 },
      { q: "The Balance Sheet shows a business's position at?", options: ["The end of a financial year only", "A single point in time", "The start of the year only", "No specific time"], correct: 1 },
      { q: "If total debits do not equal total credits in a trial balance, this usually indicates?", options: ["Strong profit", "An error somewhere in the books", "High revenue", "Nothing significant"], correct: 1 },
      { q: "Which of these appears on a Balance Sheet?", options: ["Revenue", "Expenses", "Assets", "Cost of goods sold"], correct: 2 },
    ]},
  ],
};


/**
 * The seed content predates the server, so it carries no ids. They are derived
 * the same way the API derives them, which keeps the fallback addressable.
 */
export const SEED_QUIZZES: Record<string, QuizTest[]> = Object.fromEntries(
  Object.entries(SEED_QUIZ_CONTENT).map(([subjectId, tests]) => [
    subjectId,
    tests.map((test, index) => ({
      ...test,
      id: `${subjectId}-${index + 1}`,
      subjectId,
      index,
    })),
  ]),
);

export let QUIZZES: Record<string, QuizTest[]> = SEED_QUIZZES;

/** Called by the content store once the catalogue has been fetched. */
export function setQuizzes(quizzes: Record<string, QuizTest[]>): void {
  QUIZZES = quizzes;
}

export function testsForSubject(subjectId: string): QuizTest[] {
  return QUIZZES[subjectId] ?? [];
}
