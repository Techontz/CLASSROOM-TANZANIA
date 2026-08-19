import type { TermsSection } from "@/types";

/**
 * Extracted verbatim from the original index.html (TERMS_SECTIONS).
 */
export const SEED_TERMS_SECTIONS: TermsSection[] = [{
  title: "1. Acceptance of These Terms",
  body: "Welcome to Classroom Tanzania (\u201cthe App\u201d, \u201cwe\u201d, \u201cus\u201d). By creating an account or using the App, you agree to these Terms & Conditions and the Privacy Notice below. If you do not agree, please do not create an account or use the App."
}, {
  title: "2. Who Can Use This App \u2014 Minors and Parental Consent",
  body: "Classroom Tanzania is designed for students from Standard 1 through Form 6, which means many of our users are minors under Tanzanian law. If you are under 18 years old, a parent or guardian should review these Terms with you and give permission before you create an account. By creating an account for a child, a parent or guardian confirms they have read and accepted these Terms on the child's behalf."
}, {
  title: "3. The Service We Provide",
  body: "Classroom Tanzania provides educational content \u2014 topic notes, practice tests, and past examination papers \u2014 based on the Tanzania Mainland (NECTA) and Zanzibar (ZEC) syllabuses. Classroom Tanzania is an independent educational tool and is not officially affiliated with, endorsed by, or produced by NECTA, ZEC, the Ministry of Education, Science and Technology, or the Zanzibar Ministry of Education and Vocational Training. Content is provided for study and revision purposes and should not be treated as an official or guaranteed predictor of examination content or results."
}, {
  title: "4. Creating an Account",
  body: "To use certain features, you may need to create an account by providing information such as your name, education level, and a password. You agree to provide accurate information and to keep your password confidential. You are responsible for activity that happens under your account."
}, {
  title: "5. Information We Collect",
  body: "Account information you provide directly \u2014 your name, education level/form, region, and password. Activity data \u2014 your quiz and past paper scores, and which topics you've read, so we can show you your own progress. Technical data \u2014 basic device and usage information needed to keep the App working properly and securely. We do not knowingly collect more personal information than is necessary to provide the App's educational features."
}, {
  title: "6. How We Use Your Information",
  body: "We use your information to operate your account and let you log in, save and show you your own quiz scores and reading progress, respond to support requests you send us, improve the App's content and features, and meet our legal obligations, including under Tanzania's Personal Data Protection Act, 2022. We do not sell your personal information to third parties, and we do not use children's data for targeted advertising."
}, {
  title: "7. How We Store and Protect Your Information",
  body: "Your information is stored using industry-standard security practices, including encrypted connections and access controls limiting who can view your data. No method of storing or transmitting data is 100% secure, and we cannot guarantee absolute security \u2014 but we take reasonable steps to protect your information from unauthorized access, loss, or misuse."
}, {
  title: "8. Sharing Your Information",
  body: "We do not share your personal information with third parties except: with service providers who help us run the App (such as our hosting and database provider) and are bound to protect your data; if required by Tanzanian law or a valid legal request; or with your consent."
}, {
  title: "9. Your Rights",
  body: "Under Tanzania's Personal Data Protection Act, 2022, you (or, for a minor, your parent/guardian) have the right to request a copy of the personal information we hold about you, ask us to correct inaccurate information, ask us to delete your account and associated data, and withdraw consent for optional data uses at any time. To exercise these rights, contact us using the details in Section 17."
}, {
  title: "10. Children's Privacy",
  body: "We take extra care with data belonging to younger students. We collect the minimum information needed to provide the App's core learning features, we do not display third-party advertising to any user, and we do not use any student's data to build advertising profiles. If we learn that a child has provided personal information without appropriate parental or guardian involvement, we will take reasonable steps to delete that information."
}, {
  title: "11. Acceptable Use",
  body: "When using Classroom Tanzania, you agree not to: share your account in a way that misrepresents who actually completed a test; attempt to disrupt, hack, or reverse-engineer the App; submit abusive, false, or harmful content through any feedback or support channel; or use the App for any unlawful purpose."
}, {
  title: "12. Educational Content Disclaimer",
  body: "While we aim for accuracy, topic notes, quiz questions, and model answers in the App are prepared for study purposes and may contain errors or omissions. They should not replace instruction from a qualified teacher or officially published syllabus materials. Past examination papers are reproduced from publicly released official assessments for study purposes."
}, {
  title: "13. Intellectual Property",
  body: "The App's design, original content, and branding (including the Classroom Tanzania name and logo) belong to Classroom Tanzania. You may use the App's content for your own personal study. You may not copy, redistribute, or sell the App's content without permission."
}, {
  title: "14. Ending Your Account",
  body: "You may stop using the App and request deletion of your account at any time. We may suspend or terminate accounts that violate these Terms, including accounts used for cheating, abuse, or unlawful activity."
}, {
  title: "15. Changes to These Terms",
  body: "We may update these Terms as the App grows. If we make significant changes, we will let you know within the App before they take effect. Continuing to use the App after changes take effect means you accept the updated Terms."
}, {
  title: "16. Governing Law",
  body: "These Terms are governed by the laws of the United Republic of Tanzania, including the Personal Data Protection Act, 2022, and, where applicable, the laws of Zanzibar."
}, {
  title: "17. Contact Us",
  body: "Questions about these Terms, your data, or a rights request under Section 9 can be sent to support@classroomtanzania.com or +255 759 5861256."
}];

export let TERMS_SECTIONS: TermsSection[] = SEED_TERMS_SECTIONS;

/** Called by the content store once the catalogue has been fetched. */
export function setTermsSections(sections: TermsSection[]): void {
  TERMS_SECTIONS = sections;
}
