const links = [
  { name: 'instagram', href: 'https://www.instagram.com/mr.butbul/' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/orbutbul' },
  { name: 'discord', href: 'http://discordapp.com/users/203633008907911168' },
  { name: 'github', href: 'https://github.com/orbutbul' },
];

export default function Socials({ className = 'socials' }) {
  return (
    <div className={className}>
      {links.map(({ name, href }) => (
        <a key={name} href={href} target="_blank" rel="noreferrer">
          <img className="social-link" src={`/Imgs/${name}.svg`} alt={name} />
        </a>
      ))}
    </div>
  );
}
