import { FormEvent, useEffect, useState } from 'react';
import AdditionalCostsForm from './components/AdditionalCostsForm';
import ComplianceChecks from './components/ComplianceChecks';
import PropertyGrid from './components/PropertyGrid';
import YearlyCosts from './components/YearlyCosts';
import logoSrc from './assets/yuno_logo.png';
import ybCss from './assets/stylesheets/yb.module.css';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [completedChecks, setCompletedChecks] = useState<CheckWithProperty[]>(
    []
  );
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);

  // Filter the properties to show only those that have checks
  // that are yet to be completed.
  const filteredProperties =
    completedChecks.length > 0
      ? properties
          .map((p) => ({
            ...p,
            complianceChecks: p.complianceChecks.filter(
              (cA) =>
                completedChecks.find(
                  (cB) =>
                    JSON.stringify(cB) ===
                    JSON.stringify({ property: p.name, ...cA })
                ) === undefined
            )
          }))
          .filter((p) => p.complianceChecks.length > 0)
      : properties;

  // Functions to keep JSX cleaner
  const onCheckCompleted = (check: CheckWithProperty) =>
    setCompletedChecks((prev) => prev.concat(check));

  const onAdditionCostsSubmit = (
    _e: FormEvent<HTMLFormElement>,
    cost: number
  ) => setAdditionalCosts((prev) => prev + cost);

  useEffect(() => {
    // Fetch the list of properties from json-server
    fetch('http://localhost:3004/properties')
      .then((response) => response.json())
      .then((data: Property[]) => {
        // Show only those properties that require compliance checks
        const newProperties = data.filter((p) => p.complianceChecks.length > 0);
        setProperties(newProperties);
      })
      .catch((error: Error) => alert(error.message));
  }, [setProperties]);

  return (
    <div className={ybCss.root}>
      <img src={logoSrc} className={ybCss.logo} alt="logo" />
      <PropertyGrid properties={filteredProperties} />
      <ComplianceChecks
        properties={filteredProperties}
        onCheckCompleted={onCheckCompleted}
      />

      <AdditionalCostsForm onSubmit={onAdditionCostsSubmit} />
      <hr />

      <YearlyCosts
        properties={filteredProperties}
        additionalCosts={additionalCosts}
      />
    </div>
  );
}

export default App;
