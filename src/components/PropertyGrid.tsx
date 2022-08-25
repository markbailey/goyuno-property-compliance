import Accordion from './Accordion';
import css from '../assets/stylesheets/property-grid.module.css';

interface PropertyGridProps {
  properties: Property[];
}

function PropertyGrid(props: PropertyGridProps) {
  const { properties } = props;
  const nextCheck = (checks: ComplianceCheck[]) =>
    checks.sort((a, b) =>
      new Date(b.checkDate) < new Date(a.checkDate) ? -1 : 1
    )[0].checkDate;

  return (
    <div className={css.root}>
      <h3>My Property Portfolio</h3>
      {properties.length === 0 && (
        <span>
          Currently there are no properties with outstanding compliance checks
        </span>
      )}

      {properties.map((property) => (
        <Accordion
          key={property.id}
          title={property.name}
          subTitle={`Next check: ${new Date(
            nextCheck(property.complianceChecks)
          ).toLocaleDateString()}`}
          icon={<span />}
        >
          <div className={css.checksContent}>
            <table className={css.checksTable}>
              <caption>Compliance Checks</caption>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {property.complianceChecks.map((check, i) => (
                  <tr key={check.type + i}>
                    <td>{check.type}</td>
                    <td>{`£${check.cost.toLocaleString('en-GB')}`}</td>
                    <td>{new Date(check.checkDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default PropertyGrid;
