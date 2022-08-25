import css from '../assets/stylesheets/compliance-checks.module.css';

interface UpcomingCheckProps {
  property: string;
  type: string;
  date: string;
  required?: boolean;
}

function UpcomingCheck(props: UpcomingCheckProps) {
  const { property, type, date, required = false } = props;
  const className = css.upcoming + (required ? ` ${css.upcomingRequired}` : '');

  return (
    <div className={className}>
      <div>
        <strong>{property}</strong>
        <small>{`Type: ${type}`}</small>
      </div>
      <span>{new Date(date).toLocaleDateString()}</span>
    </div>
  );
}

export default UpcomingCheck;
