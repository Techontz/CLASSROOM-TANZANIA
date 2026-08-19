import type { Topic } from "@/types";

/**
 * Extracted verbatim from the original index.html (TOPICS).
 * Offline fallback only — see the note in src/data/subjects.ts.
 */
export const SEED_TOPICS: Record<string, Topic[]> = {
  math: [
    { id: "m1", title: "Introduction to Algebra", summary: "What variables and expressions are, and why we use letters in maths.", content: "Algebra uses letters (like x or y) to stand in for numbers we don't know yet. An expression such as 2x + 3 means \"take a number, double it, then add 3\". Algebra lets us describe patterns and relationships with a general rule instead of one specific number." },
    { id: "m2", title: "Linear Equations", summary: "How to solve simple equations like 2x + 3 = 11 step by step.", content: "A linear equation has an unknown raised only to the power of 1 (no x\u00b2). To solve one, do the same operation to both sides until x is alone. Example: 2x + 3 = 11 \u2192 subtract 3 from both sides \u2192 2x = 8 \u2192 divide both sides by 2 \u2192 x = 4." },
    { id: "m3", title: "Factorisation", summary: "How to break an expression into simpler multiplied parts.", content: "Factorising is the reverse of expanding brackets. For example, x\u00b2 \u2212 9 can be written as (x \u2212 3)(x + 3), since it's a \"difference of two squares\". Factorising helps simplify expressions and solve equations." },
  ],
  eng: [
    { id: "e1", title: "Parts of Speech", summary: "Nouns, verbs, adjectives and the other building blocks of a sentence.", content: "Every English sentence is built from parts of speech: nouns (people, places, things), verbs (actions or states), adjectives (describe nouns), and adverbs (describe verbs). Knowing these helps you build correct, clear sentences." },
    { id: "e2", title: "Tenses", summary: "How verbs change to show when something happens.", content: "Tenses show time: present (\"she goes\"), past (\"she went\"), and future (\"she will go\"). Each also has continuous and perfect forms, e.g. \"she is going\", \"she has gone\", to show ongoing or completed action." },
    { id: "e3", title: "Sentence Structure", summary: "How subjects, verbs, and objects fit together correctly.", content: "A complete sentence needs at least a subject and a verb, e.g. \"Amina reads.\" Many sentences also have an object: \"Amina reads a book.\" Word order matters in English \u2014 mixing it up (\"Book Amina reads a\") makes the sentence incorrect." },
  ],
  kisw: [
    { id: "k1", title: "Aina za Maneno", summary: "Nomino, vitenzi, vivumishi na aina nyingine za maneno.", content: "Maneno ya Kiswahili yamegawanyika katika aina kama nomino (majina ya vitu), vitenzi (vitendo), vivumishi (vinavyoeleza nomino), na vielezi (vinavyoeleza vitenzi). Kujua aina za maneno kunasaidia kutunga sentensi sahihi." },
    { id: "k2", title: "Nyakati", summary: "Jinsi vitenzi vinavyobadilika kuonyesha wakati.", content: "Nyakati huonyesha wakati wa tukio: wakati uliopo (\"anasoma\"), uliopita (\"alisoma\"), na ujao (\"atasoma\"). Kutambua nyakati husaidia kueleza matukio kwa usahihi." },
    { id: "k3", title: "Muundo wa Sentensi", summary: "Jinsi kiima na kiarifu vinavyounda sentensi kamili.", content: "Sentensi kamili ya Kiswahili huwa na kiima (mtenda) na kiarifu (kinachosemwa kuhusu kiima), mfano \"Mtoto anacheza.\" Mpangilio sahihi wa maneno ni muhimu ili sentensi ieleweke vizuri." },
  ],
  bio: [
    { id: "b1", title: "Cell Structure", summary: "The basic parts every cell has and what they do.", content: "A cell is the basic unit of life. Most cells have a cell membrane (controls what enters/exits), cytoplasm (jelly-like fluid where reactions happen), and a nucleus (controls the cell and holds genetic material)." },
    { id: "b2", title: "Plant vs Animal Cells", summary: "The key differences between the two cell types.", content: "Plant cells have a rigid cell wall, chloroplasts (for photosynthesis), and a large central vacuole, which animal cells don't have. Animal cells are usually more flexible in shape and rely on food rather than sunlight for energy." },
    { id: "b3", title: "Cell Organelles", summary: "Mitochondria, ribosomes, and other tiny structures inside a cell.", content: "Organelles are specialised structures inside a cell: mitochondria release energy from food (\"the powerhouse of the cell\"), ribosomes build proteins, and the nucleus stores genetic instructions." },
  ],
  chem: [
    { id: "c1", title: "Atomic Structure", summary: "Protons, neutrons, and electrons \u2014 the building blocks of atoms.", content: "An atom has a nucleus containing protons (positive charge) and neutrons (no charge), surrounded by electrons (negative charge) in shells. The number of protons determines which element it is." },
    { id: "c2", title: "The Periodic Table", summary: "How elements are organised by their properties.", content: "The periodic table arranges elements by atomic number and groups elements with similar properties in the same column. Elements in the same group often react in similar ways because they have the same number of electrons in their outer shell." },
    { id: "c3", title: "States of Matter", summary: "Solid, liquid, and gas, and what makes them different.", content: "Matter exists as solid (fixed shape and volume), liquid (fixed volume, takes the shape of its container), or gas (no fixed shape or volume). Heating or cooling a substance can change it from one state to another." },
  ],
  phy: [
    { id: "p1", title: "Newton's Laws", summary: "The three basic laws that describe how objects move.", content: "Newton's First Law: an object stays at rest or in motion unless a force acts on it. Second Law: force equals mass times acceleration (F = ma). Third Law: every action has an equal and opposite reaction." },
    { id: "p2", title: "Speed and Velocity", summary: "How we measure how fast something moves.", content: "Speed is distance travelled divided by time taken. Velocity is similar but also includes direction. Both are usually measured in metres per second (m/s)." },
    { id: "p3", title: "Friction", summary: "The force that resists motion between two surfaces.", content: "Friction opposes motion when two surfaces rub against each other. Rougher surfaces create more friction. Friction can be useful (like walking without slipping) or unwanted (like in machine parts that wear out)." },
  ],
  hist: [
    { id: "h1", title: "Path to Independence", summary: "How Tanganyika moved toward self-rule and independence.", content: "Tanganyika was under British colonial rule before gaining independence in 1961, led largely through peaceful political organising, including the work of Julius Nyerere and the TANU party." },
    { id: "h2", title: "The Union of Tanzania", summary: "How Tanganyika and Zanzibar came together to form Tanzania.", content: "In 1964, Tanganyika and Zanzibar united to form the United Republic of Tanzania. This union combined two separate nations, each with its own history, into one country while Zanzibar retained its own government for internal matters." },
    { id: "h3", title: "Ujamaa and Nyerere", summary: "Julius Nyerere's philosophy of African socialism and self-reliance.", content: "Ujamaa, meaning \"familyhood\", was Julius Nyerere's policy of African socialism, emphasising cooperative living, self-reliance, and shared community resources, especially in rural villages." },
  ],
  civ: [
    { id: "cv1", title: "Arms of Government", summary: "The Executive, Legislature, and Judiciary, and their roles.", content: "Government is usually divided into three arms: the Executive (implements laws), the Legislature (makes laws), and the Judiciary (interprets laws and settles disputes). This separation helps prevent any one part from having too much power." },
    { id: "cv2", title: "Citizens' Rights and Duties", summary: "What citizens are entitled to, and what's expected of them.", content: "Citizens have rights such as freedom of speech and the right to vote, along with duties like obeying the law, paying taxes, and respecting others' rights. Rights and duties work together to keep society functioning fairly." },
    { id: "cv3", title: "Local Government", summary: "How villages, wards, and districts are organised and led.", content: "Local government brings decision-making closer to communities, through structures like village councils, ward offices, and district councils, each with elected or appointed leaders responsible for local services." },
  ],
  rel: [
    { id: "r1", title: "Honesty and Integrity", summary: "Why truthfulness matters in everyday life.", content: "Honesty means telling the truth and not deceiving others, while integrity means acting according to your values even when no one is watching. Both are valued across religious and moral traditions as a foundation of trust." },
    { id: "r2", title: "Compassion and Charity", summary: "The importance of caring for and helping others.", content: "Compassion means caring about others' wellbeing, and charity means acting on that care by helping those in need. Many religious and moral teachings emphasise generosity toward the less fortunate." },
    { id: "r3", title: "Respect and Tolerance", summary: "Living peacefully alongside people who are different from you.", content: "Respect means valuing others regardless of differences, and tolerance means accepting that people may hold different beliefs or come from different backgrounds. Practising both helps communities live together peacefully." },
  ],
  acc: [
    { id: "a1", title: "The Accounting Equation", summary: "The foundation of double-entry bookkeeping: Assets = Liabilities + Equity.", content: "Every business transaction affects the accounting equation: Assets = Liabilities + Owner's Equity. Assets are what the business owns (cash, inventory, equipment); liabilities are what it owes (loans, creditors); equity is the owner's claim on the business. This equation must always balance \u2014 it's the basis of double-entry bookkeeping, where every transaction is recorded as at least one debit and one equal credit." },
    { id: "a2", title: "Books of Original Entry", summary: "Where transactions are first recorded before posting to the ledger.", content: "Books of original entry (also called journals) record transactions as they happen, before they're transferred (posted) to the ledger. Common ones include the Sales Journal (credit sales), Purchases Journal (credit purchases), Cash Book (cash and bank transactions), and the General Journal (adjustments and transactions that don't fit elsewhere). Recording accurately here is essential, since every later report depends on it." },
    { id: "a3", title: "Trial Balance and Financial Statements", summary: "Checking your books balance, then summarising the results.", content: "A trial balance lists all ledger account balances in two columns (debit and credit) to check that total debits equal total credits \u2014 a basic check for arithmetic errors. From an accurate trial balance, accountants prepare the Income Statement (revenue minus expenses, showing profit or loss) and the Balance Sheet (assets, liabilities, and equity at a point in time), the two core financial statements." },
  ],
};


export let TOPICS: Record<string, Topic[]> = SEED_TOPICS;

/** Called by the content store once the catalogue has been fetched. */
export function setTopics(topics: Record<string, Topic[]>): void {
  TOPICS = topics;
}

export function topicsForSubject(subjectId: string): Topic[] {
  return TOPICS[subjectId] ?? [];
}

export function findTopic(subjectId: string, topicId: string): Topic | undefined {
  return topicsForSubject(subjectId).find((t) => t.id === topicId);
}
