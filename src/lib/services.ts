// Service pages. Content supplied by Benifacts; each service renders through routes/services.$slug.tsx.
type Pair = [string, string];

export type ServiceBlock = {
  title: string;
  intro: string;
  why: Pair[];
  approach: Pair[];
  servicesTitle: string;
  services: Pair[];
};

export type Service = {
  slug: string;
  /** Short name used in menus. */
  name: string;
  label: string;
  title: string;
  tagline: string;
  overviewTitle: string;
  overview: Pair[];
  blocks: ServiceBlock[];
  faqs: Pair[];
};

export const services: Service[] = [
  {
    slug: "cross-border-advisory",
    name: "Cross-border tax advisory",
    label: "Core service",
    title: "Cross-Border Tax Advisory & Planning",
    tagline: "Navigating US tax obligations across borders is complex. Benifacts simplifies it with dedicated advisory, full compliance management, and strategic planning for individuals, startups, and businesses operating between the US and beyond.",
    overviewTitle: "Services included",
    overview: [
      ["Tax Treaty Analysis", "Optimize treaty positions to reduce double taxation."],
      ["FBAR & FATCA Reporting", "Foreign account and asset disclosure filed accurately."],
      ["Inbound & Outbound Structuring", "Entity design for US market entry or overseas expansion."],
      ["Transfer Pricing Advisory", "Defensible intercompany pricing for related-party transactions."],
      ["Expat Tax Planning", "Tailored solutions for Americans living and working abroad."],
    ],
    blocks: [
      {
        title: "Cross-Border Tax Advisory & Planning",
        intro: "Operating across borders creates real complexity—dual tax obligations, treaty exposure, foreign reporting requirements, and entity structuring decisions that have lasting consequences. Benifacts is built for this: our primary advisory focus is cross-border tax planning, delivered by specialists who understand both the US tax code and the practical realities of international business. Whether you are a foreign national entering the US market, an American with overseas income, or a startup structuring for global expansion, our dedicated Primary Account Managers guide you through every decision with clarity and precision.",
        why: [
          ["Cross-Border Expertise", "Deep specialization in US international tax—FBAR, FATCA, treaty positions, and inbound/outbound structures."],
          ["Dedicated Advisory Delivery", "Your Primary Account Manager owns the relationship and drives the strategy, not a rotating team."],
          ["Proactive Planning", "We identify exposures and opportunities before they become problems or missed savings."],
          ["Full Compliance Coverage", "All US federal and state information returns handled accurately and on schedule."],
          ["Entity Structuring Guidance", "Practical advice on LLC, C-Corp, and branch structures for cross-border operations."],
        ],
        approach: [
          ["Discovery Consultation", "Understand your cross-border footprint, existing structures, and tax goals."],
          ["Exposure Analysis", "Identify US and foreign tax obligations, treaty positions, and reporting requirements."],
          ["Strategy Development", "Design a tax-efficient structure aligned with your growth objectives."],
          ["Ongoing Advisory", "Continuous support as your business evolves—not just at year-end."],
          ["Annual Compliance", "Full preparation and filing of all required US returns and disclosures."],
        ],
        servicesTitle: "",
        services: [],
      },
    ],
    faqs: [],
  },
  {
    slug: "us-tax-compliance",
    name: "US tax compliance",
    label: "Compliance service",
    title: "US Tax Compliance & Planning",
    tagline: "End-to-end management of federal and state income tax filings, including Forms 1040, 1120, 1065, and all international information returns—filed accurately and on time.",
    overviewTitle: "Services included",
    overview: [
      ["Federal Income Tax Returns", "Form 1040, 1120, 1120-S, 1065, 990, 1120-F and all entity types."],
      ["State Tax Filings", "Multi-state returns and state nexus analysis for accurate filings."],
      ["International Information Returns", "Forms 5471, 5472, 8865, 8938, and more."],
      ["IRS Audit Representation", "Expert support through IRS inquiries and audits."],
      ["Tax Deadline Management", "Proactive extensions and deadline tracking."],
    ],
    blocks: [
      {
        title: "US Tax Compliance & Planning",
        intro: "Staying compliant with US federal and state tax requirements is non-negotiable, especially for businesses with cross-border elements. We manage your full compliance calendar, ensuring every return is filed accurately, every disclosure submitted on time, and every deadline met without last-minute stress. For businesses with non-US shareholders, foreign subsidiaries, or international operations, the compliance requirements are layered and unforgiving. Benifacts handles this complexity so you can focus on growth.",
        why: [
          ["IRS-Current Knowledge", "Our team stays ahead of regulatory changes, so you never face surprise penalties."],
          ["All Entity Types", "Individuals, LLCs, S-Corps, C-Corps, and partnerships are fully covered."],
          ["International Returns Expertise", "Forms 5471, 5472, PFIC, GILTI, and BEAT handled in-house."],
          ["Audit-Ready Records", "Clean, documented positions on every filing."],
          ["Penalty Abatement Support", "We help clients resolve prior non-compliance through streamlined procedures."],
        ],
        approach: [
          ["Compliance Assessment", "Map all filing obligations for your business and personal tax profile."],
          ["Document Gathering", "Streamlined process to collect required records and foreign financial data."],
          ["Preparation & Review", "Returns prepared by specialists and reviewed for accuracy."],
          ["Filing & Confirmation", "Electronic filing with confirmation and copies maintained for your records."],
        ],
        servicesTitle: "",
        services: [],
      },
    ],
    faqs: [],
  },
  {
    slug: "sales-tax",
    name: "US sales tax",
    label: "Sales tax service",
    title: "US Sales Tax Planning & Compliance",
    tagline: "Navigate multi-state sales tax obligations, economic nexus thresholds, and voluntary disclosure opportunities—keeping your business compliant without over-paying.",
    overviewTitle: "Services included",
    overview: [
      ["State Nexus Analysis", "Identify state-by-state collection obligations."],
      ["Voluntary Disclosure", "Resolve prior exposure and reduce penalties."],
      ["State Registration", "Register in all required jurisdictions."],
      ["Return Filing", "Ongoing multi-state filing and remittance."],
    ],
    blocks: [
      {
        title: "US Sales Tax Planning & Compliance",
        intro: "Since the South Dakota v. Wayfair ruling, economic nexus has changed everything for businesses selling into the US. Whether you are a foreign e-commerce brand, a SaaS company, or a product business shipping to US customers, your sales tax exposure may be larger than you realize—and the penalties for non-compliance are significant. Benifacts provides clear, practical guidance on where you have nexus, what you owe, and how to structure your operations to minimize exposure going forward.",
        why: [
          ["State Nexus Expertise", "Determine physical and economic nexus across all 50 states with confidence."],
          ["Voluntary Disclosure", "Proactively resolve prior exposure through VDA programs to limit back-tax liability."],
          ["Registration Management", "We handle state registrations so you can start collecting properly."],
          ["Ongoing Filing", "Monthly, quarterly, or annual returns managed on your behalf."],
          ["Technology Integration", "Advice on sales tax automation tools compatible with your e-commerce or ERP platform."],
        ],
        approach: [
          ["State Nexus Review", "Assess current sales activity against each state's economic and physical thresholds."],
          ["Exposure Quantification", "Estimate prior and ongoing liability."],
          ["Voluntary Disclosure & Registration", "File where required, often with penalty reduction."],
          ["Ongoing Compliance Management", "File returns and remit tax on your schedule."],
        ],
        servicesTitle: "",
        services: [],
      },
    ],
    faqs: [],
  },
  {
    slug: "small-business",
    name: "Small business complete package",
    label: "Full-package service",
    title: "Small Business Complete-Package Services",
    tagline: "Everything under one roof—accounting, payroll, compliance, and advisory—with your Primary Account Manager coordinating every workstream on your behalf.",
    overviewTitle: "Package includes",
    overview: [
      ["Accounting & Bookkeeping", "Accurate monthly records via our outsourced delivery team."],
      ["Payroll Management", "Federal and state withholdings, W-2s, and 1099s."],
      ["Tax Preparation & Filing", "Complete federal and state returns for your entity."],
      ["Entity Setup & Compliance", "Formation, registered agent, and annual state filings."],
      ["Cross-Border Advisory", "Strategic guidance integrated with your day-to-day operations."],
    ],
    blocks: [
      {
        title: "Small Business Complete-Package Services",
        intro: "Growing a small business is demanding enough without managing multiple service providers for accounting, payroll, compliance, and advisory. Benifacts' complete-package offering delivers everything under one roof, with your Primary Account Manager coordinating every workstream on your behalf. Operational delivery—bookkeeping, payroll, routine compliance—is handled through our trusted outsourced delivery partners, ensuring quality at scale without inflated overheads. Your Primary Account Manager (PAM) remains your single point of contact for advisory, strategy, and escalation.",
        why: [
          ["One Relationship, Full Coverage", "Your Primary Account Manager coordinates every service—accounting, payroll, tax, and advisory."],
          ["Cost-Effective Delivery", "Outsourced commodity work keeps fees competitive without compromising quality."],
          ["Cross-Border Ready", "Advisory and compliance built for businesses with international dimensions from day one."],
          ["Scalable as You Grow", "Service levels adapt as your business expands domestically or internationally."],
          ["Paperless Operations", "Fully digital workflows—documents, approvals, and reporting delivered electronically."],
        ],
        approach: [
          ["Onboarding & Setup", "Assess your current operations and establish clean financial systems."],
          ["Ongoing Management", "Monthly bookkeeping, payroll runs, and compliance filings handled without reminders."],
          ["Quarterly Advisory Check-Ins", "Strategy sessions to review performance, tax position, and planning opportunities."],
          ["Year-End Compliance", "Full tax preparation and filing across all required jurisdictions."],
        ],
        servicesTitle: "",
        services: [],
      },
    ],
    faqs: [],
  },
  {
    slug: "individuals",
    name: "Services for individuals",
    label: "Services for individuals",
    title: "Effortless Tax Solutions for U.S. Individuals",
    tagline: "Your trusted tax advisors: personalized solutions for stress-free tax management.",
    overviewTitle: "What we offer",
    overview: [
      ["Personal Tax Planning", "Optimize your tax strategy to minimize liabilities and maximize savings."],
      ["Self-Assessment Support", "Simplify tax filing with our expert guidance for accurate and timely submissions."],
      ["Estate and Gift Tax Planning", "Protect your legacy with smart tax-saving strategies for wealth transfer."],
      ["IRS Audit Assistance", "Navigate audits confidently with our experienced team by your side."],
    ],
    blocks: [
      {
        title: "Personal Tax Planning",
        intro: "Personal tax planning made simple: tailor your tax strategy with expert advice that helps you save more and stay fully compliant with IRS regulations.",
        why: [
          ["Custom Tax Solutions", "Personalized strategies to fit your financial goals."],
          ["Proactive Support", "Year-round guidance to help you avoid surprises."],
          ["Expert Knowledge", "In-depth understanding of U.S. tax laws and credits."],
        ],
        approach: [
          ["Initial Assessment", "We evaluate your income, deductions, and savings goals."],
          ["Tax Optimization", "Identify opportunities for deductions and credits."],
          ["Accurate Filing", "Ensure precise tax filings to avoid penalties."],
          ["Continuous Monitoring", "Adjust strategies to align with changing tax laws."],
        ],
        servicesTitle: "Personal Tax Planning Services",
        services: [
          ["Tax Minimization Strategies", "Expert guidance to reduce your tax liability while staying compliant."],
          ["Income and Capital Gains Tax Planning", "Optimize your income and investment returns through effective tax strategies."],
          ["Estate and Gift Tax Planning", "Protect your wealth for the next generation with careful tax planning."],
          ["Year-Round Tax Guidance", "Comprehensive support for accurate and timely year-round filing."],
        ],
      },
      {
        title: "Self-Assessment Support",
        intro: "Filing taxes doesn't have to be stressful. Let us take the complexity out of your hands with our streamlined self-assessment service.",
        why: [
          ["Stress-Free Filing", "Simplified processes for accurate returns."],
          ["Timely Compliance", "Meet all IRS deadlines with ease."],
          ["Tailored Solutions", "Guidance customized for your financial situation."],
          ["Post-Filing Support", "Assistance with any IRS queries after submission."],
        ],
        approach: [
          ["Document Collection", "Gather income and deduction records."],
          ["Tax Calculations", "Ensure accuracy and identify savings."],
          ["Filing Support", "Submit returns accurately and on time."],
          ["Follow-Up Assistance", "Address any post-filing concerns with the IRS."],
        ],
        servicesTitle: "Self-Assessment Tax Support Services",
        services: [
          ["Income Review", "Analyze income from all sources (W-2s, 1099s, investments, etc.)."],
          ["Tax Calculation", "Accurately calculate your owed taxes or refunds, with clear breakdowns of tax credits and deductions."],
          ["Deductions Guidance", "Help you identify eligible tax deductions and credits to minimize liability."],
          ["IRS Filing", "Ensure your federal and state tax returns are filed on time and in compliance with regulations."],
          ["Post-Submission Support", "Assistance with IRS queries, amendments, or follow-ups after submission."],
        ],
      },
      {
        title: "Estate Tax Planning: Securing Your Legacy",
        intro: "Secure your financial legacy for future generations with tax-efficient estate planning.",
        why: [
          ["Specialized Expertise", "Deep understanding of federal and state estate tax laws."],
          ["Wealth Protection", "Safeguard your assets with strategic planning."],
          ["Family-Oriented Solutions", "Ensure tax-efficient wealth transfer to loved ones."],
        ],
        approach: [
          ["Estate Valuation", "Accurate assessment of assets and tax liabilities."],
          ["Gifting Strategies", "Tax-efficient plans for lifetime wealth transfer."],
          ["Trusts and Wills", "Secure and customized asset distribution."],
          ["Tax Compliance", "Regular updates to meet evolving tax laws."],
        ],
        servicesTitle: "Estate & Gift Tax Services",
        services: [
          ["Estate Valuation", "Accurately determine the value of your assets and tax liabilities."],
          ["Trust Creation and Management", "Establish trusts that allow for tax-efficient asset transfers to beneficiaries."],
          ["Lifetime Gifting Strategies", "Reduce your estate's taxable value through planned gifting."],
          ["Family Business Succession Planning", "Optimize ownership transitions for family-run businesses."],
          ["Tax-Efficient Will Drafting", "Ensure your will maximizes wealth distribution while minimizing taxes."],
        ],
      },
      {
        title: "IRS Audit Support",
        intro: "Facing an IRS audit can be overwhelming, but our experienced team is here to help you navigate the process smoothly.",
        why: [
          ["Audit Expertise", "Skilled in handling IRS inquiries and resolving discrepancies."],
          ["Comprehensive Support", "From documentation to representation, we've got you covered."],
          ["Post-Audit Strategies", "Implement practices to minimize the risk of future audits."],
        ],
        approach: [
          ["Assessment & Preparation", "Review financial records and identify issues."],
          ["IRS Communication", "Handle all correspondence with the IRS on your behalf."],
          ["Audit Resolution", "Resolve disputes and ensure compliance."],
          ["Future Audit Prevention", "Develop strategies to reduce risks moving forward."],
        ],
        servicesTitle: "IRS Audit Support Services",
        services: [
          ["Audit Preparation", "End-to-end assistance in gathering, organizing, and reviewing financial records for IRS audits."],
          ["IRS Representation", "We represent you in all communications and meetings with the IRS, acting as your advocate."],
          ["Tax Discrepancy Resolution", "Identification and correction of discrepancies to avoid penalties."],
          ["Penalty Mitigation", "Guidance on minimizing or eliminating penalties resulting from the audit."],
          ["Post-Audit Compliance", "Continuous support to ensure ongoing compliance and prevent future audits."],
        ],
      },
    ],
    faqs: [
      ["What is personal tax planning, and why do I need it?", "Personal tax planning helps you minimize tax liabilities while ensuring compliance with IRS regulations, saving you money."],
      ["Can you help with late or overdue tax filings?", "Yes, we assist in filing past-due tax returns and negotiating penalties."],
      ["What tax-saving strategies do you recommend for high earners?", "We explore deductions, investment credits, and retirement savings options tailored to your financial situation."],
      ["How can you help with estate tax planning?", "We offer strategies such as trust creation, gifting, and succession planning to reduce estate tax liabilities."],
      ["What triggers an IRS audit, and how can I avoid it?", "Common triggers include large deductions, discrepancies, and random selection. Our proactive planning minimizes audit risks."],
      ["Do you provide year-round tax support?", "Yes, we offer continuous guidance and tax planning to ensure you're prepared year-round."],
      ["How can you assist with self-assessment filings?", "We handle documentation, calculations, and IRS submissions, ensuring accuracy and compliance."],
      ["What's included in your IRS audit support services?", "Our services include document preparation, IRS representation, and resolution of audit discrepancies."],
      ["Can you help me optimize my capital gains taxes?", "Absolutely. We'll provide strategies to reduce taxes on investment income and capital gains."],
      ["What are the benefits of lifetime gifting strategies?", "Lifetime gifting reduces the taxable value of your estate while allowing you to support loved ones financially."],
    ],
  },
  {
    slug: "business-financial-services",
    name: "Financial services for businesses",
    label: "Financial services for businesses",
    title: "Simplified Accounting for U.S. Businesses",
    tagline: "Accounting and compliance services for U.S. businesses—from bookkeeping and payroll to corporate tax and retirement plans.",
    overviewTitle: "What we offer",
    overview: [
      ["Accounting and Tax for SMEs", "Simplify your small business finances with customized accounting and tax strategies tailored for U.S. entrepreneurs."],
      ["Contractor Accounting & Tax Services", "Specialized financial management for contractors, including efficient 1099 filings and full IRS compliance."],
      ["Comprehensive Bookkeeping & Sales Tax Compliance", "Ensure accurate financial records and seamless compliance with federal and state sales tax requirements."],
      ["Company Tax & Financial Reporting", "Accurate corporate tax preparation and detailed financial reporting aligned with U.S. federal and state regulations."],
      ["Payroll & Tax Management Services", "Streamlined payroll solutions, including federal and state tax withholdings, ensuring timely and error-free submissions."],
      ["Retirement Plan Management", "Simplify 401(k) setup and administration with expert support to ensure compliance and secure employee futures."],
    ],
    blocks: [
      {
        title: "Accounting and Tax for SMEs",
        intro: "Maximize financial efficiency with our tailored accounting and tax services for small businesses. From managing books to filing taxes, we ensure your finances are compliant and optimized for growth.",
        why: [
          ["Custom Accounting Solutions", "Services tailored to small business requirements."],
          ["Compliance Assurance", "Full adherence to IRS and state regulations."],
          ["Transparent Pricing", "Competitive, straightforward pricing with no hidden fees."],
          ["Expert Financial Guidance", "Access to seasoned professionals dedicated to your success."],
        ],
        approach: [
          ["Secure Data Submission", "Upload financial documents through our encrypted portal."],
          ["Full-Service Management", "Bookkeeping, payroll, and tax preparation managed seamlessly."],
          ["Regular Updates", "Receive monthly financial reports to stay informed."],
          ["Year-End Filings", "Accurate tax filings and reports prepared for federal and state compliance."],
        ],
        servicesTitle: "Services for SMEs",
        services: [
          ["Bookkeeping Services", "Maintain accurate financial records daily."],
          ["Tax Preparation & Filing", "Handle corporate and personal tax filings with precision."],
          ["Sales Tax Compliance", "Ensure correct registration and timely filings across states."],
          ["Payroll Management", "Comprehensive payroll services for efficient employee management."],
        ],
      },
      {
        title: "Contractor Accounting & Tax Services",
        intro: "Effortlessly manage your contractor finances with our specialized accounting and tax solutions. From 1099 filings to payroll and compliance, we streamline processes, allowing you to focus on delivering your projects.",
        why: [
          ["Industry-Specific Expertise", "Tailored solutions for contractors and subcontractors."],
          ["Seamless Tax Compliance", "Full adherence to IRS regulations and state-specific rules."],
          ["Simplified Filings", "Efficient handling of 1099s, payroll, and deductions."],
          ["Dedicated IRS Representation", "Expert support during audits or inquiries."],
        ],
        approach: [
          ["Tax Registration Assistance", "Help with IRS and state tax registrations."],
          ["Income Tracking", "Streamlined collection of financial and deduction details."],
          ["Monthly Reports", "Clear summaries of your tax obligations and financial standing."],
          ["Accurate Filings", "Timely preparation and submission of federal and state tax returns."],
        ],
        servicesTitle: "Services for Contractors and Subcontractors",
        services: [
          ["1099 Tax Filings", "Accurate and timely preparation of contractor forms."],
          ["Payroll & Deductions", "Manage payments and ensure compliance with withholding requirements."],
          ["Tax Compliance", "Stay up to date with multi-state contractor tax laws."],
          ["Audit Support", "Expert guidance during IRS audits or reviews."],
        ],
      },
      {
        title: "Comprehensive Bookkeeping & Sales Tax",
        intro: "Stay organized with accurate bookkeeping and tax services designed to keep your business running smoothly. We manage the details, so you have more time to focus on growth.",
        why: [
          ["Precise Record Management", "Ensure accuracy with detailed transaction tracking."],
          ["Compliance Experts", "Navigate U.S. tax laws effortlessly."],
          ["Custom Solutions", "Bookkeeping tailored to your business size and needs."],
          ["Cost-Effective Services", "Reduce administrative burdens with efficient processes."],
        ],
        approach: [
          ["Document Collection", "Upload records securely or sync with accounting software."],
          ["Transaction Reconciliation", "Ensure accounts are accurate and balanced."],
          ["Detailed Reporting", "Monthly or quarterly updates on your financial health."],
          ["Tax Filings", "Timely and accurate submission of federal and state returns."],
        ],
        servicesTitle: "Bookkeeping & Sales Tax Return Services",
        services: [
          ["Daily Bookkeeping", "Track and reconcile financial transactions."],
          ["Sales Tax Filing", "Manage calculations and filings across jurisdictions."],
          ["Payroll Services", "Simplify employee payments and tax submissions."],
          ["Financial Reporting", "Receive clear insights to drive business decisions."],
        ],
      },
      {
        title: "Corporate Tax Preparation & Accounting Support",
        intro: "Ensure your business meets its tax obligations with confidence. We provide comprehensive tax preparation and financial reporting for companies of all sizes, ensuring compliance with federal and state regulations.",
        why: [
          ["Accurate Tax Filings", "Minimize errors and avoid penalties with our expert services."],
          ["Strategic Planning", "Optimize your tax position with customized strategies."],
          ["Full Compliance", "Stay aligned with IRS and U.S. GAAP standards."],
          ["Experienced Advisors", "Get tailored guidance to support your business growth."],
        ],
        approach: [
          ["Data Gathering", "Collect all necessary financial and tax records."],
          ["Financial Statement Prep", "Create compliant reports for decision-making."],
          ["Tax Calculation", "Ensure precise calculations for corporate taxes."],
          ["Timely Filing", "Submit federal and state tax returns on schedule."],
        ],
        servicesTitle: "Corporate Tax Services",
        services: [
          ["Federal & State Returns", "Comprehensive preparation for multi-jurisdictional filings."],
          ["Tax Planning", "Maximize deductions and credits to minimize liabilities."],
          ["Sales Tax Compliance", "Stay compliant with varying state requirements."],
          ["Year-End Financial Statements", "Ensure accuracy and compliance with accounting standards."],
        ],
      },
      {
        title: "Payroll Services & Compliance",
        intro: "Simplify payroll management and ensure compliance with U.S. labor and tax laws. From accurate calculations to timely filings, we ensure your team gets paid on time while meeting all regulatory obligations.",
        why: [
          ["Accurate Payroll Processing", "Minimize errors with automated calculations."],
          ["Regulatory Expertise", "Stay compliant with IRS and state tax laws."],
          ["Cost-Effective Payroll", "Save time and resources with outsourced solutions."],
          ["Confidential Data Handling", "Ensure secure and private payroll data management."],
        ],
        approach: [
          ["Employee Data Collection", "Gather salary details, benefits, and deductions."],
          ["Payroll Processing", "Accurate calculations for wages and tax withholdings."],
          ["Tax Submissions", "Timely filing of payroll taxes to IRS and state agencies."],
          ["Payslip Distribution", "Secure electronic delivery of detailed payslips."],
        ],
        servicesTitle: "Payroll Services",
        services: [
          ["Full Payroll Management", "Handle all payroll aspects, from salaries to taxes."],
          ["W-2 and 1099 Reporting", "Prepare and distribute year-end tax forms."],
          ["Employee Benefits Admin", "Manage retirement plans and insurance deductions."],
          ["Compliance Monitoring", "Stay updated with federal and state labor laws."],
        ],
      },
      {
        title: "Retirement Plan Administration",
        intro: "Ensure your team's financial future is secure with our 401(k) and retirement plan solutions. We simplify plan setup, administration, and compliance with IRS and Department of Labor (DOL) regulations.",
        why: [
          ["Tailored Retirement Plans", "Customized solutions to fit your business."],
          ["Compliance Expertise", "Stay aligned with ERISA and federal regulations."],
          ["Transparent Management", "Clear reporting and contribution tracking."],
          ["Ongoing Employee Support", "Help your team maximize their retirement benefits."],
        ],
        approach: [
          ["Plan Design", "Develop retirement plans based on your workforce needs."],
          ["Setup & Enrolment", "Ensure smooth onboarding for employees."],
          ["Contribution Management", "Monitor and track employee and employer contributions."],
          ["Regulatory Monitoring", "Stay compliant with ever-evolving pension regulations."],
        ],
        servicesTitle: "Retirement Services",
        services: [
          ["401(k) Setup & Admin", "Establish and manage company-sponsored plans."],
          ["Contribution Tracking", "Keep accurate records of all contributions."],
          ["Compliance Monitoring", "Ensure adherence to federal pension laws."],
          ["Employee Education", "Offer resources to help employees understand their options."],
        ],
      },
    ],
    faqs: [
      ["What accounting solutions do you offer for SMEs?", "We provide tailored services for small and medium businesses, including bookkeeping, tax preparation, financial reporting, and payroll management, designed to streamline operations and ensure compliance."],
      ["How do your contractor accounting services help with IRS compliance?", "We specialize in assisting contractors with accurate 1099 filings, payroll processing, and multi-state tax compliance, ensuring full adherence to federal and state regulations."],
      ["What are the key features of your bookkeeping services?", "Our bookkeeping includes tracking daily transactions, reconciling accounts, managing payroll, and preparing detailed financial reports, ensuring transparency and accuracy."],
      ["What payroll services can you provide for small businesses?", "We handle end-to-end payroll services, including salary calculations, tax withholdings, W-2 and 1099 filings, and employee benefit management, ensuring timely and error-free submissions."],
      ["Can you manage corporate tax filings for businesses of all sizes?", "Yes, we offer comprehensive corporate tax solutions, including preparation of federal, state, and local tax filings, as well as strategic tax planning and financial statement preparation."],
      ["What retirement plan services do you offer?", "Our services include 401(k) setup and administration, monitoring compliance with IRS and ERISA regulations, managing contributions, and providing clear pension reports."],
      ["Do you handle multi-state sales tax compliance?", "Absolutely, we ensure proper sales tax registration, calculation, and filing for businesses operating across multiple states, keeping them compliant with varying state regulations."],
      ["How can your tax planning services benefit my business?", "We help minimize tax liabilities through strategic planning, identifying eligible deductions, and optimizing tax credits, aligning with your financial goals."],
      ["What security measures do you use to protect financial data?", "We prioritize data security by using encrypted portals, adhering to strict U.S. data protection standards, and ensuring all client information is handled confidentially."],
    ],
  },
  {
    slug: "corporate-services",
    name: "Corporate services",
    label: "Corporate services · Registration & compliance",
    title: "Corporate Services: Your Partner in U.S. Business Compliance",
    tagline: "Business entity formation, corporate secretary services, and regulatory compliance and reporting for U.S. businesses.",
    overviewTitle: "What we offer",
    overview: [
      ["Business Entity Formation", "Effortlessly establish your LLC, corporation, or non-profit with expert guidance tailored to U.S. regulations. We handle the paperwork, so you can focus on growing your business."],
      ["Corporate Secretary Services", "Ensure your business stays compliant with federal and state regulations through our streamlined secretarial services, including document preparation and filing support."],
      ["Regulatory Compliance and Reporting", "We proactively manage deadlines and ensure your business operates seamlessly within compliance standards."],
    ],
    blocks: [
      {
        title: "Business Entity Formation",
        intro: "Effortless business setup tailored to U.S. requirements. Navigating the complexities of starting a business can be daunting. Benifacts simplifies entity formation, ensuring your LLC, corporation, or non-profit is registered swiftly and accurately.",
        why: [
          ["Quick Turnaround", "Expedite your registration process with our efficient filings."],
          ["Compliance from Day One", "Ensure adherence to federal and state laws right from the start."],
          ["Expert Guidance", "Personalized support for choosing the right entity structure."],
          ["Transparent Pricing", "Clear, upfront costs with no surprises."],
        ],
        approach: [
          ["Business Consultation", "Evaluate your goals to determine the most suitable entity type."],
          ["Document Preparation", "Prepare and review all essential filings."],
          ["State Filing Assistance", "Submit documents to the Secretary of State for prompt approval."],
          ["EIN Application", "Secure your Employer Identification Number (EIN) for tax purposes."],
          ["Post-Formation Support", "Guidance on bylaws, operating agreements, and compliance."],
        ],
        servicesTitle: "Entity Formation Services",
        services: [
          ["LLC Formation", "Hassle-free setup for your limited liability company."],
          ["Incorporation Services", "Establish your corporation with precision and accuracy."],
          ["Non-Profit Registration", "Guidance through 501(c)(3) applications and filings."],
          ["Name Availability Check", "Ensure your business name is available for use in your state."],
          ["Operating Agreements and Bylaws", "Drafting essential governing documents tailored to your business needs."],
        ],
      },
      {
        title: "Corporate Secretary Services",
        intro: "Seamless management of governance and compliance. Maintaining corporate records and meeting federal and state governance standards is critical. Our corporate secretary services ensure you stay organized and compliant without hassle.",
        why: [
          ["Regulatory Expertise", "Deep knowledge of U.S. corporate governance laws."],
          ["Custom Solutions", "Services tailored to fit your business structure."],
          ["Time-Saving", "Focus on growth while we handle administrative tasks."],
          ["Secure Records", "Safeguard sensitive corporate information with robust data protection."],
        ],
        approach: [
          ["Initial Assessment", "Review your company's governance needs."],
          ["Compliance Calendar", "Stay ahead with proactive reminders for deadlines."],
          ["Document Management", "Handle board resolutions, minutes, and filings."],
          ["Filing Assistance", "Submit annual reports and required documents seamlessly."],
          ["Ongoing Updates", "Ensure compliance with evolving regulations."],
        ],
        servicesTitle: "Corporate Secretary Services",
        services: [
          ["Annual Report Filing", "Submission of mandatory annual reports to state authorities."],
          ["Registered Agent Services", "Use our office address for official correspondence."],
          ["Director and Officer Updates", "Manage and file changes to directors or officers."],
          ["Meeting Documentation", "Draft and store minutes and resolutions."],
          ["Corporate Records Maintenance", "Keep your company records organized and up-to-date."],
        ],
      },
      {
        title: "Compliance and Reporting Services",
        intro: "Stay ahead of regulatory obligations with ease. Navigating federal, state, and local regulations can be overwhelming. Benifacts offers end-to-end compliance solutions to ensure your business remains in good standing with regulatory bodies.",
        why: [
          ["Comprehensive Coverage", "From tax filings to corporate governance, we handle it all."],
          ["Proactive Deadline Management", "Avoid penalties with timely submissions."],
          ["Tailored Strategies", "Compliance plans customized for your industry and size."],
          ["Expert Insights", "Clear, actionable guidance to maintain compliance."],
        ],
        approach: [
          ["Compliance Review", "Assess your current status and identify areas for improvement."],
          ["Customized Plan", "Develop a compliance strategy aligned with federal and state requirements."],
          ["Real-Time Monitoring", "Keep track of changing laws and ensure timely updates."],
          ["Accurate Filings", "Submit all necessary reports with precision."],
          ["Post-Filing Support", "Address follow-ups and queries from regulatory authorities."],
        ],
        servicesTitle: "Compliance and Reporting Services",
        services: [
          ["Tax Compliance & Reporting", "Manage federal, state, and local tax filings, ensuring adherence to IRS and state tax laws."],
          ["Financial Statement Preparation", "Create accurate financial reports that comply with U.S. Generally Accepted Accounting Principles (GAAP)."],
          ["Corporate Governance & Legal Compliance", "Maintain proper governance practices, including annual reports and filings with state authorities."],
          ["Regulatory Reporting", "Submit required reports to the IRS, Department of Labor (DOL), and other relevant bodies to ensure compliance."],
          ["Compliance Audits", "Conduct regular audits to identify risks and ensure all regulatory obligations are met."],
        ],
      },
    ],
    faqs: [
      ["What types of business entities can I establish with your services?", "We help set up LLCs, corporations, and non-profits, customized to align with your unique business objectives."],
      ["What documents do I need to start my business?", "Essential documents include your business name, registered agent information, articles of incorporation or organization, and shareholder/member details. We'll handle the preparation and filing for you."],
      ["How long does the entity registration process take?", "Entity registration typically takes 5-7 business days, depending on the state. Expedited filing options are also available."],
      ["How do I decide on the best business structure for my needs?", "Our experts assess your goals and guide you in selecting the most suitable entity type—whether it's an LLC, corporation, or non-profit."],
      ["What is an EIN, and how do I get one?", "An Employer Identification Number (EIN) is a unique tax ID for businesses. We assist in applying for and securing your EIN from the IRS."],
      ["Do you assist with multi-state business registrations?", "Yes, we streamline the process for businesses operating across multiple states, ensuring compliance with varying state regulations."],
      ["What support do you offer after my business entity is registered?", "We provide ongoing guidance, including drafting operating agreements, bylaws, and compliance strategies to ensure your business stays on track."],
      ["How can I verify if my business name is available?", "We perform thorough name availability checks to ensure your preferred business name is eligible for registration in your state."],
      ["Can you help convert my existing business to another entity type?", "Absolutely! We'll walk you through the process of converting your business structure, whether to an LLC, corporation, or another entity."],
      ["Do you offer specialized services for non-profits?", "Yes, we provide comprehensive support for non-profit formation, including assistance with 501(c)(3) applications and compliance."],
    ],
  },
  {
    slug: "specialist-advisory",
    name: "Specialist advisory",
    label: "Specialist advisory services",
    title: "Specialist Advisory Services: Your Partner in Financial Growth",
    tagline: "Tailored financial advisory for healthcare, IT, and SME professionals by expert accountants.",
    overviewTitle: "Who we advise",
    overview: [
      ["Healthcare Professionals", "From tax planning to profitability management, we support your financial needs so you can focus on patient care."],
      ["IT Consulting Firms", "Optimized financial services designed for tech consultants, ensuring smooth operations and regulatory compliance."],
      ["Small and Medium Businesses (SMEs)", "Comprehensive financial solutions to help SMEs manage compliance, payroll, and growth strategies effectively."],
    ],
    blocks: [
      {
        title: "Financial Services for Healthcare Professionals",
        intro: "Running a healthcare practice comes with unique challenges. We provide tailored financial solutions for doctors, dentists, and other healthcare professionals to help you navigate tax compliance, profitability, and long-term financial planning.",
        why: [
          ["Specialized Expertise", "Deep understanding of the healthcare sector and its unique financial needs."],
          ["Regulatory Compliance", "Ensure adherence to IRS guidelines and state-specific healthcare regulations."],
          ["Maximized Profitability", "Strategic planning to optimize practice revenue."],
          ["Time-Saving", "We handle your financial operations, giving you more time to focus on patient care."],
          ["Comprehensive Support", "From tax filing to retirement planning, we offer end-to-end financial solutions."],
        ],
        approach: [
          ["Initial Consultation", "Understand the financial goals and challenges of your practice."],
          ["Customized Planning", "Develop a strategy tailored to your practice's financial needs."],
          ["Ongoing Monitoring", "Continuous financial analysis to ensure compliance and growth."],
          ["Detailed Reporting", "Transparent updates on financial performance."],
          ["Long-Term Strategy", "Pension planning and other solutions for sustained financial health."],
        ],
        servicesTitle: "Services for Healthcare Professionals",
        services: [
          ["Tax Planning & Compliance", "Minimize liabilities and adhere to federal and state laws."],
          ["Practice Accounting & Bookkeeping", "Keep records precise and up to date."],
          ["Profitability Analysis", "Insights to improve practice revenue."],
          ["Payroll Management", "Manage employee payments seamlessly."],
          ["Retirement Planning", "Secure your future with 401(k) and retirement strategies."],
        ],
      },
      {
        title: "Financial Services for IT Consulting",
        intro: "The fast-paced tech industry demands agile financial management. Our specialized financial services ensure IT professionals stay compliant and profitable.",
        why: [
          ["Tech-Focused Expertise", "Financial strategies tailored to IT consulting businesses."],
          ["Simplified Tax Solutions", "Minimize tax liabilities while staying compliant with IRS standards."],
          ["Streamlined Accounting", "Integrate modern tools for hassle-free bookkeeping and invoicing."],
          ["Growth-Oriented Strategies", "Help scale consulting businesses with strategic planning."],
          ["Proactive Compliance", "Ensure all financial practices adhere to federal and state regulations."],
        ],
        approach: [
          ["Business Assessment", "Review consulting operations and financial needs."],
          ["Customized Strategy", "Develop cash flow and tax management plans."],
          ["Ongoing Management", "Handle bookkeeping, compliance, and financial reporting."],
        ],
        servicesTitle: "Services for IT Consultants",
        services: [
          ["Tax Strategies", "Reduce tax burdens with deductions specific to IT consultants."],
          ["Invoicing Solutions", "Efficient tools for managing project payments."],
          ["Cash Flow Planning", "Manage irregular income streams effectively."],
          ["Growth Planning", "Financial strategies for scaling tech businesses."],
        ],
      },
      {
        title: "Accounting Solutions for SMEs",
        intro: "Navigating the financial landscape as an SME can be challenging. We provide specialized solutions to support small businesses with accounting, payroll, and growth strategies.",
        why: [
          ["Focused Expertise", "Services tailored to the unique challenges of small businesses."],
          ["Cost-Effective Solutions", "High-value services designed for SMEs."],
          ["Proactive Financial Management", "Stay ahead of tax filings, payroll, and compliance needs."],
          ["Scalable Support", "Adaptable financial strategies for growing businesses."],
        ],
        approach: [
          ["Personalized Consultation", "Understand your financial needs and goals."],
          ["Comprehensive Services", "Covering everything from bookkeeping to financial reporting."],
          ["Long-Term Strategy", "Adaptive plans to support growth."],
        ],
        servicesTitle: "SME Accounting Services",
        services: [
          ["Tax Filing & Compliance", "Ensure full compliance with IRS and state regulations."],
          ["Bookkeeping", "Accurate and organized financial records."],
          ["Payroll Management", "Streamline employee payments and deductions."],
          ["Growth Strategies", "Financial plans to support sustainable business expansion."],
        ],
      },
    ],
    faqs: [
      ["Why do healthcare professionals need specialized financial services?", "Healthcare professionals face unique financial challenges, such as managing practice profitability, adhering to complex tax regulations, and ensuring compliance with healthcare-specific requirements. We provide tailored financial solutions to meet these needs effectively."],
      ["How can Benifacts assist with tax planning for my medical practice?", "We offer strategic tax planning to minimize liabilities, ensure compliance with IRS guidelines, and optimize the financial health of your practice."],
      ["What retirement planning options are available for healthcare professionals?", "We provide customized retirement plans, including 401(k) strategies, tailored specifically for doctors, dentists, and other healthcare providers to secure their financial future."],
      ["Can Benifacts help IT consultants manage irregular income streams?", "Yes, we specialize in cash flow management and provide tailored financial strategies to stabilize income for IT consultants working on project-based contracts."],
      ["What tax-saving opportunities are available for IT consultants?", "Our team identifies deductions and allowances applicable to IT consultants, helping reduce tax burdens while ensuring full compliance with federal and state regulations."],
      ["How can Benifacts support SMEs with financial growth?", "We offer comprehensive financial strategies, including tax planning, payroll management, and profitability analysis, to help SMEs improve efficiency and drive growth."],
      ["What compliance services do you provide for SMEs?", "We ensure adherence to all IRS and state-level regulations by handling tax filings, financial reporting, and corporate governance requirements for SMEs."],
      ["Can Benifacts help with payroll management for small businesses?", "Absolutely! We provide end-to-end payroll services, including tax withholdings, employee payments, and compliance with federal and state payroll laws."],
      ["How long does it take to set up financial services for a new client?", "The onboarding process typically takes 1-2 weeks, during which we assess your needs, set up systems, and create a customized financial plan tailored to your business."],
      ["What makes Benifacts different from other financial service providers?", "Benifacts combines deep industry expertise, customized solutions, and advanced financial tools to offer personalized, cost-effective services for healthcare professionals, IT consultants, and SMEs in the USA."],
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
