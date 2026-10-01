import { EditorialSequence } from "./editorial-sequence";

const chapters = [
  { label: "SITUATION", text: "An overseas owner operating through a US LLC had no prior US reporting. Ownership and transactions spanned two countries.", image: "/images/case-port.webp" },
  { label: "WORK PERFORMED", text: "Prepared pro forma 1120 and Form 5472, reviewed reportable transactions, and assessed Beneficial Ownership Information (BOI) reporting obligations under current FinCEN guidance.", image: "/images/case-documents.webp" },
  { label: "OUTCOME", text: "Open years filed on a single calendar, with a documented position on BOI and a forward compliance plan.", image: "/images/case-office.webp" },
];

const caseImages=chapters.map(chapter=>chapter.image);

export function CaseStory() {
  return <section className="case-story" aria-labelledby="case-story-heading">
    <header className="case-intro"><i className="case-dot" aria-hidden="true" /><div className="case-label"><span>CASE STUDY</span><b>CROSS-BORDER COMPLIANCE</b></div>
    <h3 className="case-story-heading" id="case-story-heading"><span className="case-line"><span>Foreign-owned US entity </span></span><span className="case-line"><span>brought current with </span></span><span className="case-line"><span>5472 and BOI reporting</span></span></h3><span className="case-intro-rule" aria-hidden="true" /></header>
    <div className="case-narrative">
      <EditorialSequence images={caseImages} />
      <div className="case-chapters">{chapters.map((chapter,i)=><div className="case-chapter" key={chapter.label}>
        <div className="case-chapter-copy"><span className="editorial-rule" aria-hidden="true"/><small>{chapter.label}</small><p>{chapter.text}</p>{i===1&&<div className="document-rules" aria-hidden="true"><i/><i/><i/></div>}</div>
      </div>)}</div>
    </div>
    <p className="fineprint">Illustrative composite based on typical engagements. Identifying details withheld. Figures and specifics to be confirmed before promotion.</p>
  </section>;
}
