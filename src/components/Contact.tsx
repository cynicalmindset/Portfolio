import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { profile, socialLinks } from '../data';
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  LeetcodeIcon,
  CodeforcesIcon,
  GlobeIcon,
  MailIcon, 
  ResumeIcon
} from './Icons';

export function Contact() {
  const getChannelIcon = (iconName: string) => {
    switch (iconName) {
      case 'github': return <GithubIcon />;
      case 'linkedin': return <LinkedinIcon />;
      case 'twitter': return <TwitterIcon />;
      case 'leetcode': return <LeetcodeIcon />;
      case 'codeforces': return <CodeforcesIcon />;
      case 'globe': return <GlobeIcon />;
      case 'email': return <MailIcon />;
      case 'resume': return <ResumeIcon />;
      default: return <GithubIcon />;
    }
  };

  return (
    <section className="section-block" id="contact">
      <SectionHeader 
        num="05" 
        title="Get In Touch & Collaborate" 
        tag="// 05_COMMUNICATION_LINK"
      />

      {/* Simple Modern Centered Social Deck */}
      <Reveal className="simple-social-deck-container centered-deck">
        {/* Row of Sleek Dark Logo Tiles in Center */}
        <div className="simple-social-tiles-row">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="simple-social-tile"
              aria-label={`${item.label}: ${item.handle}`}
            >
              <div className="tile-icon-wrap">
                {getChannelIcon(item.icon)}
              </div>
              <div className="tile-tooltip" role="tooltip">
                {item.label}
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Centered Bottom Copy */}
        <div className="simple-social-footer-text">
          <h3 className="simple-social-title">Connect with me</h3>
          <p className="simple-social-sub">
            Open for software engineering internships, open-source collaborations, and systems discussions. Feel free to reach out across any platform.
          </p>
        </div>
      </Reveal>

      <div className="telemetry-last-sync">
        <span className="sync-dot"></span>
        <span>Maintained by {profile.name} · {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}


