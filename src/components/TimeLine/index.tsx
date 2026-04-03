import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCertificate, faSchool } from '@fortawesome/free-solid-svg-icons'
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';

enum Type {
  Certification,
  Work,
  School,
}

type ResumeItem = {
  type: Type;
  title: string;
  subtitle: string;
  description: string;
  date: string;
};

const ResumeList: ResumeItem[] = [
  {
    type: Type.Work,
    date: translate({id: 'timeline.toyota.date', message: 'November 2023 - Present'}),
    title: translate({id: 'timeline.toyota.title', message: 'System Engineer, Assistant Manager'}),
    subtitle: 'Toyota Motor Corporation',
    description: translate({id: 'timeline.toyota.location', message: 'Tokyo, Japan'}),
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSecurity.date', message: 'April 2026'}),
    title: 'AWS Certified Security – Specialty',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/68c2b2e8-9551-4398-b724-05c33d056408/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSAPro.date', message: 'February 2026'}),
    title: 'AWS Certified Solutions Architect – Professional',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/8db2f461-7ccf-49bc-b160-5e58d2304482/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsNetworking.date', message: 'September 2025'}),
    title: 'AWS Certified Advanced Networking – Specialty',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/bcc19bc2-a57c-494d-940d-00c466963970/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsML.date', message: 'February 2025'}),
    title: 'AWS Certified Machine Learning Engineer – Associate',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/50d0524b-06c8-475a-9675-b44d74b597e9/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsAI.date', message: 'February 2025'}),
    title: 'AWS Certified AI Practitioner',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/881bb694-e02c-43dc-b47d-84e4c7b9545c/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsDevOps.date', message: 'October 2024'}),
    title: 'AWS Certified DevOps Engineer – Professional',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/d0e47829-aedd-4587-937e-07edab01d92e/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.gcpACE.date', message: 'June 2024'}),
    title: 'Associate Cloud Engineer Certification',
    subtitle: 'Google Cloud',
    description: 'https://www.credly.com/badges/042526ea-3636-44bc-a259-5949ba12b031',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSysOps.date', message: 'April 2024'}),
    title: 'AWS Certified SysOps Administrator – Associate',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/c0d83ccc-c2ad-427e-90b3-e36defb54af7/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsDeveloper.date', message: 'February 2024'}),
    title: 'AWS Certified Developer – Associate',
    subtitle: 'AWS Training & Certification',
    description: 'https://www.credly.com/badges/5caf6d6f-ecbf-452f-a623-27e4506ca036/linked_in_profile',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSAAssoc.date', message: 'December 2023'}),
    title: 'AWS Certified Solutions Architect - Associate',
    subtitle: 'AWS Training & Certification',
    description: '5ZX6BRRLSMEQ17SZ',
  },
  {
    type: Type.Work,
    date: translate({id: 'timeline.cyberagent.date', message: 'October 2021 - October 2023'}),
    title: translate({id: 'timeline.cyberagent.title', message: 'Data Engineer'}),
    subtitle: 'CyberAgent, Inc.',
    description: translate({id: 'timeline.cyberagent.location', message: 'Tokyo, Japan'}),
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsCP.date', message: 'September 2023'}),
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'AWS Training & Certification',
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.apIT.date', message: 'November 2022'}),
    title: translate({id: 'timeline.cert.apIT.title', message: 'Applied Information Technology Engineer Examination'}),
    subtitle: 'IPA (Information-technology Promotion Agency)',
    description: 'Credential ID: AP-2022-10-02822',
  },
  {
    type: Type.Work,
    date: translate({id: 'timeline.softbank.date', message: 'April 2019 - September 2021'}),
    title: translate({id: 'timeline.softbank.title', message: 'System Engineer'}),
    subtitle: 'Softbank Corp.',
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.toeic.date', message: 'May 2021'}),
    title: 'TOEIC Listening & Reading 815',
    subtitle: 'The TOEIC Program',
    description: 'Credential ID: 388326101',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.jdlaEngineer.date', message: 'February 2021'}),
    title: 'JDLA Deep Learning for ENGINEER 2021#1',
    subtitle: 'JDLA (Japan Deep Learning Association)',
    description: 'Credential ID: 388326101',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.mcpcIoT.date', message: 'December 2020'}),
    title: 'MCPC IoT System Technology Test (Basic)',
    subtitle: 'MCPC',
    description: 'Credential ID: 20000392T3',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.javaGold.date', message: 'September 2020'}),
    title: 'Oracle Certified Java Programmer, Gold SE 11',
    subtitle: 'Oracle',
    description: 'Credential ID: 276874011GLDSE11JPN',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.javaSilver.date', message: 'August 2020'}),
    title: 'Oracle Certified Java Programmer, Silver SE 11',
    subtitle: 'Oracle',
    description: 'Credential ID: 276874011SILVSE11JPN',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.python3.date', message: 'February 2020'}),
    title: 'Python 3 Certified Engineer Basic Examination',
    subtitle: translate({id: 'timeline.cert.python3.subtitle', message: 'Pythonic Examination'}),
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.jdlaGeneral.date', message: 'March 2020'}),
    title: 'JDLA Deep Learning for GENERAL 2020#1',
    subtitle: 'JDLA (Japan Deep Learning Association)',
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.ccnp.date', message: 'February 2020 - August 2023 (Expired)'}),
    title: 'Cisco Certified Network Professional Routing and Switching (CCNP)',
    subtitle: 'Cisco Systems, Inc.',
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.feExam.date', message: 'November 2019'}),
    title: translate({id: 'timeline.cert.feExam.title', message: 'Fundamental Information Technology Engineer Examination'}),
    subtitle: 'IPA (Information-technology Promotion Agency)',
    description: '',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.ccna.date', message: 'August 2019 - August 2023 (Expired)'}),
    title: 'Cisco Certified Network Associate Routing and Switching (CCNA)',
    subtitle: 'Cisco Systems, Inc.',
    description: '',
  },
  {
    type: Type.Work,
    date: translate({id: 'timeline.researcher.date', message: 'April 2017 - March 2019'}),
    title: translate({id: 'timeline.researcher.title', message: 'Researcher'}),
    subtitle: 'Institutes of Innovation for Future Society, Nagoya University',
    description: '',
  },
  {
    type: Type.School,
    date: translate({id: 'timeline.phd.date', message: 'September 2014 - March 2019'}),
    title: translate({id: 'timeline.phd.title', message: 'Ph.D. in Computer Science'}),
    subtitle: 'Graduate School of Engineering, Nagoya University',
    description: '',
  },
];

function Resume({ type, date, title, subtitle, description }: ResumeItem) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  let className = 'vertical-timeline-element--work';
  let icon = <FontAwesomeIcon icon={faBriefcase} />;

  const cardBackground = isDark ? '#161b22' : '#ffffff';
  const cardColor = isDark ? '#fff' : '#1c1e21';

  let contentStyle = { background: cardBackground, color: cardColor, border: '1px solid var(--ifm-color-primary)', boxShadow: isDark ? '0 0 10px rgba(0, 102, 204, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.1)' };
  let contentArrowStyle = { borderRight: '7px solid var(--ifm-color-primary)' };
  let iconStyle = { background: 'var(--ifm-color-primary)', color: '#fff' };

  switch (type) {
    case Type.Work:
      contentStyle = { ...contentStyle, border: '1px solid var(--ifm-color-primary)' };
      contentArrowStyle = { borderRight: '7px solid var(--ifm-color-primary)' };
      iconStyle = { background: 'var(--ifm-color-primary)', color: '#fff' };
      className = 'vertical-timeline-element--work';
      icon = <FontAwesomeIcon icon={faBriefcase} />;
      break;
    case Type.Certification:
      const certColor = '#e3b341';
      contentStyle = { ...contentStyle, border: `1px solid ${certColor}` };
      contentArrowStyle = { borderRight: `7px solid ${certColor}` };
      iconStyle = { background: certColor, color: '#000' };
      className = 'vertical-timeline-element--certification';
      icon = <FontAwesomeIcon icon={faCertificate} />;
      break;
    case Type.School:
      const schoolColor = '#ff4d4d';
      contentStyle = { ...contentStyle, border: `1px solid ${schoolColor}` };
      contentArrowStyle = { borderRight: `7px solid ${schoolColor}` };
      iconStyle = { background: schoolColor, color: '#fff' };
      className = 'vertical-timeline-element--school';
      icon = <FontAwesomeIcon icon={faSchool} />;
      break;
  }

  return (
    <VerticalTimelineElement
      className={className}
      contentStyle={contentStyle}
      contentArrowStyle={contentArrowStyle}
      date={date}
      iconStyle={iconStyle}
      icon={icon}
    >
      <h3 className="vertical-timeline-element-title" style={{ color: isDark ? 'var(--ifm-color-primary-lightest)' : 'var(--ifm-color-primary-dark)' }}>{title}</h3>
      <h4 className="vertical-timeline-element-subtitle" style={{ opacity: 0.8 }}>{subtitle}</h4>
      <p style={{ opacity: 0.9 }}>
        {description}
      </p>
    </VerticalTimelineElement>
  );
}

export default function ResumeTimeLine() {
  return (
    <VerticalTimeline>
      {ResumeList.map((props, idx) => (
        <Resume key={idx} {...props} />
      ))}
    </VerticalTimeline>
  );
}
