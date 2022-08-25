import { getChecks } from './ComplianceChecks';

interface YearlyCostsProps {
  properties: Property[];
  additionalCosts: number;
}

function YearlyCosts(props: YearlyCostsProps) {
  const { additionalCosts, properties } = props;
  const totalYearlyCost = getChecks(properties, (date: Date) => {
    const thisYear = new Date().getFullYear();
    const endDate = new Date();
    endDate.setFullYear(thisYear + 1);
    return date <= endDate;
  }).reduce((acc, check) => acc + check.cost, additionalCosts);

  return (
    <h3 className="font-normal mb-0">
      <strong>{`Total yearly cost: `}</strong>
      <span>
        {`£${totalYearlyCost.toLocaleString()}`}
        <small>
          {additionalCosts > 0 &&
            ` (inc. £${additionalCosts.toLocaleString()} additional costs)`}
        </small>
      </span>
    </h3>
  );
}

export default YearlyCosts;
