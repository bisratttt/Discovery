import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, ListGroup, Row, Button, Col } from "react-bootstrap";
import { useToggleComponents } from "../contexts/ToggleComponents";

const terms = [
  {
    title: "Account Registration",
    body: [
      `To use certain features of the Service, you must register for an account. 
      When you register for an account, you may be required to provide us with some 
      information about yourself, such as your email address or other contact information. 
      You agree that the information you provide to us is accurate and that you will keep it 
      accurate and up-to-date at all times.`,
    ],
  },
  {
    title: "User-Generated Content",
    body: [
      `The Service allows you to post, link, store, share, and
      otherwise make available certain information, text, graphics,
      videos, or other material ("User Content"). You are responsible
      for the User Content that you post on or through the Service,
      including its legality, reliability, and appropriateness.`,
      `By posting User Content on or through the Service, you represent
      and warrant that: (a) the User Content is yours (you own it)
      and/or you have the right to use it and the right to grant us
      the rights and license as provided in these Terms, and (b) that
      the posting of your User Content on or through the Service does
      not violate the privacy rights, publicity rights, copyrights,
      contract rights or any other rights of any person or entity.`,
    ],
  },
  {
    title: "Data Collection",
    body: [
      `By using the Service, you acknowledge and agree that we may
      collect and process the following information:`,
      <ol>
        <li>Email address</li>
        <li>Navigation through the website</li>
        <li>
          User input data for reviews, song of the day, reactions, feedback, or
          votes
        </li>
        <li>
          Data collected by third-party frameworks like YouTube, Spotify, or
          Apple Music
        </li>
      </ol>,
      `We collect this information to provide and improve the Service,
and we will not share your personal information with third
parties, except as described in our Privacy Policy.`,
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      `The Service and its original content (excluding User Content),
        features and functionality are and will remain the exclusive
        property of Discover and its licensors. The Service is protected
        by copyright, trademark, and other laws of both the United
        States and foreign countries. Our trademarks and trade dress may
        not be used in connection with any product or service without
        the prior written consent of Discover.`,
    ],
  },
  {
    title: "Links to Other Websites",
    body: [
      `Our Service may contain links to third-party websites or
        services that are not owned or controlled by Discover. Discover
        has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third-party
        websites or services. You further acknowledge and agree that
        Discover shall not be responsible or liable, directly or
        indirectly, for any damage or loss caused or alleged to be
        caused by or in connection with use of or reliance on any such
        content, goods, or services available on or through any such
        websites or services.`,
      `We strongly advise you to read the terms and conditions and
        privacy policies of any third-party websites or services that
        you visit.`,
    ],
  },
  {
    title: "Termination",
    body: [
      `We may terminate or suspend your account and bar access to the
        Service immediately, without prior notice or liability, for any
        reason whatsoever, including without limitation if you breach
        the Terms.`,
      `All provisions of the Terms which by their nature should survive
        termination shall survive termination, including, without
        limitation, ownership provisions, warranty disclaimers,
        indemnity, and limitations of liability.`,
    ],
  },
  {
    title: "Indemnification",
    body: [
      `You agree to defend, indemnify, and hold harmless Discover, its
        officers, directors, employees, and agents, from and against any
        claims, liabilities, damages, losses, and expenses, including,
        without limitation, reasonable legal and accounting fees,
        arising out of or in any way connected with your access to or
        use of the Service, or your violation of these Terms.`,
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      `In no event shall Discover, nor its directors, employees,
        partners, agents, suppliers, or affiliates, be liable for any
        indirect, incidental, special, consequential or punitive
        damages, including without limitation, loss of profits, data,
        use, goodwill, or other intangible losses, resulting from (i)
        your access to or use of or inability to access or use the
        Service; (ii) any conduct or content of any third party on the
        Service; (iii) any content obtained from the Service; and (iv)
        unauthorized access, use or alteration of your transmissions or
        content, whether based on warranty, contract, tort (including
        negligence) or any other legal theory, whether or not we have
        been informed of the possibility of such damage, and even if a
        remedy set forth herein is found to have failed of its essential
        purpose.`,
    ],
  },
  {
    title: "Disclaimer",
    body: [
      `Your use of the Service is at your sole risk.The Service is provided on an "AS IS" 
      and "AS AVAILABLE" basis. The Service is
      provided without warranties of any kind, whether express or
      implied, including, but not limited to, implied warranties of
      merchantability, fitness for a particular purpose,
      non-infringement, or course of performance.`,
      `Discover, its subsidiaries, affiliates, and licensors do not
      warrant that a) the Service will function uninterrupted, secure,
      or available at any particular time or location; b) any errors or
      defects will be corrected; c) the Service is free of viruses or
      other harmful components; or d) the results of using the Service
      will meet your requirements.`,
    ],
  },
  {
    title: "Governing Law",
    body: [
      `These Terms shall be governed and construed in accordance with the
        laws of the United States, without regard to its conflict of law
        provisions.`,
      `Our failure to enforce any right or provision of these Terms will
        not be considered a waiver of those rights. If any provision of
        these Terms is held to be invalid or unenforceable by a court, the
        remaining provisions of these Terms will remain in effect. These
        Terms constitute the entire agreement between us regarding our
        Service, and supersede and replace any prior agreements we might
        have between us regarding the Service.`,
    ],
  },
  {
    title: "Changes",
    body: [
      `We reserve the right, at our sole discretion, to modify or replace
        these Terms at any time. If a revision is material, we will try to
        provide at least 30 days' notice prior to any new terms taking
        effect. What constitutes a material change will be determined at
        our sole discretion.`,
      `By continuing to access or use our Service after those revisions
        become effective, you agree to be bound by the revised terms. If
        you do not agree to the new terms, please stop using the Service.`,
    ],
  },
  {
    title: "Contact Us",
    body: [
      `If you have any questions about these Terms, please contact us at
        `,
      <a href="mailto:discmusicinfo@gmail.com">discmusicinfo@gmail.com</a>,
      `We will make every effort to respond to your inquiries promptly
        and address any concerns you may have. Your use of our Service is
        important to us, and we are committed to ensuring that our users
        have a positive experience.`,
    ],
  },
];
export default function Terms() {
  return (
    <Container className="ms-0 terms w-100 theme-bg-color" fluid>
      <Row className="justify-content-start text-start">
        <Col xs={10}>
          <h1 className="ps-0 display-2 theme-text-color">
            Terms and Conditions
          </h1>
          <h5 className="ps-0 mb-5">Last updated: March 29, 2023</h5>
          <hr
            style={{
              height: "0.06rem",
              backgroundColor: "rgb(111, 27, 6)",
              border: "none",
              opacity: 1,
            }}
          />
          <h3 className="ps-0 theme-text-color">Welcome to Discover!</h3>
          <p className="ps-0">
            Please read these Terms and Conditions ("Terms", "Terms and
            Conditions") carefully before using the Discover (also referred to
            as "Disc.") mobile application (the "Service") operated by Discover
            ("us", "we", or "our").
          </p>
          <p className="ps-0">
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service. By
            accessing or using the Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, then you may not
            access the Service.
          </p>
          <ListGroup as="ol" className="border-0">
            {terms.map((term, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex border-0 theme-bg-color justify-content-start"
              >
                <span style={{ marginTop: "0.5rem" }}>{index + 1}.</span>
                <div className="ms-1">
                  <h3 style={{ color: "rgb(111, 27, 6)" }}>{term.title}</h3>
                  {term.body.map((b) =>
                    React.isValidElement(b) ? b : <p className="ps-0">{b}</p>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col style={{ borderLeft: "0.07rem solid rgb(111, 27, 6)" }}></Col>
      </Row>
    </Container>
  );
}
