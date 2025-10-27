// export const templates = [{
// 		id: "blank",
// 		label: "Blank Document",
// 		imageUrl: "/blank-document.svg"
// 	},
// 	{
// 		id: "software-proposal",
// 		label: "Software development proposal",
// 		imageUrl: "/software-proposal.svg"
// 	},
// 	{
// 		id: "project-proposal",
// 		label: "Project Proposal",
// 		imageUrl: "/project-proposal.svg"
// 	},
// 	{
// 		id: "buisness-letter",
// 		label: "Business Letter",
// 		imageUrl: "/business-letter.svg"
// 	},
// 	{
// 		id: "resume",
// 		label: "Resume",
// 		imageUrl: "/resume.svg"
// 	},
// 	{
// 		id: "cover-letter",
// 		label: "Cover Letter",
// 		imageUrl: "/cover-letter.svg"
// 	},
// 	{
// 		id: "letter",
// 		label: "Letter",
// 		imageUrl: "/letter.svg"
// 	}
// ]




export const templates = [{
	id: "blank",
	label: "Blank Document",
	imageUrl: "/blank-document.svg",
	initialContent: "",
},
{
	id: "software-proposal",
	label: "Software development proposal",
	imageUrl: "/software-proposal.svg",
	initialContent: `
      <h1>Software Development Proposal</h1>
      <p><strong>Prepared for:</strong> [Client Name]</p>
      <p><strong>Prepared by:</strong> [Your Company Name]</p>
      <p><strong>Date:</strong> October 4, 2025</p>
      <h2>1. Introduction</h2>
      <p>This document outlines a proposal for the development of [Project Name], detailing the scope, timeline, and cost.</p>
      <h2>2. Problem Statement</h2>
      <p>Describe the problem or opportunity that the proposed software will address.</p>
      <h2>3. Proposed Solution</h2>
      <p>Detail the software solution, its features, and the technology stack to be used.</p>
      <h2>4. Scope of Work</h2>
      <p>Provide a detailed list of deliverables and project milestones.</p>
      <h2>5. Timeline</h2>
      <p>Outline the estimated project timeline from start to finish.</p>
      <h2>6. Budget</h2>
      <p>Provide a detailed cost breakdown for the project.</p>
    `,
},
{
	id: "project-proposal",
	label: "Project Proposal",
	imageUrl: "/project-proposal.svg",
	initialContent: `
      <h1>Project Proposal: [Project Title]</h1>
      <h2>Executive Summary</h2>
      <p>Provide a brief overview of the project, its objectives, and the expected outcomes.</p>
      <h2>Project Goals</h2>
      <ul>
        <li>Goal 1...</li>
        <li>Goal 2...</li>
        <li>Goal 3...</li>
      </ul>
      <h2>Methodology</h2>
      <p>Describe the approach and methods you will use to achieve the project goals.</p>
      <h2>Deliverables</h2>
      <p>List the tangible outcomes or products that will be delivered at the end of the project.</p>
    `,
},
{
	id: "buisness-letter",
	label: "Business Letter",
	imageUrl: "/business-letter.svg",
	initialContent: `
      <p><strong>[Your Name]</strong></p>
      <p>[Your Address]</p>
      <p>[Your City, State, ZIP Code]</p>
      <p>[Your Email] | [Your Phone Number]</p>
      <p><br></p>
      <p>October 4, 2025</p>
      <p><br></p>
      <p><strong>[Recipient Name]</strong></p>
      <p>[Recipient Title]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>
      <p><br></p>
      <p><strong>Dear [Mr./Ms./Mx. Recipient Last Name],</strong></p>
      <p><br></p>
      <p>This is the body of your business letter. State your purpose clearly and concisely in the first paragraph.</p>
      <p><br></p>
      <p>In the following paragraphs, provide more detail, evidence, or information to support your purpose.</p>
      <p><br></p>
      <p>Conclude your letter by summarizing your main point and, if applicable, stating the desired next steps.</p>
      <p><br></p>
      <p>Sincerely,</p>
      <p><br></p>
      <p>[Your Name]</p>
    `,
},
{
	id: "resume",
	label: "Resume",
	imageUrl: "/resume.svg",
	initialContent: `
      <h1>[Your Name]</h1>
      <p>[Your Address] | [Your Phone Number] | [Your Email] | [LinkedIn Profile URL]</p>
      <h2>Professional Summary</h2>
      <p>A brief, 2-3 sentence summary of your skills, experience, and career goals.</p>
      <h2>Work Experience</h2>
      <h3>[Job Title] | [Company Name] | [City, State]</h3>
      <p><em>[Start Date] – [End Date]</em></p>
      <ul>
        <li>Achievement or responsibility 1...</li>
        <li>Achievement or responsibility 2...</li>
      </ul>
      <h3>[Previous Job Title] | [Previous Company Name] | [City, State]</h3>
      <p><em>[Start Date] – [End Date]</em></p>
      <ul>
        <li>Achievement or responsibility 1...</li>
        <li>Achievement or responsibility 2...</li>
      </ul>
      <h2>Education</h2>
      <h3>[Degree Name] | [University Name] | [City, State]</h3>
      <p><em>Graduated [Month, Year]</em></p>
      <h2>Skills</h2>
      <p><strong>Technical Skills:</strong> [List technical skills]</p>
      <p><strong>Soft Skills:</strong> [List soft skills]</p>
    `,
},
{
	id: "cover-letter",
	label: "Cover Letter",
	imageUrl: "/cover-letter.svg",
	initialContent: `
      <p><strong>[Your Name]</strong></p>
      <p>[Your Address]</p>
      <p>[Your Email] | [Your Phone Number]</p>
      <p><br></p>
      <p>October 4, 2025</p>
      <p><br></p>
      <p><strong>[Hiring Manager Name]</strong> (if known, otherwise use title)</p>
      <p>[Hiring Manager Title]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>
      <p><br></p>
      <p><strong>Dear [Mr./Ms./Mx. Hiring Manager Last Name],</strong></p>
      <p><br></p>
      <p>I am writing to express my keen interest in the [Job Title] position at [Company Name], which I saw advertised on [Platform where you saw the ad]. With my experience in [mention 1-2 key skills or experiences], I am confident I would be a valuable asset to your team.</p>
      <p><br></p>
      <p>In my previous role at [Previous Company], I was responsible for [briefly describe a key responsibility and a related achievement]. This experience has equipped me with the skills necessary to succeed in the role you have advertised.</p>
      <p><br></p>
      <p>Thank you for your time and consideration. I have attached my resume for your review and look forward to the possibility of discussing this exciting opportunity with you further.</p>
      <p><br></p>
      <p>Sincerely,</p>
      <p><br></p>
      <p>[Your Name]</p>
    `,
},
{
	id: "letter",
	label: "Letter",
	imageUrl: "/letter.svg",
	initialContent: `
      <p>October 4, 2025</p>
      <p><br></p>
      <p><strong>Dear [Recipient Name],</strong></p>
      <p><br></p>
      <p>This is the opening paragraph of your letter. You can use it to greet the recipient and state the purpose of your letter.</p>
      <p><br></p>
      <p>Use the body of the letter to elaborate on your points, share news, or tell a story. You can have multiple paragraphs as needed.</p>
      <p><br></p>
      <p>This is the concluding paragraph. You can summarize your thoughts and offer good wishes.</p>
      <p><br></p>
      <p>Best regards,</p>
      <p><br></p>
      <p>[Your Name]</p>
    `,
},
];