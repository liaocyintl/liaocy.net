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
  badgeImage?: string;
  credlyUrl?: string;
  logoImage?: string;
};

const ResumeList: ResumeItem[] = [
  {
    type: Type.Work,
    date: translate({id: 'timeline.toyota.date', message: 'November 2023 - Present'}),
    title: translate({id: 'timeline.toyota.title', message: 'System Engineer, Assistant Manager'}),
    subtitle: 'Toyota Motor Corporation',
    description: translate({id: 'timeline.toyota.location', message: 'Tokyo, Japan'}),
    logoImage: '/img/logos/logo_toyota.png',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsAll.date', message: 'April 2026'}),
    title: 'All AWS Certifications Engineer',
    subtitle: 'AWS Training & Certification',
    description: translate({id: 'timeline.cert.awsAll.desc', message: 'Achieved all current AWS certifications'}),
    badgeImage: '/img/2026_All_AWS_Certs_Badge.png',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSecurity.date', message: 'April 2026'}),
    title: 'AWS Certified Security – Specialty',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_security_specialty.png',
    credlyUrl: 'https://www.credly.com/badges/68c2b2e8-9551-4398-b724-05c33d056408',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSAPro.date', message: 'February 2026'}),
    title: 'AWS Certified Solutions Architect – Professional',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_sa_professional.png',
    credlyUrl: 'https://www.credly.com/badges/8db2f461-7ccf-49bc-b160-5e58d2304482',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsNetworking.date', message: 'September 2025'}),
    title: 'AWS Certified Advanced Networking – Specialty',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_advanced_networking.png',
    credlyUrl: 'https://www.credly.com/badges/bcc19bc2-a57c-494d-940d-00c466963970',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsMLSpecialty.date', message: 'July 2025'}),
    title: 'AWS Certified Machine Learning – Specialty',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_ml_specialty.png',
    credlyUrl: 'https://www.credly.com/badges/029a3262-d81a-4d5b-8bed-de627a440cd7',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsML.date', message: 'February 2025'}),
    title: 'AWS Certified Machine Learning Engineer – Associate',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_ml_engineer_associate.png',
    credlyUrl: 'https://www.credly.com/badges/50d0524b-06c8-475a-9675-b44d74b597e9',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsAI.date', message: 'February 2025'}),
    title: 'AWS Certified AI Practitioner',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_ai_practitioner.png',
    credlyUrl: 'https://www.credly.com/badges/881bb694-e02c-43dc-b47d-84e4c7b9545c',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsDevOps.date', message: 'October 2024'}),
    title: 'AWS Certified DevOps Engineer – Professional',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_devops_professional.png',
    credlyUrl: 'https://www.credly.com/badges/d0e47829-aedd-4587-937e-07edab01d92e',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.gcpACE.date', message: 'June 2024'}),
    title: 'Associate Cloud Engineer Certification',
    subtitle: 'Google Cloud',
    description: '',
    badgeImage: '/img/badges/gcp_ace.png',
    credlyUrl: 'https://www.credly.com/badges/042526ea-3636-44bc-a259-5949ba12b031',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSysOps.date', message: 'April 2024'}),
    title: 'AWS Certified SysOps Administrator – Associate',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_sysops_associate.png',
    credlyUrl: 'https://www.credly.com/badges/60484406-0f16-4596-869f-edbab682531a',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsDeveloper.date', message: 'February 2024'}),
    title: 'AWS Certified Developer – Associate',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_developer_associate.png',
    credlyUrl: 'https://www.credly.com/badges/b214ebef-0e20-4d3e-82c1-8878983d2f53',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsSAAssoc.date', message: 'December 2023'}),
    title: 'AWS Certified Solutions Architect - Associate',
    subtitle: 'AWS Training & Certification',
    description: 'Credential ID: 5ZX6BRRLSMEQ17SZ',
    badgeImage: '/img/badges/aws_sa_associate.png',
    credlyUrl: 'https://www.credly.com/badges/84b82a8a-170a-48d9-a857-f6e514087478',
  },
  {
    type: Type.Work,
    date: translate({id: 'timeline.cyberagent.date', message: 'October 2021 - October 2023'}),
    title: translate({id: 'timeline.cyberagent.title', message: 'Data Engineer'}),
    subtitle: 'CyberAgent, Inc.',
    description: translate({id: 'timeline.cyberagent.location', message: 'Tokyo, Japan'}),
    logoImage: '/img/logos/logo_cyberagent.png',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.awsCP.date', message: 'September 2023'}),
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'AWS Training & Certification',
    description: '',
    badgeImage: '/img/badges/aws_cloud_practitioner.png',
    credlyUrl: 'https://www.credly.com/badges/d2bdd41f-6235-4c6e-bf0d-e8de75ae01ea',
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
    logoImage: '/img/logos/logo_softbank.png',
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
    badgeImage: '/img/badges/oracle_java_gold_se11.png',
    credlyUrl: 'https://www.credly.com/badges/a32614ab-9e5e-4c14-a9d9-2e6569e85033',
  },
  {
    type: Type.Certification,
    date: translate({id: 'timeline.cert.javaSilver.date', message: 'August 2020'}),
    title: 'Oracle Certified Java Programmer, Silver SE 11',
    subtitle: 'Oracle',
    description: 'Credential ID: 276874011SILVSE11JPN',
    badgeImage: '/img/badges/oracle_java_silver_se11.png',
    credlyUrl: 'https://www.credly.com/badges/bb13570c-126f-4796-81c0-9840c15c9c89',
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
    badgeImage: '/img/badges/cisco_ccnp_rs.png',
    credlyUrl: 'https://www.credly.com/badges/957d61c9-fb6a-44c4-b871-0ab5feaff350',
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
    badgeImage: '/img/badges/cisco_ccna_rs.png',
    credlyUrl: 'https://www.credly.com/badges/e839b1fc-d5b6-40d8-8247-816eef107da2',
  },
  {
    type: Type.Work,
    date: translate({id: 'timeline.researcher.date', message: 'April 2017 - March 2019'}),
    title: translate({id: 'timeline.researcher.title', message: 'Researcher'}),
    subtitle: 'Institutes of Innovation for Future Society, Nagoya University',
    description: '',
    logoImage: '/img/logos/logo_nagoya_university.png',
  },
  {
    type: Type.School,
    date: translate({id: 'timeline.phd.date', message: 'September 2014 - March 2019'}),
    title: translate({id: 'timeline.phd.title', message: 'Ph.D. in Computer Science'}),
    subtitle: 'Graduate School of Engineering, Nagoya University',
    description: '',
  },
];

function Resume({ type, date, title, subtitle, description, badgeImage, credlyUrl, logoImage }: ResumeItem) {
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
      {badgeImage && (
        <img src={badgeImage} alt={title} style={{ width: 80, height: 80, display: 'block', marginBottom: '0.75rem' }} />
      )}
      {logoImage && (
        <div style={{ display: 'inline-block', background: '#fff', borderRadius: 8, padding: '7px 12px', marginBottom: '0.75rem', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)' }}>
          <img src={logoImage} alt={subtitle} style={{ height: 26, display: 'block' }} />
        </div>
      )}
      <h3 className="vertical-timeline-element-title" style={{ color: isDark ? 'var(--ifm-color-primary-lightest)' : 'var(--ifm-color-primary-dark)' }}>{title}</h3>
      <h4 className="vertical-timeline-element-subtitle" style={{ opacity: 0.8 }}>{subtitle}</h4>
      {description && (
        <p style={{ opacity: 0.9 }}>
          {description}
        </p>
      )}
      {credlyUrl && (
        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          <a
            href={credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#e3b341', fontWeight: 600, textDecoration: 'none' }}
          >
            {translate({ id: 'timeline.viewCredly', message: 'View on Credly ↗' })}
          </a>
        </p>
      )}
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
