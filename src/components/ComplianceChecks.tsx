import UpcomingCheck from './UpcomingCheck';
import css from '../assets/stylesheets/compliance-checks.module.css';
import { ChangeEvent } from 'react';

interface ComplianceChecksProps {
  properties: Property[];
  onCheckCompleted: (check: CheckWithProperty) => void;
}

export function getChecks(
  properties: Property[],
  callback: (checkDate: Date) => boolean
) {
  return properties.reduce((acc: CheckWithProperty[], property) => {
    const matches: CheckWithProperty[] = property.complianceChecks
      .filter((check) => callback(new Date(check.checkDate)))
      .map((check) => ({ property: property.name, ...check }));
    return acc.concat(matches);
  }, []);
}

function ComplianceChecks(props: ComplianceChecksProps) {
  const { properties, onCheckCompleted } = props;
  const requiredDate = new Date();
  const upcomingDate = new Date();

  requiredDate.setDate(requiredDate.getDate() + 7);
  upcomingDate.setMonth(upcomingDate.getMonth() + 6);

  const requiredChecks = getChecks(properties, (date) => date <= requiredDate);
  const upcomingChecks = getChecks(
    properties,
    (date) => date > requiredDate && date <= upcomingDate
  );

  const onCheckInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    check: CheckWithProperty
  ) => {
    if (event.target === null || !event.target.checked) return;
    event.target.checked = false;
    const confirmed = window.confirm(
      'Are you sure you have completed this Compliance Check?'
    );

    if (!confirmed) return;
    onCheckCompleted(check);
  };

  return (
    <div className={css.root}>
      <div>
        <h3>Fire Safety Checks Required</h3>
        {requiredChecks.length === 0 && (
          <span>Currently there are no required checks</span>
        )}

        {requiredChecks.map((check, i) => (
          <div key={check.property + i} className={css.checkWrapper}>
            <input
              type="checkbox"
              onChange={(event) => onCheckInputChange(event, check)}
            />

            <UpcomingCheck
              property={check.property}
              type={check.type}
              date={check.checkDate}
              required
            />
          </div>
        ))}
      </div>
      <div>
        <h3>Upcoming Checks</h3>
        {upcomingChecks.length === 0 && (
          <span>Currently there are no upcoming checks</span>
        )}

        {upcomingChecks.map((check, i) => (
          <div key={check.property + i} className={css.checkWrapper}>
            <input
              type="checkbox"
              onChange={(event) => onCheckInputChange(event, check)}
            />

            <UpcomingCheck
              property={check.property}
              type={check.type}
              date={check.checkDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplianceChecks;
